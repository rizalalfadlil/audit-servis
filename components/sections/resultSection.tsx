import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Toolbar } from "primereact/toolbar";
import { DiagnosisResult, InitialCheck } from "@/types/service";
import { toURL } from "@/utils/transform";
import { usePDF } from "react-to-pdf";
import { Image } from "primereact/image";

export default function ResultSection({
  diagnosisResult,
  initialCheck,
  prev,
}: {
  diagnosisResult: DiagnosisResult;
  initialCheck: InitialCheck;
  prev: () => void;
}) {
  const { problems, actions, images } = diagnosisResult;
  const { customerName, customerContact, deviceName, complaint } = initialCheck;

  
  const { toPDF, targetRef } = usePDF({ filename: "page.pdf" });

  return (
    <>
      <div className="overflow-x-auto bg-gray-50 p-4 my-8">
  
      </div>
      <Toolbar
        start={<Button label="Back" severity="secondary" onClick={prev} />}
        end={<Button label="Share" onClick={() => toPDF()} />}
      />
    </>
  );
}
