"use client";
import { Divider } from "primereact/divider";
import { Toolbar } from "primereact/toolbar";
import { BsLaptop } from "react-icons/bs";
import { useState } from "react";
import { Button } from "primereact/button";
import ProblemBlock from "../blocks/problemBlock";
import ActionBlock from "../blocks/actionBlock";
import ActionProblemForm from "../forms/actionProblemForm";
import ImageUploads from "../blocks/imageUploads";
import { Problem } from "@/types/service";

export default function ExploreSection() {
  const [problems, setProblems] = useState<Problem[]>([
    {
      name: "Problem 1",
      level: "low",
    },
    {
      name: "Problem 2",
      level: "moderate",
    },
    {
      name: "Problem 3",
      level: "critical",
    },
  ]);

  const [actions, setActions] = useState([
    {
      name: "Action 1",
      type: "service",
      cost: 100000,
    },
    {
      name: "Action 2",
      type: "product",
      cost: 200000,
    },
    {
      name: "Action 3",
      type: "service",
      cost: 300000,
    },
  ]);

  return (
    <section className="space-y-8">
      <p className="text-2xl font-bold">Step 2</p>
      <Divider />
      <Toolbar
        start={
          <>
            <BsLaptop size={48} />
            <div className="px-4">
              <p>Device Information</p>
              <p className="text-xs text-gray-500">Device Information</p>
            </div>
          </>
        }
      />
      <p className="text-lg font-bold">Add New</p>
      <ActionProblemForm
        problems={problems}
        actions={actions}
        setProblems={setProblems}
        setActions={setActions}
      />
      <div className="grid lg:grid-cols-2 gap-8">
        <ProblemBlock problems={problems} setProblems={setProblems} />
        <ActionBlock actions={actions} setActions={setActions} />
      </div>
      <p className="text-lg font-bold">Upload Images</p>
      <ImageUploads />
      <p className="text-lg font-bold">Summary</p>
      <Toolbar
        start={<Button label="Back" severity="secondary" />}
        end={
          <div className="gap-8 flex items-center">
            <div>
              <p className="text-xs text-gray-500">Total Cost</p>
              <p>{actions.reduce((total, action) => total + action.cost, 0)}</p>
            </div>
            <Button label="Finish" />
          </div>
        }
      />
    </section>
  );
}
