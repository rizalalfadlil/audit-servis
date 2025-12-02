"use client";

import FormSection from "@/components/sections/formSection";
import ExploreSection from "@/components/sections/exploreSection";
import ResultSection from "@/components/sections/resultSection";
import { Stepper } from "primereact/stepper";
import { StepperPanel } from "primereact/stepperpanel";

export default function Page() {
  
  return (
    <div>
      <Stepper>
        <StepperPanel header="Form">
          <FormSection />
        </StepperPanel>
        <StepperPanel header="Explore">
          <ExploreSection />
        </StepperPanel>
        <StepperPanel header="Result">
          <ResultSection />
        </StepperPanel>
      </Stepper>
    </div>
  );
}
