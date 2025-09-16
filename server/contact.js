// server/contact.js
// Express route for contact form submission and email sending
const express = require('express');
const nodemailer = require('nodemailer');
require('dotenv').config();

const router = express.Router();

// Configure your transporter (use environment variables for security)
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER, // your email
        pass: process.env.EMAIL_PASS, // your email app password
    },
});

router.post('/contact', async (req, res) => {
    const { firstName, lastName, email, phoneNumber, message } = req.body;
    if (!firstName || !lastName || !email || !message) {
        return res.status(400).json({ error: 'Missing required fields' });
    }
    try {
        // Email to submitter (receiver is the form submitter)
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email, // send to the submitter
            subject: `New Contact Form Submission from ${firstName} ${lastName}`,
            text: `Name: ${firstName} ${lastName}\nEmail: ${email}\nPhone: ${phoneNumber}\nMessage: ${message}`,
        });
        // Confirmation email to submitter
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Thank you for contacting me!',
            text: `Hi ${firstName},\n\nThank you for reaching out! I have received your message and will get back to you soon.\n\nBest,\nJun Liang`,
        });
        res.status(200).json({ success: true });
    } catch (err) {
        console.error('Error in /api/contact:', err);
        res.status(500).json({ error: 'Failed to send email' });
    }
});

module.exports = router;
