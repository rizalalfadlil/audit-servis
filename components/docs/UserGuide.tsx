import React from "react";
import UserGuideHeader from "./UserGuideHeader";
import TableOfContents from "./TableOfContents";
import AboutSection from "./AboutSection";
import GettingStartedSection from "./GettingStartedSection";
import ServiceRecordingSection from "./ServiceRecordingSection";
import AdditionalFeaturesSection from "./AdditionalFeaturesSection";

interface UserGuideProps {
  className?: string;
}

export default function UserGuide({ className = "" }: UserGuideProps) {
  return (
    <div className={`max-w-7xl mx-auto space-y-8 ${className}`}>
      <UserGuideHeader />
      <TableOfContents />
      <hr className="border-gray-300" />
      <AboutSection />
      <hr className="border-gray-300" />
      <GettingStartedSection />
      <hr className="border-gray-300" />
      <ServiceRecordingSection />
      <hr className="border-gray-300" />
      <AdditionalFeaturesSection />
    </div>
  );
}
