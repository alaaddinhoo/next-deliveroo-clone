"use server"; // must run on the server since Admin SDK can only run on secure environments
import { createUserWithEmailAndPassword, Auth } from "firebase/auth";
import { adminAuth } from "@/utils/firebase/firebaseAdmin";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { sendVerificationEmail } from "@/utils/email/send-email";
import { auth } from "./firebase";
import * as authErrors from "./authErorrs.json";

/* we need this file for generateEmailVerificationLink function */
// https://firebase.google.com/docs/auth/admin/email-action-links

const isProduction = process.env.NODE_ENV === "production";
const baseURL = isProduction
  ? process.env.NEXT_PUBLIC_BASE_URL_PRODUCTION
  : process.env.NEXT_PUBLIC_BASE_URL_DEVELOPMENT;

// Email Sign Up
export async function emailSignUp(email: string, password: string) {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    const actionCodeSettings = {
      url: `${baseURL}/verify-email`, // Customize this URL
      handleCodeInApp: true, // This must be true
    };

    // Generate the email verification link using Admin SDK
    const verificationLink = await adminAuth.generateEmailVerificationLink(
      email,
      actionCodeSettings
    );

    // Modify the verification link to point to /verifyAccount
    const url = new URL(verificationLink);
    const mode = url.searchParams.get("mode");
    const oobCode = url.searchParams.get("oobCode");
    const customVerificationLink = `${baseURL}/accountVerified?mode=${mode}&oobCode=${oobCode}`;

    // Send the custom verification email
    await sendVerificationEmail(email, customVerificationLink);

    // Create a new document in the "users" collection with the email
    const db = getFirestore(); // Initialize Firestore
    const userDocRef = doc(db, "users", userCredential.user.uid);
    await setDoc(userDocRef, { email, cart: [] });

    // Serialize the user credential to ensure it is a plain object
    const serializedUserCredential = JSON.parse(
      JSON.stringify(userCredential.user)
    );
    return serializedUserCredential;
  } catch (error: any) {
    // Handle different error codes from Firebase Auth
    if (error.code === "auth/email-already-in-use") {
      throw new Error("This email is already in use.");
    } else if (error.code === "auth/invalid-email") {
      throw new Error("The email address is not valid.");
    } else if (error.code === "auth/operation-not-allowed") {
      throw new Error("Email/password accounts are not enabled.");
    } else if (error.code === "auth/weak-password") {
      throw new Error("The password is too weak.");
    } else {
      throw new Error("An unknown error occurred. Please try again later.");
    }
  }
}

export async function resendVerificationLink(email: string) {
  try {
    const actionCodeSettings = {
      url: `${baseURL}/verify-email`, // Customize this URL
      handleCodeInApp: true, // This must be true
    };

    // Generate the email verification link using Admin SDK
    const verificationLink = await adminAuth.generateEmailVerificationLink(
      email,
      actionCodeSettings
    );

    // Modify the verification link to point to /verifyAccount
    const url = new URL(verificationLink);
    const mode = url.searchParams.get("mode");
    const oobCode = url.searchParams.get("oobCode");
    const customVerificationLink = `${baseURL}/accountVerified?mode=${mode}&oobCode=${oobCode}`;

    // Send the custom verification email
    await sendVerificationEmail(email, customVerificationLink);
  } catch (error: any) {
    const errorCode = error.code.replace("auth/", "");

    if (error.code && (authErrors as any)[errorCode]) {
      throw new Error((authErrors as any)[errorCode]);
    } else {
      throw new Error("The process has failed. Please try again later."); // Default message
    }
  }
}
