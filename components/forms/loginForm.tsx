"use client";
import { login, register } from "@/backend/controller/auth";
import { useRouter } from "next/navigation";
import { Button } from "primereact/button";
import { Divider } from "primereact/divider";
import { FloatLabel } from "primereact/floatlabel";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Password } from "primereact/password";
import React, { useState } from "react";

export default function LoginForm() {
  const router = useRouter();
  const [businessName, setBusinessName] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [registerMode, setRegisterMode] = useState(false);

  const [message, setMessage] = useState<{
    color: string;
    text: string;
  } | null>({ color: "", text: "" });

  const failLogin = (message: string) => {
    setMessage({ text: message, color: "red" });
    setTimeout(() => {
      setMessage(null);
    }, 2000);
  };
  const successLogin = (message: string) => {
    setMessage({ text: message, color: "green" });
    setTimeout(() => {
      setMessage(null);
    }, 2000);
  };
  const handleSubmit = async () => {
    if (registerMode) {
      if (!email || !password || !businessName || !address) {
        failLogin("semua field harus diisi!");
        return;
      }

      try {
        await register(email, password, businessName, address);
        successLogin("Register Berhasil");
        setRegisterMode(false);
      } catch (e) {
        console.log(e);
        failLogin("Register Gagal");
      }
    } else {
      if (!email || !password) {
        failLogin("semua field harus diisi!");
        return;
      }
      try {
        const res = await login(email, password);
        console.log(res);
        successLogin("Login Berhasil");
        router.push("/app");
      } catch (e) {
        console.log(e);
        failLogin("Login Gagal: username atau password salah");
      }
    }
  };

  return (
    <div className="grid gap-8 py-8 **:w-full">
      {registerMode && (
        <>
          <FloatLabel>
            <InputText
              id="name"
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
              maxLength={50}
              minLength={0}
            />
            <label htmlFor="name">Name</label>
          </FloatLabel>
          <FloatLabel>
            <InputTextarea
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              maxLength={100}
              minLength={0}
            />
            <label htmlFor="address">Address</label>
          </FloatLabel>
          <Divider />
        </>
      )}
      <FloatLabel>
        <InputText
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="email">Email</label>
      </FloatLabel>
      <FloatLabel>
        <Password
          id="password"
          feedback={false}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <label htmlFor="password">Password</label>
      </FloatLabel>

      <p className="text-end select-none">
        {registerMode ? "Already have Account? " : "Don't have an Account? "}
        <span
          onClick={() => setRegisterMode(!registerMode)}
          className="text-blue-500 hover:border-b cursor-pointer"
        >
          {registerMode ? "Log in" : "Register Now"}
        </span>
      </p>
      <div>
        <Button label="Log in" onClick={handleSubmit} />
        <p className="text-xs mt-2" style={{ color: message?.color }}>
          {message?.text}
        </p>
      </div>
      <Button label="Continue Without Account" severity="secondary" />
    </div>
  );
}
