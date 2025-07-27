const nodemailer = require('nodemailer');
const { validationResult } = require('express-validator');

exports.handleContactForm = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ 
            message: "Validation failed. Please check your input.",
            errors: errors.array() 
        });
    }

    const { name, email, subject, message } = req.body;
    const recipientEmail = process.env.CONTACT_FORM_RECIPIENT_EMAIL || "your-email@example.com";

// --- DEBUGGING ENV VARS ---
    console.log("Contact Form: Attempting to create Nodemailer transport with:");
    console.log("EMAIL_HOST:", process.env.EMAIL_HOST);
    console.log("EMAIL_PORT:", process.env.EMAIL_PORT);
    console.log("EMAIL_USER (set?):", process.env.EMAIL_USER ? 'Yes' : 'No'); 
    console.log("EMAIL_PASS (set?):", process.env.EMAIL_PASS ? 'Yes' : 'No');
    console.log("CONTACT_FORM_RECIPIENT_EMAIL:", process.env.CONTACT_FORM_RECIPIENT_EMAIL);
    // --- END DEBUGGING ---
    let transporter;
    try {
        transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: parseInt(process.env.EMAIL_PORT, 10) || 587,
            secure: (parseInt(process.env.EMAIL_PORT, 10) || 587) === 465,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            }
        });
    } catch (error) {
        console.error("Error creating transporter:", error);
        return res.status(500).json({ message: "Email service configuration error." });
    }

    const mailOptions = {
        from: `"${name}" <${email}>`,
        to: recipientEmail,
        replyTo: email,
        subject: `New Contact Form Submission: ${subject}`,
        text: `You have a new message from ${name} (${email}):\n\n${message}`,
        html: `
            <p>You have a new message from:</p>
            <ul>
                <li><strong>Name:</strong> ${name}</li>
                <li><strong>Email:</strong> ${email}</li>
                <li><strong>Subject:</strong> ${subject}</li>
            </ul>
            <p><strong>Message:</strong></p>
            <p>${message.replace(/\n/g, '<br>')}</p>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: "Thank you! Your message has been sent successfully." });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ message: "Sorry, there was an error sending your message. Please try again later." });
    }
};
