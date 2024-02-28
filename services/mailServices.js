const nodemailer = require('nodemailer');

const sendMail = async(to,subject,text)=>{
    try {
        const transporter = nodemailer.createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            secure: false,
            auth: {
                user: process.env.NODEMAILER_USERNAME,
                pass: process.env.NODEMAILER_PASSWORD
            }
        });
        const mailOptions = {
            from: 'love_recipe2024@gmail.com', // Sender email address
            to: to, // Recipient email address
            subject: subject, // Email subject
            text: text // Email body
        };
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent: ', info.messageId);
    } catch (error) {
        console.error('Error sending email: ', error);
    }
}

module.exports = sendMail;