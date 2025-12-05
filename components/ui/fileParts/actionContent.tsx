import { formatCurrency } from "@/utils/transform";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";

export const ActionContent = ({
  actions,
}: {
  actions: { name: string; type: string; cost: number }[];
}) => {
  return actions.length > 0 && (
    <>
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
    </>
  );
};