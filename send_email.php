// api/sendEmail.js
export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name, surname, comment } = req.body;

    if (!name || !surname || !comment) {
      return res.status(400).json({ error: 'All fields are required.' });
    }

    const nodemailer = require('nodemailer');

    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    let mailOptions = {
      from: process.env.EMAIL_USER,
      to: 'balli.balarishith.cys@gmail.com',
      subject: 'New Contact Form Submission',
      text: `Name: ${name} ${surname}\n\nComment:\n${comment}`,
    };

    try {
      await transporter.sendMail(mailOptions);
      res.status(200).json({ message: 'Message sent successfully!' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to send message.' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed.' });
  }
}
