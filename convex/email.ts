import { action } from "./_generated/server"
import { v } from "convex/values"

/**
 * Send email notification via Resend when a contact message is received
 * This is an action (not a mutation) because it makes HTTP requests
 */
export const sendContactEmail = action({
    args: {
        name: v.string(),
        email: v.string(),
        message: v.string(),
    },
    handler: async (ctx, { name, email, message }) => {
        const resendApiKey = process.env.RESEND_API_KEY

        if (!resendApiKey) {
            console.error("RESEND_API_KEY not configured")
            return { success: false, error: "Email service not configured" }
        }

        try {
            const response = await fetch("https://api.resend.com/emails", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${resendApiKey}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    from: "Portfolio Contact <onboarding@resend.dev>",
                    to: ["lgeobatpo98@gmail.com"],
                    reply_to: email,
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
                — Geo's Stories Portfolio (via Resend + Convex)
              </p>
            </div>
          `,
                    text: `
            New Message from ${name}
            
            Name: ${name}
            Email: ${email}
            
            Message:
            ${message}
          `,
                }),
            })

            if (!response.ok) {
                const error = await response.text()
                console.error("Resend API error:", error)
                return { success: false, error: "Failed to send email" }
            }

            return { success: true }
        } catch (error) {
            console.error("Error sending email:", error)
            return { success: false, error: "Failed to send email" }
        }
    },
})
