"use client";
import { useRouter } from "next/navigation";
import { Button } from "primereact/button";
import { Divider } from "primereact/divider";
import { FloatLabel } from "primereact/floatlabel";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Password } from "primereact/password";
import React, { useState } from "react";
import { createStartMessage, handleAuthSubmit } from "@/components/logic/auth";
import { Dialog } from "primereact/dialog";

export default function LoginForm({
  openLogin,
  setOpenLogin,
}: {
  openLogin: boolean;
  setOpenLogin: (open: boolean) => void;
}) {
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

  const startMessage = createStartMessage(setMessage);
  const handleSubmit = async () => {
    await handleAuthSubmit({
      close: () => setOpenLogin(false),
      registerMode,
      email,
      password,
      businessName,
      address,
      startMessage,
      setRegisterMode,
      push: (path: string) => router.push(path),
    });
  };

  return (
    <Dialog
      header="Login"
      visible={openLogin}
      style={{ width: "50vw" }}
      footer={null}
      breakpoints={{ "960px": "75vw", "641px": "100vw" }}
      onHide={() => setOpenLogin(false)}
    >
      <div className="grid lg:grid-cols-2 gap-4">
        <div className="hidden lg:block bg-gray-200 rounded-lg">

        </div>
        <div className="grid gap-8 py-8 **:w-full">
          <p className="text-lg font-bold">{registerMode ? "Register" : "Login"}</p>
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
            {registerMode
              ? "Already have Account? "
              : "Don't have an Account? "}
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
          <Button
            label="Continue Without Account"
            severity="secondary"
            onClick={() => {
              close();
              router.push("/app");
            }}
          />
        </div>
      </div>
    </Dialog>
  );
}
