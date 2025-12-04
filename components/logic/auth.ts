import { login, register } from "@/backend/controller/auth";
import { translateFirebaseMessage } from "@/utils/transform";
import React from "react";

export type MessageState = { type: "success" | "error"; text: string } | null;
export type StartMessageFn = (
  message: string,
  type?: "success" | "error",
  duration?: number
) => void;

export type ErrorState = {
  code: string;
  message: string;
};
export const createStartMessage = (
  setMessage: React.Dispatch<React.SetStateAction<MessageState>>
): StartMessageFn => {
  return (
    message: string,
    type: "success" | "error" = "error",
    duration: number = 2000
  ) => {
    setMessage({ text: message, type: type });
    setTimeout(() => {
      setMessage(null);
    }, duration);
  };
};

export async function handleAuthSubmit(params: {
  registerMode: boolean;
  email: string;
  logo: File | Blob | null;
  password: string;
  businessName: string;
  address: string;
  startMessage: StartMessageFn;
  setRegisterMode: (v: boolean) => void;
  push: (path: string) => void;
  setLoading: (v: boolean) => void;
  close: () => void;
}) {
  const {
    registerMode,
    email,
    logo,
    password,
    businessName,
    address,
    startMessage,
    setRegisterMode,
    push,
    setLoading,
    close,
  } = params;

  if (registerMode) {
    if (!email || !password || !businessName || !address || !logo) {
      startMessage("semua field harus diisi!");
      return;
    }

    try {
      setLoading(true);
      await register(email, password, businessName, address, logo);
      startMessage("Register Berhasil", "success");
      setRegisterMode(false);
    } catch (e) {
      const error = e as ErrorState;
      startMessage(
        `Register gagal, ${translateFirebaseMessage(error.code)}`,
        "error"
      );
    } finally {
      setLoading(false);
    }
  } else {
    if (!email || !password) {
      startMessage("semua field harus diisi!");
      return;
    }
    try {
      setLoading(true);
      await login(email, password);
      startMessage("Login Berhasil", "success");
      close();
      push("/app");
    } catch (e) {
      const error = e as ErrorState;
      startMessage(
        `Login Gagal, ${translateFirebaseMessage(error.code)}`,
        "error"
      );
    } finally {
      setLoading(false);
    }
  }
}
