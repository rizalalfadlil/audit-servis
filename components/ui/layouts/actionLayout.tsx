import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Tag } from "primereact/tag";
import { Panel } from "primereact/panel";
import { FaTools } from "react-icons/fa";
import { Action } from "@/types/service";
import { formatCurrency } from "@/utils/transform";

const ActionLayout = ({
  actions,
  removeAction,
}: {
  actions: Action[];
  removeAction: (index: number) => void;
}) => {
  return (
    <Panel
      header={
        <div className="flex items-center gap-4">
          <FaTools size={24} />
          <p>Tindakan yang diperlukan</p>
        </div>
      }
    >
      <DataTable
        emptyMessage="tidak ada data"
        dataKey="index"
        value={actions.map((action, index) => ({ ...action, index }))}
      >
        <Column
          field="name"
          header="nama"
          body={(data) => (
            <div className="flex items-center gap-2">
              <span>{data.name}</span>
              <Tag value={data.type} />
            </div>
          )}
        />
        <Column
          field="cost"
          header="biaya"
          body={(data) => (
            <div className="flex items-center justify-between">
              <span>{formatCurrency(data.cost)}</span>
              <Button
                icon="pi pi-times"
                type="button"
                rounded
                text
                size="small"
                severity="danger"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  removeAction(data.index);
                }}
              />
            </div>
          )}
        />
      </DataTable>
    </Panel>
  );
};

export default ActionLayout;
