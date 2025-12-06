"use client";
import { Button } from "primereact/button";
import { Toolbar } from "primereact/toolbar";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import LoginForm from "../forms/loginForm";
import { getCurrentUser, logOut } from "@/backend/controller/auth";
import { onAuthStateChanged } from "firebase/auth";
import { firebase } from "@/backend/config/firebase";
import { UserProps } from "@/types/user";

export default function Header() {
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
            logoUrl: res.logoUrl,
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

  function profileButton(user: UserProps) {
    return (
      <>
        <div className="hidden sm:block">
          <Button
            tooltip="Perbarui profil"
            tooltipOptions={{
              position: "bottom",
            }}
            outlined
            label={user.businessName}
            icon="pi pi-user"
            text
            severity="secondary"
            onClick={() => router.push("/profile")}
          />
        </div>
        <div className="block sm:hidden">
          <Button
            tooltip="Perbarui profil"
            tooltipOptions={{
              position: "bottom",
            }}
            outlined  
            icon="pi pi-user"
            text
            severity="secondary"
            onClick={() => router.push("/profile")}
          />
        </div>
      </>
    );
  }

  const onSignOut = async () => {
    try {
      await logOut();
      router.push("/");
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <Toolbar
        start={
          <>
            <p
              className="text-lg font-bold"
              style={{ cursor: "pointer", color: "var(--primary-color)" }}
              onClick={() => router.push("/app")}
            >
              Audit Servis
            </p>
          </>
        }
        className="fixed w-full top-0 z-50"
        end={
          <>
            {user ? (
              <div className="flex items-center gap-4">
                <Button
                  tooltip="Riwayat"
                  tooltipOptions={{
                    position: "bottom",
                  }}
                  outlined
                  onClick={() => router.push("/history")}
                  icon="pi pi-history"
                  text
                  size="small"
                />
                {profileButton(user)}
                <Button
                  tooltip="Keluar"
                  tooltipOptions={{
                    position: "bottom",
                  }}
                  outlined
                  onClick={onSignOut}
                  icon="pi pi-sign-out"
                  text
                  severity="secondary"
                  size="small"
                />
              </div>
            ) : (
              <>
                <Button
                  label="Login"
                  icon="pi pi-sign-in"
                  size="small"
                  onClick={() => setOpenLogin(true)}
                />
              </>
            )}
          </>
        }
      />

      <LoginForm openLogin={openLogin} setOpenLogin={setOpenLogin} />
    </>
  );
}
