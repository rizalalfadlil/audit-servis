import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Panel } from "primereact/panel";
import { TiWarning } from "react-icons/ti";
import { Problem } from "@/types/service";

const ProblemLayout = ({
  problems,
  removeProblem,
}: {
  problems: Problem[];
  removeProblem: (index: number) => void;
}) => {
  return (
    <Panel
      header={
        <div className="flex items-center gap-4">
          <TiWarning size={24} />
          <p>Masalah yang ditemukan</p>
        </div>
      }
    >
      <DataTable
        emptyMessage="tidak ada data"
        dataKey="index"
        value={problems.map((problem, index) => ({
          ...problem,
          index: index,
        }))}
      >
        <Column field="name" header="nama" />
        <Column
          field="level"
          header="level"
          body={(data) => (
            <div className="flex items-center justify-between">
              <span>{data.level}</span>
              <Button
                icon="pi pi-times"
                type="button"
                rounded
                text
                size="small"
                severity="danger"
                onClick={() => removeProblem(data.index)}
              />
            </div>
          )}
        />
      </DataTable>
    </Panel>
  );
};

export default ProblemLayout;
