import nodemailer from 'nodemailer';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { name, surname, comment } = req.body;

        if (name && surname && comment) {
            let transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'freefire.tkvsrs@gmail.com',
                    pass: 'R!shi_R3tr0@15112004'
                }
            });

            let mailOptions = {
                from: 'freefire.tkvsrs@gmail.com',
                to: 'balarishith.balli.cys@gmail.com',
                subject: 'New Contact Form Submission',
                text: `Name: ${name} ${surname}\n\nComment:\n${comment}`
            };

            try {
                await transporter.sendMail(mailOptions);
                res.status(200).send('Message sent successfully!');
            } catch (error) {
                res.status(500).send('Failed to send message.');
            }
        } else {
            res.status(400).send('All fields are required.');
        }
    } else {
        res.status(405).send('Invalid request method.');
    }
}
