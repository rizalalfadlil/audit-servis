import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Toolbar } from "primereact/toolbar";
import { useState } from "react";
import { BsLaptop } from "react-icons/bs";

export default function ResultSection() {
    const [problems, setProblems] = useState<string[]>(["Problem 1", "Problem 2", "Problem 3"])
    const [actions, setActions] = useState([
        {
            name: "Action 1",
            type: "service",
            cost: 100000,
        },
        {
            name: "Action 2",
            type: "product",
            cost: 200000,
        },
        {
            name: "Action 3",
            type: "service",
            cost: 300000,
        },
    ]);

    const images = [
        "https://picsum.photos/200/300",
        "https://picsum.photos/200",
        "https://picsum.photos/200/300",
    ]

    return (
        <div className="py-8 grid gap-8">
            <div className="flex items-center gap-4">
                <BsLaptop size={80} />
                <div className="px-4">
                    <p>Device Information</p>
                    <p className="text-xs text-gray-500">Device Information</p>
                </div>
            </div>
            <p className="text-lg font-bold">Problems Found</p>
            <DataTable value={problems.map((problem, index) => ({
                name: problem,
                index: index,
            }))}>
                <Column field="name" header="name" />
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