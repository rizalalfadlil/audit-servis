"use client";
import { Divider } from "primereact/divider";
import { Toolbar } from "primereact/toolbar";
import { Button } from "primereact/button";
import ProblemLayout from "../layouts/problemLayout";
import ActionLayout from "../layouts/actionLayout";
import ActionProblemForm from "../forms/actionProblemForm";
import ImageUploads from "../layouts/imageUploads";
import { DiagnosisResult, InitialCheck } from "@/types/service";
import { SetDiagnosisResult } from "@/types/service-react";
import { AutoComplete } from "primereact/autocomplete";
import { useState } from "react";
import { formatCurrency } from "@/utils/transform";

export default function DiagnosisStep({
  diagnosisResult,
  initialCheck,
  setDiagnosisResult,
  status,
  setStatus,
  navigate,
}: {
  diagnosisResult: DiagnosisResult;
  initialCheck: InitialCheck;
  setDiagnosisResult: SetDiagnosisResult;
  status: string;
  setStatus: (status: string) => void;
  navigate: {
    prev: () => void;
    next: () => void;
  };
}) {
  const { problems, actions, images } = diagnosisResult;
  const { deviceName, complaint } = initialCheck;
  const {
    addProblem,
    addAction,
    addImage,
    removeProblem,
    removeAction,
    removeImage,
  } = setDiagnosisResult;
  const [suggestions, setSuggestions] = useState([
    "Menunggu Persetujuan",
    "Menunggu Pembayaran",
    "Sedang Diperbaiki",
    "Siap Diambil",
    "Dibatalkan",
  ]);
  const search = (event: { query: string }) => {
    setSuggestions(
      [
        "Menunggu Persetujuan",
        "Menunggu Pembayaran",
        "Sedang Diperbaiki",
        "Siap Diambil",
        "Dibatalkan",
      ].filter((item) => item.toLowerCase().includes(event.query.toLowerCase()))
    );
  };
  return (
    <section className="space-y-8">
      <div>
        <p className="text-2xl font-bold">Diagnosis Kerusakan</p>
        <p>
          catat semua kerusakan yang ditemukan, tulis suku cadang atau servis
          serta biayanya, dan foto kondisi perangkat.
        </p>
      </div>
      <Divider />
      <div>
        <p>{deviceName || "Nama Perangkat"}</p>
        <p className="text-xs text-gray-500">{complaint || "Keluhan"}</p>
      </div>
      <p className="text-lg font-bold">Tambah Kerusakan dan Perbaikan</p>
      <ActionProblemForm addProblem={addProblem} addAction={addAction} />
      <div className="grid lg:grid-cols-2 gap-8">
        <ProblemLayout problems={problems} removeProblem={removeProblem} />
        <ActionLayout actions={actions} removeAction={removeAction} />
      </div>
      <p className="text-lg font-bold">Gambar Bukti</p>
      <ImageUploads
        onFilesChange={addImage}
        removeImage={removeImage}
        images={images}
      />
      <p className="text-lg font-bold">Status</p>
      <AutoComplete
        inputClassName="w-full"
        className="w-full md:w-[50%]"
        value={status}
        onChange={(e) => setStatus(e.value)}
        suggestions={suggestions}
        completeMethod={search}
      />
      <Toolbar
        start={
          <Button
            label="kembali"
            severity="secondary"
            icon="pi pi-arrow-left"
            onClick={navigate.prev}
          />
        }
        end={
          <div className="gap-8 flex items-center">
            <div>
              <p className="text-xs text-gray-500">Total Biaya</p>
              <p>
                {formatCurrency(
                  actions.reduce((total, action) => total + action.cost, 0)
                )}
              </p>
            </div>
            <Button label="Selesai" onClick={navigate.next} icon="pi pi-check" />
          </div>
        }
      />
    </section>
  );
}
