"use client";
import { Button } from "primereact/button";
import { Toolbar } from "primereact/toolbar";
import { BsLaptop } from "react-icons/bs";
import { Divider } from "primereact/divider";
import WelcomeSection from "../components/sections/welcomeSection";
import FormSection from "../components/sections/formSection";
import ExploreSection from "../components/sections/exploreSection";
import { Stepper } from "primereact/stepper";
import { StepperPanel } from "primereact/stepperpanel";

export default function Page() {
  return (
    <div>
      <Toolbar
        className="fixed w-full top-0 z-50"
        end={<Button label="Login" size="small" />}
      />
      <main className="min-h-dvh p-4 sm:p-8 pt-40 sm:pt-40 max-w-7xl mx-auto">
        {/* <WelcomeSection /> */}
        <Stepper>
          <StepperPanel header="Form">
            <FormSection />
          </StepperPanel>
          <StepperPanel header="Explore">
            <ExploreSection />
          </StepperPanel>
          <StepperPanel header="Result">
            Result
          </StepperPanel>
        </Stepper>
      </main>
    </div>
  );
}
