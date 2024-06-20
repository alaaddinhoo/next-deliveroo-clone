import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import * as authErrors from "./authErorrs.json";
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
  signOut,
  applyActionCode,
  Auth,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD_1IBY-B5iU5WPZA7pcnr2bbv1-3Muyy4",
  authDomain: "nextjs-test-8e44c.firebaseapp.com",
  projectId: "nextjs-test-8e44c",
  storageBucket: "nextjs-test-8e44c.appspot.com",
  messagingSenderId: "735322299390",
  appId: "1:735322299390:web:1b233ec8426a02aaca3eaf",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const auth = getAuth();
onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/auth.user
    const uid = user.uid;
    console.log("User is signed in:", user.uid);
    // ...
  } else {
    // User is signed out
    // ...
    console.log("User is signed out");
  }
});

/*  for a list of all auth functions  */
// https://firebase.google.com/docs/reference/js/auth#autherrorcodes

// Google Sign In
export const googleSignIn = async (auth: Auth) => {
  const provider = new GoogleAuthProvider();
  const result = await signInWithPopup(auth, provider);
  return JSON.parse(JSON.stringify(result.user)); // Ensure returning a plain object
};

// Facebook Sign In
export const facebookSignIn = async (auth: Auth) => {
  const provider = new FacebookAuthProvider();
  const result = await signInWithPopup(auth, provider);
  return JSON.parse(JSON.stringify(result.user)); // Ensure returning a plain object
};

// Sign Out
export const signOutUser = async (auth: Auth) => {
  await signOut(auth);
  return { message: "User signed out" }; // Return a plain object
};

// Check Email Verification
export const checkEmailVerification = async (auth: Auth) => {
  const user = auth.currentUser;
  if (!user) {
    throw new Error("No user is currently signed in.");
  }
  await user.reload();
  return { emailVerified: user.emailVerified }; // Return a plain object
};

// Check Email Verification
export const verifyUser = async (oobCode: string) => {
  try {
    // Serialize the user credential to ensure it is a plain object
    await applyActionCode(auth, oobCode);
  } catch (error: any) {
    // Handle specific Firebase Auth errors
    // let errorMessage = "Error signing in.";
    // switch (error.code) {
    //   case "auth/invalid-action-code":
    //     errorMessage = "Invalid email format. Please check your email.";
    //     break;
    //   default:
    //     errorMessage = "Verification failed. Please try again later.";
    //     break;
    // }
    // throw new Error(errorMessage);

    const errorCode = error.code.replace("auth/", "");
    console.log(error.code);

    if (error.code && (authErrors as any)[errorCode]) {
      throw new Error((authErrors as any)[errorCode]);
    } else {
      throw new Error("Verification failed. Please try again later."); // Default message if no match found
    }
  }
};

// Email Sign In
export const emailSignIn = async (email: string, password: string) => {
  try {
    // Serialize the user credential to ensure it is a plain object
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const serializedUserCredential = JSON.parse(JSON.stringify(userCredential));
    return serializedUserCredential;
  } catch (error: any) {
    // Handle specific Firebase Auth errors
    // let errorMessage = "Error signing in.";
    // switch (error.code) {
    //   case "auth/user-not-found":
    //     errorMessage = "This account doesn't exist. Try a different email.";
    //     break;
    //   // case "auth/wrong-password":
    //   //   errorMessage = "Incorrect password. Please try again.";
    //   //   break;
    //   case "auth/invalid-email":
    //     errorMessage = "Invalid email format. Please check your email.";
    //     break;
    //   case "auth/user-disabled":
    //     errorMessage = "This account has been disabled.";
    //     break;
    //   case "auth/too-many-requests":
    //     errorMessage =
    //       "Too many unsuccessful login attempts. Please try again later.";
    //     break;
    //   case "auth/network-request-failed":
    //     errorMessage =
    //       "Network error. Please check your connection and try again.";
    //     break;
    //   case "auth/invalid-credential":
    //     errorMessage =
    //       "Invalid credentials. Please check your email and password.";
    //     break;
    //   default:
    //     errorMessage = "Sign-in failed. Please try again later.";
    //     break;
    // }
    // throw new Error(errorMessage);

    const errorCode = error.code.replace("auth/", "");
    console.log(error.code);

    if (error.code && (authErrors as any)[errorCode]) {
      throw new Error((authErrors as any)[errorCode]);
    } else {
      throw new Error("Sign-in failed. Please try again later."); // Default message if no match found
    }
  }
};

export { db, auth };
