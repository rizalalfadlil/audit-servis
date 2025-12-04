"use client";
import { useEffect, useRef, useState } from "react";
import { ServiceReport } from "@/types/service";
import { getHistory } from "@/backend/controller/service";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { firebase } from "@/backend/firebase";
import { Dialog } from "primereact/dialog";
import ResultFile from "@/components/ui/layouts/resultFile";
import { usePDF } from "react-to-pdf";
import { Button } from "primereact/button";
import { Messages } from "primereact/messages";
import { clearHistory } from "@/backend/controller/service";
import { confirmDialog, ConfirmDialog } from "primereact/confirmdialog";
import ErrorPage from "@/components/ui/sections/errorPage";
import Crop from "@/components/ui/layouts/crop";

export default function History() {
  const { toPDF, targetRef } = usePDF({ filename: "page.pdf" });
  const [history, setHistory] = useState<ServiceReport[]>([]);
  const [loading, setLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const msgs = useRef<Messages>(null);
  const [selectedHistory, setSelectedHistory] = useState<ServiceReport | null>(
    null
  );

  const fetchHistory = async () => {
    try {
      setLoading(true);
      const res = await getHistory();
      setHistory(res as ServiceReport[]);
    } catch (e) {
      msgs.current?.show({
        severity: "error",
        summary: "Error",
        detail: "Gagal Mengambil Riwayat",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = firebase.auth.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true);
        fetchHistory();
      } else {
        setIsLoggedIn(false);
        msgs.current?.show({
          severity: "error",
          summary: "Error",
          detail: "User not authenticated",
        });
      }
    });

    return () => unsubscribe();
  }, []);

  const confirmDelete = () => {
    confirmDialog({
      message: "Anda yakin ingin menghapus semua riwayat?",
      header: "Konfirmasi",
      icon: "pi pi-exclamation-triangle",
      accept: () => clearHistoryData(),
      reject: () => {},
      acceptClassName: "p-button-danger",
      acceptLabel: "Hapus",
      rejectLabel: "Batal",
    });
  };
  const clearHistoryData = async () => {
    try {
      setLoading(true);
      await clearHistory();
      fetchHistory();
    } catch (e) {
      msgs.current?.show({
        severity: "error",
        summary: "Error",
        detail: "Gagal Mengambil Riwayat",
      });
    } finally {
      setLoading(false);
    }
  };

  return isLoggedIn ? (
    <Crop className="space-y-8">
      <p className="p-4 font-bold text-lg">Riwayat Servis</p>
      <DataTable
        emptyMessage="tidak ada data"
        value={history}
        loading={loading}
        selectionMode="single"
        selection={selectedHistory}
        onSelectionChange={(e) => setSelectedHistory(e.value as ServiceReport)}
      >
        <Column field="initialCheck.customerName" header="Customer Name" />
        <Column field="initialCheck.deviceName" header="Nama Perangkat" />
        <Column field="initialCheck.complaint" header="Complaint" />
      </DataTable>
      <Dialog
        header="Service Report"
        visible={!!selectedHistory}
        style={{ width: "50vw" }}
        breakpoints={{ "1024px": "50vw", "768px": "100vw" }}
        footer={null}
        onHide={() => setSelectedHistory(null)}
      >
        <div className="overflow-x-auto bg-gray-200 p-4 my-8">
          {selectedHistory && (
            <ResultFile
              diagnosisResult={selectedHistory.diagnosisResult}
              initialCheck={selectedHistory.initialCheck}
              targetRef={targetRef}
            />
          )}
        </div>
        <Button label="Download" onClick={() => toPDF()} />
      </Dialog>
      <Messages ref={msgs} />
      <ConfirmDialog
        style={{ width: "50vw" }}
        breakpoints={{ "1100px": "75vw", "960px": "100vw" }}
      />
      <Button
        label="Hapus Semua Riwayat"
        severity="danger"
        icon="pi pi-trash"
        disabled={loading}
        onClick={confirmDelete}
      />
    </Crop>
  ) : (
    <ErrorPage code="401" />
  );
}
