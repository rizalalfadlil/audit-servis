"use client";

import { FloatLabel } from "primereact/floatlabel";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { FileUpload } from "primereact/fileupload";
import { Button } from "primereact/button";
import { Message } from "primereact/message";
import { useEffect, useState } from "react";
import { UserProps } from "@/types/user";
import { onAuthStateChanged,  } from "firebase/auth";
import { firebase } from "@/backend/firebase";
import { getCurrentUser, updateProfile } from "@/backend/controller/auth";

export default function Page() {
  const [businessName, setBusinessName] = useState("")
  const [address, setAddress] = useState("")
  const [logoUrl, setLogoUrl] = useState("");
  const [message, setMessage] = useState<{ text: string, type: "error" | "success" }>({ text: "", type: "error" })
  const [logo, setLogo] = useState<File | Blob | null>(null);
  const clear = () => {
    setBusinessName("")
    setAddress("")
    setLogoUrl("")
    setLogo(null)
  }

  useEffect(() => {
    const unsub = onAuthStateChanged(firebase.auth, async (fbUser) => {
      if (fbUser) {
        try {
          const res = await getCurrentUser();
          setBusinessName(res.businessName)
          setAddress(res.address)
          setLogoUrl(res.logoUrl)
        } catch (e) {
          console.error(e);
          clear()
        }
      } else {
        clear()
      }
    });
    return () => unsub();
  }, []);

  const handleImageChange = (e: any) => {
    setLogo(e.files[0])
    setLogoUrl(URL.createObjectURL(e.files[0]))
  }
  const startMessage = (text: string, type: "error"|"success"="success") => {
    setMessage({ text, type })
    setTimeout(() => {
      setMessage({ text: "", type: "error" })
    }, 2000)
  }
  const onSubmit = async () => {
    try{
      const res = await updateProfile(businessName, address, logo)
      startMessage("Profile updated successfully", "success")
    }catch(e){
      console.error(e)
      startMessage("Something went wrong",)
    }
  }
  return (
    <div className="grid gap-8 w-full">
      {message.text &&
        <Message text={message.text} severity={message.type} />}
      <p className="text-lg font-bold">Update Your Profile</p>
      <FloatLabel>
        <InputText id="name" className="w-full" value={businessName} onChange={(e) => setBusinessName(e.target.value)} />
        <label htmlFor="name">Name</label>
      </FloatLabel>
      <FloatLabel>
        <InputTextarea id="address" className="w-full" value={address} onChange={(e) => setAddress(e.target.value)} />
        <label htmlFor="address">Address</label>
      </FloatLabel>
      <div>
        <p className="mb-4 text-gray-500">Logo</p>
        {logoUrl && <img src={logoUrl} alt="logo" className="w-40 aspect-square rounded-lg py-4" />}

        <FileUpload mode="basic" id="logo" onSelect={handleImageChange} auto className="w-fit" />
      </div>
      <Button label="Save" onClick={onSubmit} />
    </div>
  );
}
