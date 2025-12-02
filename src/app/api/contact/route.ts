import { NextResponse } from "next/server"
import { Resend } from "resend"
import { createClient } from "@supabase/supabase-js"

// Required for Resend on Vercel
export const runtime = "nodejs"

// Supabase server client (service_role key required)
const supabase = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false } }
)

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: Request) {
    try {
        // Validate environment vars
        if (!process.env.RESEND_API_KEY) {
            console.error("Missing RESEND_API_KEY")
            return NextResponse.json({ error: "Server misconfiguration" }, { status: 500 })
        }
        if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
            console.error("Supabase env vars missing")
            return NextResponse.json({ error: "Server misconfiguration" }, { status: 500 })
        }

        const body = await req.json()
        const { name, email, message } = body

        // Validation
        if (!name || !email || !message) {
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
            )
        }

        // ---------------------------
        // 1️⃣ Save to Supabase logs
        // ---------------------------
        const { error: supabaseError } = await supabase
            .from("contact_messages")
            .insert([{ name, email, message }])

        if (supabaseError) {
            console.error("Supabase insert error:", supabaseError)
        }

        // ---------------------------
        // 2️⃣ Send Email via Resend
        // ---------------------------
        await resend.emails.send({
            from: "Portfolio Contact <onboarding@resend.dev>",
            to: ["lgeobatpo98@gmail.com"],
            replyTo: email,
            subject: `New Message from ${name} (Geo's Stories Portfolio)`,

            html: `
                <div style="font-family: Arial, sans-serif; padding: 20px; background: #f9fafb; border-radius: 8px;">
                    <h2 style="color: #4f46e5; margin-bottom: 10px;">📩 New Portfolio Message</h2>

                    <div style="background: #ffffff; padding: 16px; border-radius: 6px; border: 1px solid #e5e7eb;">
                        <p><strong>Name:</strong> ${name}</p>
                        <p><strong>Email:</strong> ${email}</p>
                        <p><strong>Message:</strong></p>
                        <p style="white-space: pre-line; line-height: 1.6;">
                            ${message.replace(/\n/g, "<br>")}
                        </p>
                    </div>

                    <p style="margin-top: 20px; font-size: 12px; color: #6b7280;">
                        — Geo's Stories Portfolio (via Resend + Supabase)
                    </p>
                </div>
            `,
            text: `
                New Message from ${name}

                Name: ${name}
                Email: ${email}

                Message:
                ${message}
            `
        })

        return NextResponse.json({ success: true })
    } catch (error) {
        console.error("Contact API Error:", error)
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        )
    }
}
