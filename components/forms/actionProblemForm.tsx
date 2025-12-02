"use client";
import { Action, Problem } from "@/types/service";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { FloatLabel } from "primereact/floatlabel";
import { InputNumber } from "primereact/inputnumber";
import { InputText } from "primereact/inputtext";
import { TabPanel, TabView } from "primereact/tabview";
import React, { useState } from "react";

export default function ActionProblemForm({
  problems,
  setProblems,
  actions,
  setActions,
}: {
  problems: Problem[];
  actions: {
    name: string;
    type: string;
    cost: number;
  }[];
  setProblems: (problems: Problem[]) => void;
  setActions: (
    actions: {
      name: string;
      type: string;
      cost: number;
    }[]
  ) => void;
}) {
  const [problemName, setProblemName] = React.useState("");
  const [problemLevel, setProblemLevel] = useState<Problem["level"]>("low");
  const [actionName, setActionName] = React.useState("");
  const [actionType, setActionType] = useState<Action["type"]>("service");
  const [actionCost, setActionCost] = React.useState(0);

  const addProblem = () => {
    setProblems([...problems, { name: problemName, level: problemLevel }]);
    setProblemName("");
    setProblemLevel("low")
  };

  const addAction = () => {
    setActions([
      ...actions,
      { name: actionName, type: actionType, cost: actionCost },
    ]);
    setActionName("");
    setActionType("service");
    setActionCost(0);
  };
  return (
    <TabView>
      <TabPanel header="Problem">
        <div className="py-4 grid md:flex gap-4 space-y-8 w-full items-center">
          <FloatLabel className="grow">
            <label htmlFor="problemName">Problem Name</label>
            <InputText
              className="w-full"
              id="problemName"
              value={problemName}
              onChange={(e) => setProblemName(e.target.value)}
            />
          </FloatLabel>
          <FloatLabel className="grow *:w-full">
            <label htmlFor="problemLevel">Problem Level</label>
            <Dropdown
              inputId="problemLevel"
              options={["low", "moderate", "high"]}
              className="grow"
              value={problemLevel}
              onChange={(e) => setProblemLevel(e.value)}
            />
          </FloatLabel>
          <Button
            label="Add"
            className="grow"
            disabled={!problemName}
            onClick={addProblem}
          />
        </div>
      </TabPanel>
      <TabPanel header="Action">
        <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-8 py-4 items-center">
          <FloatLabel className=" *:w-full">
            <label htmlFor="actionName">Action Name</label>
            <InputText
              className="w-full"
              id="actionName"
              value={actionName}
              onChange={(e) => setActionName(e.target.value)}
              placeholder="Action Name"
            />
          </FloatLabel>
          <FloatLabel className="grow *:w-full">
            <label htmlFor="actionType">Action Type</label>
            <Dropdown
              inputId="actionType"
              options={["service", "product"]}
              className="grow"
              value={actionType}
              onChange={(e) => setActionType(e.value)}
            />
          </FloatLabel>
          <FloatLabel className="grow *:w-full">
            <label htmlFor="actionCost">Action Cost</label>
            <InputNumber
              className="grow"
              id="actionCost"
              placeholder="Action Cost"
              value={actionCost}
              onChange={(e) => setActionCost(Number(e.value))}
            />
          </FloatLabel>
          <Button
            label="Add"
            disabled={!actionName || !actionType || !actionCost}
            onClick={addAction}
          />
        </div>
      </TabPanel>
    </TabView>
  );
}
