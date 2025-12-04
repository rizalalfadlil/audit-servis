"use client";
import { Action, Problem } from "@/types/service";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { FloatLabel } from "primereact/floatlabel";
import { InputNumber } from "primereact/inputnumber";
import { InputText } from "primereact/inputtext";
import { TabPanel, TabView } from "primereact/tabview";
import { useState } from "react";

export default function ActionProblemForm({
  addProblem,
  addAction,
}: {
  addProblem: (problem: Problem) => void;
  addAction: (action: Action) => void;
}) {
  const [problemName, setProblemName] = useState("");
  const [problemLevel, setProblemLevel] = useState<Problem["level"]>("rendah");
  const [actionName, setActionName] = useState("");
  const [actionType, setActionType] = useState<Action["type"]>("jasa");
  const [actionCost, setActionCost] = useState(0);

  const updateProblem = () => {
    addProblem({
      name: problemName,
      level: problemLevel,
    });
    clear();
  };

  const updateAction = () => {
    addAction({
      name: actionName,
      type: actionType,
      cost: actionCost,
    });
    clear();
  };
  const clear = () => {
    setProblemName("");
    setProblemLevel("rendah");
    setActionName("");
    setActionType("jasa");
    setActionCost(0);
  };
  return (
    <TabView>
      <TabPanel header="Kerusakan">
        <div className="py-8 grid md:flex items-start gap-8 w-full items-center">
          <FloatLabel className="grow">
            <InputText
              className="w-full"
              id="problemName"
              value={problemName}
              onChange={(e) => setProblemName(e.target.value)}
            />
            <label htmlFor="problemName">Nama Kerusakan</label>
          </FloatLabel>
          <FloatLabel className="grow *:w-full">
            <Dropdown
              inputId="problemLevel"
              options={["rendah", "sedang", "tinggi"]}
              className="grow"
              value={problemLevel}
              onChange={(e) => setProblemLevel(e.value)}
            />
            <label htmlFor="problemLevel">Tingkat Kerusakan</label>
          </FloatLabel>
          <Button
            label="tambahkan"
            className="grow"
            disabled={!problemName}
            onClick={updateProblem}
          />
        </div>
      </TabPanel>
      <TabPanel header="Perbaikan">
        <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-8 py-4 items-center">
          <FloatLabel className=" *:w-full">
            <InputText
              className="w-full"
              id="actionName"
              value={actionName}
              onChange={(e) => setActionName(e.target.value)}
            />
            <label htmlFor="actionName">Nama Tindakan</label>
          </FloatLabel>
          <FloatLabel className="grow *:w-full">
            <Dropdown
              inputId="actionType"
              options={["jasa", "barang"]}
              className="grow"
              value={actionType}
              onChange={(e) => setActionType(e.value)}
            />
            <label htmlFor="actionType">Jenis</label>
          </FloatLabel>
          <FloatLabel className="grow *:w-full">
            <InputNumber
              className="grow"
              inputId="actionCost"
              placeholder="Action Cost"
              value={actionCost}
              onChange={(e) => setActionCost(Number(e.value))}
            />
            <label htmlFor="actionCost">Biaya</label>
          </FloatLabel>
          <Button
            label="tambahkan"
            disabled={!actionName || !actionType}
            onClick={updateAction}
          />
        </div>
      </TabPanel>
    </TabView>
  );
}
