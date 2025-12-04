import { getCurrentUser } from "@/backend/controller/auth";
import { firebase } from "@/backend/firebase";
import { DiagnosisResult, InitialCheck } from "@/types/service";
import { formatCurrency, toURL } from "@/utils/transform";
import { onAuthStateChanged } from "firebase/auth";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Image } from "primereact/image";
import { RefObject, useEffect, useState } from "react";

export default function ResultFile({
  diagnosisResult,
  initialCheck,
  targetRef,
}: {
  diagnosisResult: DiagnosisResult;
  initialCheck: InitialCheck;
  targetRef: RefObject<HTMLDivElement>;
}) {
  const { problems, actions, images, status } = diagnosisResult;
  const { customerName, customerContact, deviceName, complaint } = initialCheck;
  const [businessName, setBusinessName] = useState<string>("");
  const [logoUrl, setLogoUrl] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const totalCost = actions.reduce((total, action) => total + action.cost, 0);
  useEffect(() => {
    const unsub = onAuthStateChanged(firebase.auth, async (fbUser) => {
      if (fbUser) {
        try {
          const res = await getCurrentUser();
          setBusinessName(res.businessName);
          setLogoUrl(res.logoUrl);
          setAddress(res.address);
        } catch (e) {
          console.error(e);
        }
      }
    });
    return () => unsub();
  }, []);
  return (
    <div className="grid gap-8 p-[3cm] w-[21cm] bg-white" ref={targetRef}>
      {businessName && (
        <div className="flex items-center gap-8 border-b-2 pb-4 px-4">
          <Image
            src={logoUrl}
            alt="logo"
            className="h-16 aspect-square object-contain"
          />
          <div>
            <p className="text-lg font-bold">{businessName}</p>
            <p className="text-xs">{address}</p>
          </div>
        </div>
      )}
      <table className="w-fit">
        <tbody className="**:p-2">
          <tr>
            <td>Nama pelanggan</td>
            <td>: {customerName}</td>
          </tr>
          <tr>
            <td>Kontak pelanggan</td>
            <td>: {customerContact}</td>
          </tr>
          <tr>
            <td>Nama Perangkat</td>
            <td>: {deviceName}</td>
          </tr>
          <tr>
            <td>Keluhan</td>
            <td>: {complaint}</td>
          </tr>
        </tbody>
      </table>
      <div>
        <p className="text-lg font-bold">Masalah yang ditemukan</p>
        <p className="text-xs">
          berikut ini adalah masalah yang kami temukan selama pemeriksaan
        </p>
      </div>
      <DataTable emptyMessage="tidak ada data" value={problems}>
        <Column field="name" header="nama" />
        <Column field="level" header="kerusakan" />
      </DataTable>
      <div>
        <p className="text-lg font-bold">Tindakan yang diperlukan</p>
        <p className="text-xs">
          Berikut adalah daftar suku cadang dan biaya jasa yang diusulkan untuk
          memperbaiki masalah di atas
        </p>
      </div>
      <DataTable emptyMessage="tidak ada data" value={actions}>
        <Column field="name" header="nama" />
        <Column field="type" header="jenis" />
        <Column
          field="cost"
          header="biaya"
          body={(data) => formatCurrency(data.cost)}
        />
      </DataTable>
      <div>
        <p className="text-lg font-bold">Images</p>
        <p className="text-xs">berikut ini adalah gambar kondisi perangkat</p>
      </div>
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
      <div className="grid grid-cols-2">
        <div>
          <p className="text-lg font-bold">Status</p>
          <p>{status}</p>
        </div>
        <div>
          <p className="text-lg font-bold">Perkiraan biaya</p>
          <p>{formatCurrency(totalCost)}</p>
        </div>
      </div>
    </div>
  );
}
