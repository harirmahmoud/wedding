"use server";
import { Resend } from "resend";

// Function to send email
export const sendTestEmail = async () => {
    console.log("EMAIL_KEY:", process.env.EMAIL_KEY);

  const resend = new Resend(process.env.EMAIL_KEY); // create inside the function

  await resend.emails.send({
    from: "harir.barigo2004@gmail.com",
    to: "harir.walkz04@gmail.com",
    subject: "Test Email from Resend",
    html: "<strong>This is a test email sent using Resend!</strong>",
  });
};
