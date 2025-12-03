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
  const [problemLevel, setProblemLevel] = useState<Problem["level"]>("low");
  const [actionName, setActionName] = useState("");
  const [actionType, setActionType] = useState<Action["type"]>("service");
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
    setProblemLevel("low");
    setActionName("");
    setActionType("service");
    setActionCost(0);
  };
  return (
    <TabView>
      <TabPanel header="Problem">
        <div className="py-8 grid md:flex items-start gap-8 w-full items-center">
          <FloatLabel className="grow">
            <InputText
              className="w-full"
              id="problemName"
              value={problemName}
              onChange={(e) => setProblemName(e.target.value)}
            />
            <label htmlFor="problemName">Problem Name</label>
          </FloatLabel>
          <FloatLabel className="grow *:w-full">
            <Dropdown
              inputId="problemLevel"
              options={["low", "moderate", "high"]}
              className="grow"
              value={problemLevel}
              onChange={(e) => setProblemLevel(e.value)}
            />
            <label htmlFor="problemLevel">Problem Level</label>
          </FloatLabel>
          <Button
            label="Add"
            className="grow"
            disabled={!problemName}
            onClick={updateProblem}
          />
        </div>
      </TabPanel>
      <TabPanel header="Action">
        <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-8 py-4 items-center">
          <FloatLabel className=" *:w-full">
            <InputText
              className="w-full"
              id="actionName"
              value={actionName}
              onChange={(e) => setActionName(e.target.value)}
              placeholder="Action Name"
            />
            <label htmlFor="actionName">Action Name</label>
          </FloatLabel>
          <FloatLabel className="grow *:w-full">
            <Dropdown
              inputId="actionType"
              options={["service", "product"]}
              className="grow"
              value={actionType}
              onChange={(e) => setActionType(e.value)}
            />
            <label htmlFor="actionType">Action Type</label>
          </FloatLabel>
          <FloatLabel className="grow *:w-full">
            <InputNumber
              className="grow"
              inputId="actionCost"
              placeholder="Action Cost"
              value={actionCost}
              onChange={(e) => setActionCost(Number(e.value))}
            />
            <label htmlFor="actionCost">Action Cost</label>
          </FloatLabel>
          <Button
            label="Add"
            disabled={!actionName || !actionType}
            onClick={updateAction}
          />
        </div>
      </TabPanel>
    </TabView>
  );
}
