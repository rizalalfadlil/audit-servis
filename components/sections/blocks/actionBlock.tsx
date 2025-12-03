import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { FaX } from "react-icons/fa6";
import { InputText } from "primereact/inputtext";
import { useState } from "react";
import { Button } from "primereact/button";
import { Tag } from "primereact/tag";
import { Panel } from "primereact/panel";
import { FaTools } from "react-icons/fa";
import { Action } from "@/types/service";

const ActionBlock = ({
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
          <p>Required Actions</p>
        </div>
      }
    >
      <DataTable
        dataKey="index"
        value={actions.map((action, index) => ({ ...action, index }))}
      >
        <Column
          field="name"
          header="name"
          body={(data) => (
            <div className="flex items-center gap-2">
              <span>{data.name}</span>
              <Tag value={data.type} />
            </div>
          )}
        />
        <Column
          field="cost"
          header="cost"
          body={(data) => (
            <div className="flex items-center justify-between">
              <span>{data.cost}</span>
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

export default ActionBlock;
