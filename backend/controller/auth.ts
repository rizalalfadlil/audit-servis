import { doc, getDoc, setDoc } from "firebase/firestore";
import { firebase } from "../config/firebase";

const { auth, db } = firebase;

import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { uploadImageToCloudinary } from "./image";

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

export const updateProfile = async (
  businessName?: string,
  address?: string,
  logo?: File | Blob | null
) => {
  try {
    const user = auth.currentUser;
    if (!user) {
      throw new Error("User not logged in");
    }

    const userDocRef = doc(db, "users", user.uid);
    const updateData: { [key: string]: string } = {};

    if (businessName !== undefined) {
      updateData.businessName = businessName;
    }
    if (address !== undefined) {
      updateData.address = address;
    }
    if (logo) {
      const logoUrl = await uploadImageToCloudinary(logo);
      updateData.logoUrl = logoUrl;
    }

    if (Object.keys(updateData).length > 0) {
      await setDoc(userDocRef, updateData, { merge: true });
    }

    return await getCurrentUser();
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
  address: string,
  logo: File | Blob
) => {
  try {
    const { user } = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    const logoUrl = await uploadImageToCloudinary(logo);
    const userDocRef = doc(db, "users", user.uid);
    await setDoc(
      userDocRef,
      { businessName, address, logoUrl },
      { merge: true }
    );
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
          logoUrl: userDocSnap.data().logoUrl,
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

export const checkLogin = (): boolean => {
  return auth.currentUser !== null;
};
