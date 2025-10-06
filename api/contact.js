import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name, email, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Send email using nodemailer
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    try {
      // Email to site owner
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_USER,
        subject: `New Contact Form Submission from ${name}`,
        text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
      });

      // Confirmation email to submitter
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Thank you for contacting me!',
        text: `Hi ${name},\n\nThank you for reaching out! I have received your message and will get back to you soon.\n\nBest,\nJun Liang`,
      });

      return res.status(200).json({ success: true });
    } catch (err) {
      console.error('Error in /api/contact:', err);
      return res.status(500).json({ error: 'Failed to send email' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}