import { getCurrentUser } from "@/backend/controller/auth";
import { firebase } from "@/backend/firebase";
import { DiagnosisResult, InitialCheck } from "@/types/service";
import { onAuthStateChanged } from "firebase/auth";
import { RefObject, useEffect, useState } from "react";
import { Header } from "../fileParts/headerContent";
import { ActionContent } from "../fileParts/actionContent";
import { CustomerInfo } from "../fileParts/customerInfoContent";
import { ImageContent } from "../fileParts/imageContent";
import { ProblemContent } from "../fileParts/problemContent";
import { Footer } from "../fileParts/footerContent";
import { getPageData } from "@/components/logic/pageSplit";

export default function ResultFile({
  diagnosisResult,
  initialCheck,
  targetRef,
}: {
  diagnosisResult: DiagnosisResult;
  initialCheck: InitialCheck;
  targetRef: RefObject<HTMLDivElement>;
}) {
  const { problems, actions, images, status } = diagnosisResult;
  const { customerName, customerContact, deviceName, complaint } = initialCheck;
  const [businessName, setBusinessName] = useState<string>("");
  const [logoUrl, setLogoUrl] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const totalCost = actions.reduce((total, action) => total + action.cost, 0);

  const maxData = 6;
  const totalPages = Math.ceil(
    (problems.length + actions.length + images.length) / maxData
  ) || 1;
  useEffect(() => {
    const unsub = onAuthStateChanged(firebase.auth, async (fbUser) => {
      if (fbUser) {
        try {
          const res = await getCurrentUser();
          setBusinessName(res.businessName);
          setLogoUrl(res.logoUrl);
          setAddress(res.address);
        } catch (e) {
          console.error(e);
        }
      }
    });
    return () => unsub();
  }, []);


  return (
    <div ref={targetRef} className=" w-fit">
      {Array.from({ length: totalPages}).map((_, index) => {
        const { problemsData, actionsData } = getPageData(index, problems, actions, maxData);

        return (
          <div
            key={index}
            className="space-y-8 w-[21cm] p-[2cm] h-[29.7cm] text-sm bg-white"
          >
            {businessName && (
              <Header
                businessName={businessName}
                logoUrl={logoUrl}
                address={address}
              />
            )}
            {index === 0 && (
              <>
                <CustomerInfo
                  customerName={customerName}
                  customerContact={customerContact}
                  deviceName={deviceName}
                  complaint={complaint}
                />
              </>
            )}
            <ProblemContent problems={problemsData} />
            <ActionContent actions={actionsData} />
            {index === totalPages - 1 && (
              <div className="space-y-8 block">
                <ImageContent images={images} />
                <Footer status={status} totalCost={totalCost} />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}







