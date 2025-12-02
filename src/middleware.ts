import { type NextRequest, NextResponse } from "next/server";

async function verifySession(sessionCookie: string, secret: string) {
    try {
        const [b64Payload, signature] = sessionCookie.split(".");
        if (!b64Payload || !signature) return false;

        const payload = Buffer.from(b64Payload, "base64").toString("utf-8");
        const encoder = new TextEncoder();

        const key = await crypto.subtle.importKey(
            "raw",
            encoder.encode(secret),
            { name: "HMAC", hash: "SHA-256" },
            false,
            ["sign"]
        );

        const computedSig = await crypto.subtle.sign(
            "HMAC",
            key,
            encoder.encode(payload)
        );

        const expectedSig = Buffer.from(computedSig).toString("hex");

        if (expectedSig !== signature) return false;

        const data = JSON.parse(payload);
        if (data.exp < Date.now()) return false;

        return true;
    } catch {
        return false;
    }
}

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Only protect /admin/* and /api/blog/* routes
    const isAdminRoute = pathname.startsWith("/admin");
    const isAdminApiRoute = pathname.startsWith("/api/blog/") &&
        !pathname.startsWith("/api/blog/upload-image"); // upload-image might be called from client

    if (!isAdminRoute && !isAdminApiRoute) {
        return NextResponse.next();
    }

    const isLoginPage = pathname === "/admin/login";
    const session = request.cookies.get("admin_session")?.value;

    // On /admin/login:
    // If already logged in => redirect to dashboard
    if (isLoginPage) {
        if (session) {
            const isValid = await verifySession(session, process.env.ADMIN_SECRET!);
            if (isValid) {
                return NextResponse.redirect(new URL("/admin/dashboard", request.url));
            }
        }
        return NextResponse.next();
    }

    // Any other /admin/* route:
    // Must have a valid session
    if (!session) {
        return NextResponse.redirect(new URL("/admin/login", request.url));
    }

    const isValid = await verifySession(session, process.env.ADMIN_SECRET!);

    if (!isValid) {
        return NextResponse.redirect(new URL("/admin/login", request.url));
    }

    // Authenticated admin -> continue
    return NextResponse.next();
}

export const config = {
    matcher: [
        "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
    ],
};
