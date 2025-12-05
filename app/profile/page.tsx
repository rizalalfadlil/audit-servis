"use client";

import { FloatLabel } from "primereact/floatlabel";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { FileUpload, FileUploadSelectEvent } from "primereact/fileupload";
import { Button } from "primereact/button";
import { Message } from "primereact/message";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { firebase } from "@/backend/firebase";
import { getCurrentUser, updateProfile } from "@/backend/controller/auth";
import { Image } from "primereact/image";
import ErrorPage from "@/components/ui/layouts/errorPage";

export default function Page() {
  const [businessName, setBusinessName] = useState("");
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [logoUrl, setLogoUrl] = useState("");
  const [logo, setLogo] = useState<File | Blob | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [message, setMessage] = useState<{
    text: string;
    type: "error" | "success";
  }>({ text: "", type: "error" });
  const clear = () => {
    setBusinessName("");
    setAddress("");
    setLogoUrl("");
  };

  useEffect(() => {
    const unsub = onAuthStateChanged(firebase.auth, async (fbUser) => {
      if (fbUser) {
        setIsLoggedIn(true);
        try {
          setLoading(true);
          const res = await getCurrentUser();
          setBusinessName(res.businessName);
          setAddress(res.address);
          setLogoUrl(res.logoUrl);
        } catch (e) {
          console.error(e);
          clear();
        } finally {
          setLoading(false);
        }
      } else {
        setIsLoggedIn(false);
        clear();
      }
    });
    return () => unsub();
  }, []);

  const handleImageChange = (e: FileUploadSelectEvent) => {
    if (
      !e.files ||
      e.files.length === 0 ||
      !e.files[0] ||
      e.files[0].size > 2000000
    ) {
      startMessage("File tidak valid", "error");
      return;
    }
    if (!e.files[0].type.startsWith("image/png")) {
      startMessage("File harus berupa gambar png", "error");
      return;
    }
    try {
      const file = e.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          setLogoUrl(reader.result as string);
        };
        reader.readAsDataURL(file);
        setLogo(file);
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (e) {
      startMessage("Gagal Mengunggah Logo");
    }
  };
  const startMessage = (
    text: string,
    type: "error" | "success" = "success"
  ) => {
    setMessage({ text, type });
    setTimeout(() => {
      setMessage({ text: "", type: "error" });
    }, 2000);
  };
  const onSubmit = async () => {
    try {
      await updateProfile(businessName, address, logo);
      setLoading(true);
      startMessage("Profil Berhasil Diperbarui", "success");
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (e) {
      console.error(e);
      startMessage("Gagal Memperbarui Profil");
    } finally {
      setLoading(false);
    }
  };
  return isLoggedIn ? (
    <div className="grid gap-8 w-full">
      {message.text && <Message text={message.text} severity={message.type} />}
      <p className="text-lg font-bold">Perbarui Profil</p>
      <FloatLabel>
        <InputText
          disabled={loading}
          id="name"
          className="w-full"
          value={businessName}
          onChange={(e) => setBusinessName(e.target.value)}
        />
        <label htmlFor="name">Nama Bisnis</label>
      </FloatLabel>
      <FloatLabel>
        <InputTextarea
          disabled={loading}
          id="address"
          className="w-full"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <label htmlFor="address">Alamat</label>
      </FloatLabel>
      <div>
        <p className="mb-4 text-gray-500">Logo</p>
        {logoUrl && (
          <Image
            src={logoUrl}
            alt="logo"
            imageClassName="w-40 aspect-square rounded-lg py-4 object-contain"
          />
        )}

        <FileUpload
          mode="basic"
          accept="image/png"
          maxFileSize={1000000}
          id="logo"
          onSelect={handleImageChange}
          auto
          className="w-fit"
        />
      </div>
      <Button
        label="Simpan"
        onClick={onSubmit}
        disabled={loading}
        loading={loading}
      />
    </div>
  ) : (
    <ErrorPage code="401" />
  );
}
