"use client";
import { useRouter } from "next/navigation";
import { Button } from "primereact/button";
import { useEffect, useState } from "react";
import LoginForm from "./forms/loginForm";
import { UserProps } from "@/types/user";
import { onAuthStateChanged } from "firebase/auth";
import { firebase } from "@/backend/firebase";
import { getCurrentUser } from "@/backend/controller/auth";

const WelcomeSection = () => {
  const router = useRouter();
  const [openLogin, setOpenLogin] = useState(false);
  const [user, setUser] = useState<UserProps | null>();
  useEffect(() => {
    const unsub = onAuthStateChanged(firebase.auth, async (fbUser) => {
      if (fbUser) {
        try {
          const res = await getCurrentUser();
          setUser({
            uid: res.uid,
            businessName: res.businessName,
            address: res.address,
            email: res.email,
          });
          
        } catch (e) {
          console.error(e);
          setUser(null);
        }
      } else {
        setUser(null);
      }
    });
    return () => unsub();
  }, []);

  return (
    <section className="mt-[20vh] flex flex-col justify-center items-center">
      <div className="flex flex-col gap-2 text-center justify-center items-center">
        <p className="text-4xl font-bold">
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </p>
        <p className="text-lg">
          Lorem ipsum dolor sit amet consectetur adipisicing elit Lorem ipsum
          dolor sit.
        </p>
        <div className="flex gap-2 mt-4">
          <LoginForm openLogin={openLogin} setOpenLogin={setOpenLogin} />
          <Button
            label="Get Started"
            onClick={() => user ? router.push("/app") : setOpenLogin(true)}
          />
          <Button label="Docs" className="p-button-outlined" />
        </div>
      </div>
    </section>
  );
};

export default WelcomeSection;
