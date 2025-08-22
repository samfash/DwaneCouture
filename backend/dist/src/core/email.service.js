// src/core/email.service.ts
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import logger from "./logger";
import config from "./config";
dotenv.config();
const googleAppPassword = config.email.googleAppPassword;
export const sendEmail = async (email, subject, text) => {
    try {
        const transporter = nodemailer.createTransport({
            service: "Gmail",
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                user: config.email.mailAddress,
                pass: googleAppPassword,
            },
        });
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: subject,
            text: text,
        };
        await transporter.sendMail(mailOptions);
    }
    catch (error) {
        const err = error;
        logger.error("❌Error sending mail", { message: err.message });
        console.error("❌Error sending email", error);
    }
};
