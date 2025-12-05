import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";

export const ProblemContent = ({
  problems,
}: {
  problems: { name: string; level: string }[];
}) => {
  return (
    problems.length > 0 && (
      <>
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
      </>
    )
  );
};