import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { name, email, message } = body;

        // Simple server-side validation
        if (!name || !email || !message) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        // Send email using Resend
        const data = await resend.emails.send({
            from: 'Contact Form <onboarding@resend.dev>', // Use verified domain if available, otherwise onboarding
            to: ['lgeobatpo98@gmail.com'],
            subject: `New Message from ${name} (Portfolio)`,
            replyTo: email,
            text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
            // Optional: Add HTML version
            html: `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
        });

        if (data.error) {
            console.error('Resend error:', data.error);
            return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
        }

        // Optional: Send confirmation email to user
        /*
        await resend.emails.send({
          from: 'Geo Portfolio <onboarding@resend.dev>', // Update with your verified domain
          to: [email],
          subject: 'Received your message!',
          text: `Hi ${name},\n\nThanks for reaching out! I've received your message and will get back to you as soon as possible.\n\nBest,\nGeo`,
        });
        */

        return NextResponse.json({ success: true, data });
    } catch (error) {
        console.error('Contact API Error:', error);
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}
