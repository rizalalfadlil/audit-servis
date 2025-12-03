import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Toolbar } from "primereact/toolbar";
import { useState } from "react";
import { BsLaptop } from "react-icons/bs";
import { DiagnosisResult, InitialCheck, Problem } from "@/types/service"


export default function ResultSection({ diagnosisResult, initialCheck }: { diagnosisResult: DiagnosisResult, initialCheck: InitialCheck }) {
    const {problems, actions, images} = diagnosisResult
    const { customerName, customerContact, deviceName, complaint } = initialCheck
    return (
        <div className="py-8 grid gap-8">
            <div className="flex items-center gap-4">
                <BsLaptop size={80} />
                <div className="px-4">
                    <p>{deviceName || "Device Name"}</p>
                    <p className="text-xs text-gray-500">{complaint || "complaint"}</p>
                </div>
            </div>
            <p className="text-lg font-bold">Problems Found</p>
            <DataTable value={problems}>
                <Column field="name" header="name" />
                <Column field="level" header="level" />
            </DataTable>
            <p className="text-lg font-bold">Actions Required</p>
            <DataTable value={actions}>
                <Column field="name" header="name" />
                <Column field="type" header="type" />
                <Column field="cost" header="cost" />
            </DataTable>
            <p className="text-lg font-bold">Images</p>
            <div className="flex gap-4 *:rounded-lg overflow-y-auto">
                {images.map((image, index) => (
                    <img src={image} className="h-40 aspect-square" key={index} />
                ))}
            </div>
            <Toolbar
                start={
                    <Button label="Back" severity="secondary" />
                }
                end={<Button label="Share" />}
            />
        </div>
    )
}