import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  doc,
  getDoc,
  writeBatch,
  query,
  where,
  getDocs,
} from "firebase/firestore";
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
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
export const db = getFirestore(firebaseApp);
export const auth = getAuth();
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

export const getDocumentById = async (collection: string, id: string) => {
  const docRef = doc(db, collection, id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    console.log("No such document!");
    return null;
  }
};

export const batchPostJsonDocuments = async (
  jsonDocuments: any[],
  collectionName: string
) => {
  const batch = writeBatch(db);
  const collectionRef = collection(db, collectionName);

  jsonDocuments.forEach((document) => {
    const docRef = doc(collectionRef);
    batch.set(docRef, document);
  });

  await batch.commit();
};

export const getMenuByRestaurantID = async (restaurantID: string) => {
  const menuRef = collection(db, "menu");
  const q = query(menuRef, where("restaurantID", "==", restaurantID));
  const querySnapshot = await getDocs(q);

  const menus = querySnapshot.docs.map((doc) => doc.data());
  return menus.length ? menus[0] : null; // Assuming there's only one document per restaurantID
};
