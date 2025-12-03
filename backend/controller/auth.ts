import { doc, getDoc, setDoc } from "firebase/firestore";
import { firebase } from "../firebase";

const { auth, db } = firebase;

import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";

export const login = async (email: string, password: string) => {
  try {
    const { user } = await signInWithEmailAndPassword(auth, email, password);
    return user;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error(String(error));
  }
};

export const register = async (
  email: string,
  password: string,
  businessName: string,
  address: string
) => {
  try {
    const { user } = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const userDocRef = doc(db, "users", user.uid);
    await setDoc(userDocRef, { businessName, address }, { merge: true });
    return user;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error(String(error));
  }
};

export const getCurrentUser = async () => {
  try {
    const user = auth.currentUser;
    if (user) {
      const userDocRef = doc(db, "users", user.uid);
      const userDocSnap = await getDoc(userDocRef);
      if (userDocSnap.exists()) {
        return {
          ...user,
          businessName: userDocSnap.data().businessName,
          address: userDocSnap.data().address,
        };
      } else {
        throw new Error("User not found");
      }
    } else {
      throw new Error("User not logged in");
    }
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error(String(error));
  }
};

export const logOut = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error(String(error));
  }
};
