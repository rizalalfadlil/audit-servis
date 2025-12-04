import { DiagnosisResult, InitialCheck } from "@/types/service";
import { toURL } from "@/utils/transform";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Image } from "primereact/image";

export default function ResultFile({
    diagnosisResult,
    initialCheck,
    targetRef
}: {
    diagnosisResult: DiagnosisResult;
    initialCheck: InitialCheck;
    targetRef: any
}) {
    const { problems, actions, images } = diagnosisResult;
    const { customerName, customerContact, deviceName, complaint } = initialCheck;
    return (
        <div className="grid gap-8 p-[3cm] w-[21cm] bg-white" ref={targetRef}>
            <table className="w-fit">
                <tbody className="**:p-2">
                    <tr>
                        <td>Customer Name</td>
                        <td>: {customerName}</td>
                    </tr>
                    <tr>
                        <td>Customer Contact</td>
                        <td>: {customerContact}</td>
                    </tr>
                    <tr>
                        <td>Device Name</td>
                        <td>: {deviceName}</td>
                    </tr>
                    <tr>
                        <td>Complaint</td>
                        <td>: {complaint}</td>
                    </tr>
                </tbody>
            </table>
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
            <div className="flex flex-wrap gap-4">
                {images.map((image, index) => (
                    <Image
                        src={toURL(image)}
                        className="h-40 aspect-square"
                        key={index}
                        alt="image"
                    />
                ))}
            </div>
        </div>
    )
}