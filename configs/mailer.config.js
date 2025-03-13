import nodemailer from 'nodemailer';
import { MAIL_HOST, MAIL_PORT, MAIL_USER, MAIL_PASS } from '../configs/dotenv.config.js';

const transporter = nodemailer.createTransport({
  host: MAIL_HOST,
  port: MAIL_PORT,
  auth: {
    user: MAIL_USER,
    pass: MAIL_PASS,
  },
});

export const Mailer = async (email, mailer_subject, mailer_text) => {
  try {
    const mail_options = {
      from: MAIL_USER,
      to: email,
      subject: mailer_subject,
      text: mailer_text,
    };
    await transporter.sendMail(mail_options);
    return true;
  } catch (error) {
    console.log('Error sending mail', error);
    return false;
  }
};
