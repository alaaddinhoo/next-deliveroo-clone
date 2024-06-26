"use server";
import { Resend } from "resend";
import { Email } from "./components/email";

const resend = new Resend(`${process.env.RESEND_API_KEY}`);

export const sendVerificationEmail = async (email, verificationLink) => {
  await resend.emails.send({
    from: "onboarding@resend.dev", // update this
    to: "alaaeldin.92@outlook.com",
    // to: email,  // use this
    subject: "Verify Your Email Address",
    react: <Email url={verificationLink} />,
  });
};
