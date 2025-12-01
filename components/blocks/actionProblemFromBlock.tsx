import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { FloatLabel } from "primereact/floatlabel";
import { InputNumber } from "primereact/inputnumber";
import { InputText } from "primereact/inputtext";
import { TabPanel, TabView } from "primereact/tabview";
import React from "react";

export default function ActionProblemFromBlock({
  problems,
  setProblems,
  actions,
  setActions,
}: {
  problems: string[];
  actions: {
    name: string;
    type: string;
    cost: number;
  }[];
  setProblems: (problems: string[]) => void;
  setActions: (
    actions: {
      name: string;
      type: string;
      cost: number;
    }[]
  ) => void;
}) {
  const [problemName, setProblemName] = React.useState("");
  const [actionName, setActionName] = React.useState("");
  const [actionType, setActionType] = React.useState("");
  const [actionCost, setActionCost] = React.useState(0);

  const addProblem = () => {
    setProblems([...problems, problemName]);
    setProblemName("");
  };

  const addAction = () => {
    setActions([
      ...actions,
      { name: actionName, type: actionType, cost: actionCost },
    ]);
    setActionName("");
    setActionType("");
    setActionCost(0);
  };
  return (
    <TabView>
      <TabPanel header="Problem">
        <div className="flex gap-4 py-4 items-center">
          <FloatLabel className="grow *:w-full">
            <label htmlFor="problemName">Problem Name</label>
            <InputText
              className="grow"
              id="problemName"
              placeholder="Problem Name"
              value={problemName}
              onChange={(e) => setProblemName(e.target.value)}
            />
          </FloatLabel>
          <Button label="Add" disabled={!problemName} onClick={addProblem} />
        </div>
      </TabPanel>
      <TabPanel header="Action">
        <div className="flex gap-4 py-4 items-center">
          <FloatLabel className="grow *:w-full">
            <label htmlFor="actionName">Action Name</label>
            <InputText
              className="grow"
              id="actionName"
              value={actionName}
              onChange={(e) => setActionName(e.target.value)}
              placeholder="Action Name"
            />
          </FloatLabel>
          <FloatLabel className="grow *:w-full">
            <Dropdown
              inputId="actionType"
              options={[
                { name: "Service", value: "service" },
                { name: "Product", value: "product" },
              ]}
              optionLabel="name"
              optionValue="value"
              className="w-full"
              value={actionType}
              onChange={(e) => setActionType(e.value)}
            />
            <label htmlFor="actionType">Select Type</label>
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
