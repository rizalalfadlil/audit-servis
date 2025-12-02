"use client";
import { Button } from "primereact/button";
import { Toolbar } from "primereact/toolbar";
import { BsLaptop } from "react-icons/bs";
import { Divider } from "primereact/divider";
import WelcomeSection from "../components/sections/welcomeSection";
import FormSection from "../components/sections/formSection";
import ExploreSection from "../components/sections/exploreSection";
import ResultSection from "../components/sections/resultSection"
import { Stepper } from "primereact/stepper";
import { StepperPanel } from "primereact/stepperpanel";
import Header from "../components/blocks/header"
export default function Page() {
  return (
    <div>
      <WelcomeSection/>
    </div>
  );
}
