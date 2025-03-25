import { createTransport } from "nodemailer";
import "dotenv/config";

export const mailTransporter = createTransport({
  service: "gmail",
  auth: {
    user: process.env.APP_EMAIL,
    pass: process.env.APP_PASSWORD,
  },
});

export const registerUserMailTemplate = `<div>
<h2>Dear {{username}},</h2>
<p>A new account has been created for you</p>
<h3>Thank you</h3>
</div>`;
