"use client";

import { FloatLabel } from "primereact/floatlabel";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { FileUpload } from 'primereact/fileupload';
import { Button } from "primereact/button";

export default function Page() {
    return (
        <div className="grid gap-8 w-full">
            <p className="text-lg font-bold">Update Your Profile</p>
            <FloatLabel>
                <InputText id="name" className="w-full" />
                <label htmlFor="name">Name</label>
            </FloatLabel>
            <FloatLabel>
                <InputTextarea id="address" className="w-full" />
                <label htmlFor="address">Address</label>
            </FloatLabel>
            <div>
                <p className="mb-4 text-gray-500">Logo</p>
                <FileUpload mode="basic" id="logo" className="w-fit"/>
            </div>
            <Button label="Save"/>
        </div>
    );
}
