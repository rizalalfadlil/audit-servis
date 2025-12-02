"use client"
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { FloatLabel } from "primereact/floatlabel";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Toolbar } from "primereact/toolbar";
import { useState } from "react";
import { IoHome } from "react-icons/io5";
import { useRouter } from "next/navigation";

export default function Header() {
    const router = useRouter()
    const [openLogin, setOpenLogin] = useState(false)
    return (<>
        <Toolbar
            start={<IoHome size={24} onClick={()=>{router.push('/')}}/>}
            className="fixed w-full top-0 z-50"
            end={<Button label="Login" onClick={() => setOpenLogin(true)} icon="pi pi-sign-in" size="small" />}
        />
        <Dialog header="Login" visible={openLogin} style={{ width: "50vw" }} footer={null} onHide={() => setOpenLogin(false)}>
            <div className="grid gap-8 **:w-full">
                <FloatLabel>
                    <InputText id="email" />
                    <label htmlFor="email">Email</label>
                </FloatLabel>
                <FloatLabel>
                    <Password id="password" />
                    <label htmlFor="password">Password</label>
                </FloatLabel>
                <p className="text-end">Don't Have Account? <a href="#" className="text-blue-500 hover:border-b">Register Now</a></p>
                <Button label="Log in"/>
                <Button label="Continue Without Account" severity="secondary"/>
            </div>
        </Dialog>
    </>
    )
}