"use client";

import FormSection from "@/components/sections/formSection";
import ExploreSection from "@/components/sections/exploreSection";
import ResultSection from "@/components/sections/resultSection";
import { Stepper } from "primereact/stepper";
import { StepperPanel } from "primereact/stepperpanel";
import { useState } from "react";
import { Action, DiagnosisResult, InitialCheck, Problem } from "@/types/service";
import { SetCheckIn } from "@/types/service-react";

export default function Page() {

  // Initial Check In
  const [customerName, setCustomerName] = useState("")
  const [customerContact, setCustomerContact] = useState<string | number>("")
  const [deviceName, setDeviceName] = useState("")
  const [complaint, setComplaint] = useState("")
  const getCheckIn: InitialCheck = {
    customerName,
    customerContact,
    deviceName,
    complaint
  }
  const setCheckIn:SetCheckIn = {
    setCustomerName,
    setCustomerContact,
    setDeviceName,
    setComplaint
  }

  // Diagnosis Result
  const [problems, setProblems] = useState<Problem[]>([
    {
      name: "Dirty Port",
      level: "low"
    },
    {
      name: "Broken Screen",
      level: "moderate"
    }, {
      name: "Battery Dead",
      level: "critical"
    }
  ])
  const [actions, setActions] = useState<Action[]>([
    {
      name: "Clean Port",
      type: "service",
      cost: 100
    }, {
      name: "New Screen",
      type: "product",
      cost: 100000
    }, {
      name: "New Battery",
      type: "product",
      cost: 300000
    },
    {
      name: "Replace Components",
      type: "service",
      cost: 200
    }
  ])
  const [images, setImages] = useState<string[]>([
    "https://picsum.photos/200/300",
    "https://picsum.photos/200",
    "https://picsum.photos/200/300",])
  const getDiagnosisResult: DiagnosisResult = {
    problems,
    actions,
    images
  }
  const setDiagnosisResult = (data?: DiagnosisResult) => {
    setProblems(data?.problems || problems)
    setActions(data?.actions || actions)
    setImages(data?.images || images)
  }

  return (
    <div>
      <Stepper>
        <StepperPanel header="Form">
          <FormSection getCheckIn={getCheckIn} setCheckIn={setCheckIn}/>
        </StepperPanel>
        <StepperPanel header="Explore">
          <ExploreSection diagnosisResult={getDiagnosisResult} initialCheck={getCheckIn} />
        </StepperPanel>
        <StepperPanel header="Result">
          <ResultSection diagnosisResult={getDiagnosisResult} initialCheck={getCheckIn} />
        </StepperPanel>
      </Stepper>
    </div>
  );
}
