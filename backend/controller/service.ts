import { ServiceReport } from "@/types/service";
import { addDoc, collection, deleteDoc, getDocs } from "firebase/firestore";
import { firebase } from "../firebase";
import { uploadImageToCloudinary } from "./image";

export const createServiceReport = async (serviceReport: ServiceReport) => {
  const user = firebase.auth.currentUser;
  if (!user) throw new Error("User not logged in");
  const { db } = firebase;
  serviceReport.diagnosisResult.images = await Promise.all(
    serviceReport.diagnosisResult.images.map(async (image) => {
      return await uploadImageToCloudinary(image);
    })
  );
  const res = await addDoc(
    collection(db, "users", user.uid, "history"),
    serviceReport
  );
  return res;
};



export const getHistory = async () => {
  const user = firebase.auth.currentUser;
  if (!user) throw new Error("User not logged in");
  const { db } = firebase;
  const res = await getDocs(collection(db, "users", user.uid, "history"));
  return res.docs.map((doc) => doc.data());
};

export const clearHistory = async () => {
  const user = firebase.auth.currentUser;
  if (!user) throw new Error("User not logged in");
  const { db } = firebase;
  const historySnapshot = await getDocs(
    collection(db, "users", user.uid, "history")
  );
  await Promise.all(historySnapshot.docs.map((doc) => deleteDoc(doc.ref)));
};
