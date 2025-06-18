import nodemailer from "nodemailer";
export const emailTransporter = () => {
  let transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: +process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_EMAIL,
      pass: process.env.SMTP_PASS,
    },
  });

  transporter.verify((error, success) => {
    if (error) {
      console.log("SMTP connection error", error);
    } else {
      console.log("SMTP server is ready to send emails");
    }
  });
  return transporter;
};
