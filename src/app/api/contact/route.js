import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req) {
    try {
        const { firstName, lastName, email, phoneNumber, message } = await req.json();

        // Validation
        if (!firstName || !lastName || !email || !message) {
            return NextResponse.json({ error: 'All primary fields are required' }, { status: 400 });
        }

        // Configure Nodemailer with standardized Gmail settings
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            host: 'smtp.gmail.com',
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: process.env.EMAIL_USER?.trim(),
                pass: process.env.EMAIL_PASS?.trim(),
            },
        });

        // 🟢 EMAIL 1: Notification sent to YOU (Jun Liang)
        await transporter.sendMail({
            from: `"Portfolio Portal" <${process.env.EMAIL_USER}>`,
            to: process.env.EMAIL_USER,
            subject: `🚀 New Lead: ${firstName} ${lastName}`,
            html: `
                <div style="font-family: sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
                    <h2 style="color: #BA3D01; border-bottom: 2px solid #BA3D01; padding-bottom: 10px;">New Contact Submission</h2>
                    <table style="width: 100%; text-align: left; border-collapse: collapse;">
                        <tr>
                            <th style="padding: 10px; border-bottom: 1px solid #eee;">Name</th>
                            <td style="padding: 10px; border-bottom: 1px solid #eee;">${firstName} ${lastName}</td>
                        </tr>
                        <tr>
                            <th style="padding: 10px; border-bottom: 1px solid #eee;">Email</th>
                            <td style="padding: 10px; border-bottom: 1px solid #eee;"><a href="mailto:${email}">${email}</a></td>
                        </tr>
                        <tr>
                            <th style="padding: 10px; border-bottom: 1px solid #eee;">Phone</th>
                            <td style="padding: 10px; border-bottom: 1px solid #eee;">${phoneNumber || 'Not provided'}</td>
                        </tr>
                    </table>
                    <div style="margin-top: 20px;">
                        <h3 style="color: #555;">Message Content:</h3>
                        <div style="background: #f9f9f9; padding: 15px; border-radius: 5px; color: #333; line-height: 1.6;">
                            ${message.replace(/\n/g, '<br>')}
                        </div>
                    </div>
                </div>
            `,
            replyTo: email,
        });

        // 🔵 EMAIL 2: Branded Confirmation sent to the sender
        await transporter.sendMail({
            from: `"Jun Liang" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: 'Connection Received | Jun Liang',
            html: `
                <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 600px; margin: auto; color: #333;">
                    <div style="background-color: #000; padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
                        <h1 style="color: #BA3D01; margin: 0; letter-spacing: 2px;">JUN LIANG</h1>
                    </div>
                    <div style="padding: 40px; border: 1px solid #eee; border-top: none; border-radius: 0 0 10px 10px; background: #fff;">
                        <p style="font-size: 16px; line-height: 1.6;">Hi ${firstName},</p>
                        <p style="font-size: 16px; line-height: 1.6;">Thanks for reaching out! I've received your message regarding your interest in building something cool together.</p>
                        <p style="font-size: 16px; line-height: 1.6;">I've set aside some time to review your inquiry and will get back to you within 24-48 hours. In the meantime, feel free to check out my latest builds on my portfolio or follow my journey on social media.</p>
                        
                        <div style="margin: 30px 0; padding: 20px; border-left: 4px solid #BA3D01; background: #fdf2ed;">
                            <p style="margin: 0; font-style: italic; color: #444;">"Success is not final, failure is not fatal: it is the courage to continue that counts."</p>
                        </div>

                        <p style="font-size: 16px; line-height: 1.6;">Stay hungry, stay foolish.</p>
                        
                        <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #eee;">
                            <p style="font-weight: bold; margin: 0;">Jun Liang</p>
                            <p style="color: #888; font-size: 14px; margin: 5px 0;">Intelligence Computing Student | AI Engineer Intern</p>
                            <p style="margin: 10px 0 0;">
                                <a href="https://junliang-portfolio.vercel.app/" style="color: #BA3D01; text-decoration: none;">Portfolio</a> | 
                                <a href="https://github.com/JunLiang1115" style="color: #BA3D01; text-decoration: none;">GitHub</a>
                            </p>
                        </div>
                    </div>
                </div>
            `,
        });

        console.log('✅ Contact form emails sent successfully!');
        return NextResponse.json({ success: true }, { status: 200 });

    } catch (err) {
        console.error('❌ Error sending email:', err);
        return NextResponse.json(
            { error: 'System busy. Please try again later.' },
            { status: 500 }
        );
    }
}
