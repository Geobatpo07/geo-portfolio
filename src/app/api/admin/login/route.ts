import { NextResponse } from "next/server"
import { cookies } from "next/headers"

// Async HMAC signer using WebCrypto
async function signToken(token: string, secret: string) {
    const encoder = new TextEncoder()
    const key = await crypto.subtle.importKey(
        "raw",
        encoder.encode(secret),
        { name: "HMAC", hash: "SHA-256" },
        false,
        ["sign"]
    )

    const signature = await crypto.subtle.sign(
        "HMAC",
        key,
        encoder.encode(token)
    )

    return Buffer.from(signature).toString("hex")
}

export async function POST(req: Request) {
    try {
        const { email, password } = await req.json()

        if (!email || !password) {
            return NextResponse.json({ error: "Missing credentials" }, { status: 400 })
        }

        // Compare with ENV admin credentials
        if (
            email !== process.env.ADMIN_EMAIL ||
            password !== process.env.ADMIN_PASSWORD
        ) {
            return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
        }

        // Create session payload
        const payload = JSON.stringify({
            admin: true,
            exp: Date.now() + 7 * 24 * 60 * 60 * 1000 // 7 days
        })

        // Sign payload
        const signature = await signToken(payload, process.env.ADMIN_SECRET!)
        const cookieValue = `${Buffer.from(payload).toString("base64")}.${signature}`

        const cookieStore = await cookies()
        cookieStore.set("admin_session", cookieValue, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            path: "/",
            sameSite: "strict",
            maxAge: 60 * 60 * 24 * 7, // 7 days
        })

        return NextResponse.json({ success: true })
    } catch (err) {
        console.error("Admin login error:", err)
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
    }
}
