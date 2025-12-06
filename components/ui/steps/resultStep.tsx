"use client";
import { Button } from "primereact/button";
import { Toolbar } from "primereact/toolbar";
import { DiagnosisResult, InitialCheck, ServiceReport } from "@/types/service";
import { usePDF } from "react-to-pdf";
import ResultFile from "../fileParts/resultFile";
import { createServiceReport } from "@/backend/controller/service";
import { useRef, useState } from "react";
import { Messages } from "primereact/messages";
import { Messages as MessagesType } from "primereact/messages";
import { checkLogin } from "@/backend/controller/auth";

export default function ResultStep({
  diagnosisResult,
  initialCheck,
  prev,
}: {
  diagnosisResult: DiagnosisResult;
  initialCheck: InitialCheck;
  prev: () => void;
}) {
  const [loading, setLoading] = useState(false);
  const { toPDF, targetRef } = usePDF({
    filename: "page.pdf",
  });
  const serviceReport: ServiceReport = { diagnosisResult, initialCheck };
  const msgs = useRef<MessagesType>(null);
  const [isLoggedIn] = useState(checkLogin());
  const saveResult = async () => {
    try {
      setLoading(true);
      toPDF();
      if (isLoggedIn) {
        await createServiceReport(serviceReport);
        msgs.current?.show({
          severity: "success",
          summary: "Success",
          detail: "Hasil berhasil disimpan",
        });
      } else {
        msgs.current?.show({
          severity: "success",
          summary: "Success",
          detail: "Hasil berhasil diunduh, login untuk menyimpan riwayat hasil",
        });
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      msgs.current?.show({
        severity: "error",
        summary: "Error",
        detail: "Gagal Menyimpan Hasil",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div>
        <p className="text-2xl font-bold">Pratinjau Hasil Diagnosis</p>
        <p>
          berikut hasil diagnosis perangkat, anda bisa memeriksa kembali hasil
          diagnosis ini atau mengunduhnya untuk dibagikan ke pelanggan.
        </p>
      </div>
      <div className="overflow-auto bg-gray-200 p-4 my-8 max-h-[50vh]">
        <ResultFile
          diagnosisResult={diagnosisResult}
          initialCheck={initialCheck}
          targetRef={targetRef}
        />
      </div>
      <Messages ref={msgs} />
      <Toolbar
        start={
          <Button
            label="kembali"
            icon="pi pi-arrow-left"
            severity="secondary"
            onClick={prev}
          />
        }
        end={
          <Button
            label="Simpan"
            icon="pi pi-save"
            loading={loading}
            onClick={() => saveResult()}
          />
        }
      />
    </>
  );
}
