"use client";

import FormStep from "@/components/ui/steps/formStep";
import DiagnosisStep from "@/components/ui/steps/diagnosisStep";
import ResultStep from "@/components/ui/steps/resultStep";
import { Stepper } from "primereact/stepper";
import { StepperPanel } from "primereact/stepperpanel";
import { useRef, useState } from "react";
import {
  Action,
  DiagnosisResult,
  InitialCheck,
  Problem,
} from "@/types/service";
import { SetCheckIn } from "@/types/service-react";
import Crop from "@/components/ui/layouts/crop";

export default function Page() {
  const stepperRef = useRef<Stepper>(null);
  // Initial Check In
  const [customerName, setCustomerName] = useState("");
  const [customerContact, setCustomerContact] = useState<string | number>("");
  const [deviceName, setDeviceName] = useState("");
  const [complaint, setComplaint] = useState("");
  const [problems, setProblems] = useState<Problem[]>([]);
  const [actions, setActions] = useState<Action[]>([]);
  const [images, setImages] = useState<File[]>([]);
  const [status, setStatus] = useState("");
  const totalCost = actions.reduce((acc, action) => acc + action.cost, 0);

  const getCheckIn: InitialCheck = {
    customerName,
    customerContact,
    deviceName,
    complaint,
  };
  const getDiagnosisResult: DiagnosisResult = {
    problems,
    actions,
    images,
    status,
    totalCost,
  };
  const setCheckIn: SetCheckIn = {
    setCustomerName,
    setCustomerContact,
    setDeviceName,
    setComplaint,
  };
  const setDiagnosisResult = {
    addProblem: (problem: Problem) => {
      setProblems((prev) => [...prev, problem]);
    },
    addAction: (action: Action) => {
      setActions((prev) => [...prev, action]);
    },
    addImage: (image: File) => {
      setImages((prev) => [...prev, image]);
    },
    removeProblem: (index: number) => {
      setProblems((prev) => prev.filter((_, i) => i !== index));
    },
    removeAction: (index: number) => {
      setActions((prev) => prev.filter((_, i) => i !== index));
    },
    removeImage: (index: number) => {
      setImages((prev) => prev.filter((_, i) => i !== index));
    },
    setStatus: (status: string) => {
      setStatus(status);
    },
  };

  const navigate = {
    next: () => stepperRef.current?.nextCallback(),
    prev: () => stepperRef.current?.prevCallback(),
  };

  return (
    <Crop>
      <Stepper ref={stepperRef}>
        <StepperPanel header="Form">
          <FormStep
            getCheckIn={getCheckIn}
            setCheckIn={setCheckIn}
            next={navigate.next}
          />
        </StepperPanel>
        <StepperPanel header="Diagnosis">
          <DiagnosisStep
            status={status}
            setStatus={setStatus}
            diagnosisResult={getDiagnosisResult}
            initialCheck={getCheckIn}
            setDiagnosisResult={setDiagnosisResult}
            navigate={navigate}
          />
        </StepperPanel>
        <StepperPanel header="Result">
          <ResultStep
            diagnosisResult={getDiagnosisResult}
            initialCheck={getCheckIn}
            prev={navigate.prev}
          />
        </StepperPanel>
      </Stepper>
    </Crop>
  );
}
