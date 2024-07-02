"use server";
import { Resend } from "resend";
import { Email } from "./components/email";

const resend = new Resend(`${process.env.RESEND_API_KEY}`);

export const sendVerificationEmail = async (email, verificationLink) => {
  await resend.emails.send({
    from: "onboarding@codewithalaa.store",
    to: email,
    subject: "Verify Your Email Address",
    react: <Email url={verificationLink} />,
  });
};
