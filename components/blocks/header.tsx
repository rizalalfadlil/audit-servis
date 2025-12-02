"use client";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { Toolbar } from "primereact/toolbar";
import { useEffect, useState } from "react";
import { IoHome } from "react-icons/io5";
import { useRouter } from "next/navigation";
import LoginForm from "../forms/loginForm";
import { getCurrentUser, logOut } from "@/backend/controller/auth";
import { onAuthStateChanged } from "firebase/auth";
import { firebase } from "@/backend/firebase";
import { UserProps } from "@/types/user";
import { Menubar } from "primereact/menubar";
import { BiUserCircle } from "react-icons/bi";
import { Tooltip } from "primereact/tooltip";

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
          });
          console.log(res);
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

  const onSignOut = async () => {
    try {
      await logOut();
      window.location.reload();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <Toolbar
        start={
          <IoHome
            size={24}
            onClick={() => {
              router.push("/");
            }}
          />
        }
        className="fixed w-full top-0 z-50"
        end={
          <>
            {user ? (
              <div className="flex items-center gap-4">
                <Button
                  outlined
                  onClick={() => router.push("/history")}
                  icon="pi pi-history"
                  text
                  size="small"
                />
                <BiUserCircle size={24} />
                <p>{user.businessName}</p>
                <Button
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
                  onClick={() => setOpenLogin(true)}
                  icon="pi pi-sign-in"
                  size="small"
                />
              </>
            )}
          </>
        }
      />

      <Dialog
        header="Login"
        visible={openLogin}
        style={{ width: "50vw" }}
        footer={null}
        breakpoints={{ "960px": "75vw", "641px": "100vw" }}
        onHide={() => setOpenLogin(false)}
      >
        <LoginForm />
      </Dialog>
    </>
  );
}
