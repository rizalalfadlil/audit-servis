"use client";
import { Divider } from "primereact/divider";
import { Toolbar } from "primereact/toolbar";
import { BsLaptop } from "react-icons/bs";
import { Button } from "primereact/button";
import ProblemBlock from "./blocks/problemBlock";
import ActionBlock from "./blocks/actionBlock";
import ActionProblemForm from "./forms/actionProblemForm";
import ImageUploads from "./blocks/imageUploads";
import { DiagnosisResult, InitialCheck } from "@/types/service";
import { SetDiagnosisResult } from "@/types/service-react";

export default function ExploreSection({
  diagnosisResult,
  initialCheck,
  setDiagnosisResult,
  navigate
}: {
  diagnosisResult: DiagnosisResult;
  initialCheck: InitialCheck;
  setDiagnosisResult: SetDiagnosisResult;
  navigate: {
    prev: () => void;
    next: () => void;
  };
}) {
  const { problems, actions, images } = diagnosisResult;
  const { deviceName, complaint } = initialCheck;
  const {
    addProblem,
    addAction,
    addImage,
    removeProblem,
    removeAction,
    removeImage,
  } = setDiagnosisResult;
  return (
    <section className="space-y-8">
      <p className="text-2xl font-bold">Step 2</p>
      <Divider />
      <Toolbar
        start={
          <>
            <BsLaptop size={48} />
            <div className="px-4">
              <p>{deviceName || "Device Name"}</p>
              <p className="text-xs text-gray-500">
                {complaint || "complaint"}
              </p>
            </div>
          </>
        }
      />
      <p className="text-lg font-bold">Add New</p>
      <ActionProblemForm addProblem={addProblem} addAction={addAction} />
      <div className="grid lg:grid-cols-2 gap-8">
        <ProblemBlock problems={problems} removeProblem={removeProblem} />
        <ActionBlock actions={actions} removeAction={removeAction} />
      </div>
      <p className="text-lg font-bold">Upload Images</p>
      <ImageUploads onFilesChange={addImage} removeImage={removeImage} images={images} />
      <p className="text-lg font-bold">Summary</p>
      <Toolbar
        start={<Button label="Back" severity="secondary" onClick={navigate.prev} />}
        end={
          <div className="gap-8 flex items-center">
            <div>
              <p className="text-xs text-gray-500">Total Cost</p>
              <p>{actions.reduce((total, action) => total + action.cost, 0)}</p>
            </div>
            <Button label="Finish" onClick={navigate.next} />
          </div>
        }
      />
    </section>
  );
}
