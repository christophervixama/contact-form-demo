import { NextResponse } from 'next/server';
import { Resend } from 'resend';

// This initializes Resend using your secret key from the .env file
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    // Read the email data sent from the frontend form
    const body = await request.json();
    const { email, message } = body;

    // Send the email to your personal inbox
    const data = await resend.emails.send({
      from: 'onboarding@resend.dev', // Resend's default free testing email address
      to: 'delivered@resend.dev',   // Resend's default free testing inbox
      subject: 'New Contact Form Submission',
      html: `<p><strong>User Email:</strong> ${email}</p><p><strong>Message:</strong> ${message}</p>`,
    });

    return NextResponse.json({ success: true, data });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to send email' }, { status: 500 });
  }
}
