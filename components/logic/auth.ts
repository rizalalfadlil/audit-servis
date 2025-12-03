/* eslint-disable no-console */
import { login, register } from "@/backend/controller/auth";
import React from "react";

export type MessageState = { color: string; text: string } | null;
export type StartMessageFn = (
  message: string,
  type?: "success" | "failed",
  duration?: number
) => void;

export const createStartMessage = (
  setMessage: React.Dispatch<React.SetStateAction<MessageState>>
): StartMessageFn => {
  return (
    message: string,
    type: "success" | "failed" = "failed",
    duration: number = 2000
  ) => {
    setMessage({ text: message, color: type === "failed" ? "red" : "green" });
    setTimeout(() => {
      setMessage(null);
    }, duration);
  };
};

export async function handleAuthSubmit(params: {
  registerMode: boolean;
  email: string;
  password: string;
  businessName: string;
  address: string;
  startMessage: StartMessageFn;
  setRegisterMode: (v: boolean) => void;
  push: (path: string) => void;
  close: () => void;
}) {
  const {
    registerMode,
    email,
    password,
    businessName,
    address,
    startMessage,
    setRegisterMode,
    push,
    close,
  } = params;

  if (registerMode) {
    if (!email || !password || !businessName || !address) {
      startMessage("semua field harus diisi!");
      return;
    }

    try {
      await register(email, password, businessName, address);
      startMessage("Register Berhasil", "success");
      setRegisterMode(false);
    } catch (e) {
      console.log(e);
      startMessage("Register Gagal", "failed");
    }
  } else {
    if (!email || !password) {
      startMessage("semua field harus diisi!");
      return;
    }
    try {
      const res = await login(email, password);
      console.log(res);
      startMessage("Login Berhasil", "success");
      close();
      push("/app");
    } catch (e) {
      console.log(e);
      startMessage("Login Gagal: username atau password salah", "failed");
    }
  }
}
