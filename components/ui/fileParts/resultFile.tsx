import { getCurrentUser } from "@/backend/controller/auth";
import { firebase } from "@/backend/config/firebase";
import { DiagnosisResult, InitialCheck } from "@/types/service";
import { onAuthStateChanged } from "firebase/auth";
import { RefObject, useEffect, useState } from "react";
import { Header } from "./headerContent";
import { ActionContent } from "./actionContent";
import { CustomerInfo } from "./customerInfoContent";
import { ImageContent } from "./imageContent";
import { ProblemContent } from "./problemContent";
import { Footer } from "./footerContent";
import { getPageData } from "@/components/logic/pageSplit";
import { toURL } from "@/utils/transform";

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

  const maxData = 8;
  const totalPages =
    Math.ceil((problems.length + actions.length + images.length) / maxData) +
      (images.length > 0 && problems.length + actions.length > 1 ? 1 : 0) || 1;
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
    <div ref={targetRef} className=" w-[20cm]">
      {Array.from({ length: totalPages }).map((_, index) => {
        const { problemsData, actionsData } = getPageData(
          index,
          problems,
          actions,
          maxData
        );

        return (
          <div
            key={index}
            className="space-y-8 w-full p-[2cm] h-[29cm] text-sm bg-white"
          >
            {businessName ? (
              <Header
                businessName={businessName}
                logoUrl={logoUrl}
                address={address}
              />
            ) : (
              <Header
                businessName={"Audit Servis"}
                logoUrl={toURL("/search.svg")}
                address={window.location.href}
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
              <div className="space-y-8 mt-20 block">
                {images.length > 0 && <ImageContent images={images} />}
                <Footer status={status} totalCost={totalCost} />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
