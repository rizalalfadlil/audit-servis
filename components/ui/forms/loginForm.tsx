"use client";
import { useRouter } from "next/navigation";
import { Button } from "primereact/button";
import { Divider } from "primereact/divider";
import { FloatLabel } from "primereact/floatlabel";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Password } from "primereact/password";
import { useState } from "react";
import { createStartMessage, handleAuthSubmit } from "@/components/logic/auth";
import { Dialog } from "primereact/dialog";
import { FileUpload } from "primereact/fileupload";
import { Message } from "primereact/message";

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
  const [loading, setLoading] = useState(false);
  const [logo, setLogo] = useState<File | Blob | null>(null);

  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>({ type: "error", text: "" });

  const startMessage = createStartMessage(setMessage);
  const handleSubmit = async () => {
    await handleAuthSubmit({
      setLoading,
      close: () => setOpenLogin(false),
      registerMode,
      email,
      logo,
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
      visible={openLogin}
      draggable={false}
      style={{ width: "50vw" }}
      breakpoints={{ "960px": "75vw", "641px": "100vw" }}
      onHide={() => setOpenLogin(false)}
    >
      <div className="grid lg:grid-cols-2 gap-8">
        <div
          className="hidden lg:block rounded-lg bg-contain bg-center bg-no-repeat"
          style={{ backgroundImage: "url(/graphics/login.svg)" }}
        ></div>
        <div className="grid gap-8 py-8 **:w-full">
          <p className="text-lg font-bold">
            {registerMode ? "Register" : "Login"}
          </p>
          {message?.text && (
            <Message severity={message?.type} text={message?.text} />
          )}
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
                <label htmlFor="name">Nama Usaha Anda</label>
              </FloatLabel>
              <FloatLabel>
                <InputTextarea
                  id="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  maxLength={100}
                  minLength={0}
                />
                <label htmlFor="address">Alamat</label>
              </FloatLabel>
              <div>
                <p className="text-sm p-2">Logo</p>
                <FileUpload
                  name="logo"
                  mode="basic"
                  auto
                  className="w-full"
                  accept="image/png"
                  maxFileSize={1000000}
                  onSelect={(e) => setLogo(e.files[0])}
                />
              </div>
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
            {registerMode ? "Sudah Punya Akun? " : "Belum Punya Akun? "}
            <span
              onClick={() => setRegisterMode(!registerMode)}
              className="text-blue-500 hover:border-b cursor-pointer"
            >
              {registerMode ? "Masuk" : "Daftar Sekarang"}
            </span>
          </p>
          <div>
            <Button
              label={registerMode ? "Daftar" : "Masuk"}
              onClick={handleSubmit}
              loading={loading}
            />
          </div>
          <div>
            <Button
              label="Lanjutkan Tanpa Akun"
              loading={loading}
              severity="secondary"
              onClick={() => {
                router.push("/app");
                setOpenLogin(false);
              }}
            />
            <p className="text-sm mt-1">
              login diperlukan untuk menyimpan riwayat servis dan membuka
              fitur lainnya
            </p>
          </div>
        </div>
      </div>
    </Dialog>
  );
}
