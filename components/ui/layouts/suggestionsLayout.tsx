"use client";
import { Action, Problem, ServiceReport } from "@/types/service";
import {
  useCallback,
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { Dialog } from "primereact/dialog";
import { BsStars } from "react-icons/bs";
import { MarkdownRenderer } from "../markdown/MarkdownRenderer";
import { LuLoaderCircle } from "react-icons/lu";
import { getAiSuggestions } from "@/backend/controller/ai";

type SuggestionsContextType = {
  showSuggestions: (
    data: ServiceReport,
    changes: Problem | Action | string
  ) => void;
};

const SuggestionsContext = createContext<SuggestionsContextType | null>(null);

export function SuggestionsProvider({ children }: { children: ReactNode }) {
  const [visible, setVisible] = useState(false);
  const [res, setRes] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [suggestionData, setSuggestionData] = useState<{
    data: ServiceReport;
    changes: Problem | Action | string;
  } | null>(null);

  const type = suggestionData && changeType(suggestionData.changes);
  const device = suggestionData && suggestionData.data.initialCheck.deviceName;
  const action = suggestionData?.changes as Action;
  const trigger =
    type === "string"
      ? "keluhan"
      : type === "action"
      ? action.type === "jasa"
        ? "tindakan_jasa"
        : "tindakan_barang"
      : "masalah";

  const showSuggestions = useCallback(
    (data: ServiceReport, changes: Problem | Action | string) => {
      setSuggestionData({ data, changes });
      setVisible(true);
    },
    []
  );
  useEffect(() => {
    if (!suggestionData || !device) return;

    (async () => {
      try {
        setLoading(true);
        const result = await getAiSuggestions({
          trigger,
          change: suggestionData.changes,
          deviceName: device,
          complaint: suggestionData.data.initialCheck.complaint,
        });
        setRes(result);
      } catch (error) {
        console.error("Error building prompt:", error);
      } finally {
        setLoading(false)
      }
    })();
  }, [suggestionData, device, trigger]);

  const hideDialog = useCallback(() => {
    setVisible(false);
    setSuggestionData(null);
  }, []);

  return (
    <SuggestionsContext.Provider value={{ showSuggestions }}>
      {children}
      <Dialog
        position="bottom-right"
        modal={false}
        visible={visible}
        onHide={hideDialog}
        header={
          <div className="flex items-center gap-2">
            <BsStars size={20} />
            <span>Saran AI</span>
          </div>
        }
        style={{ width: "25vw", height: "25vh" }}
        breakpoints={{ "960px": "75vw", "641px": "90vw" }}
      >
        {loading ? (
          <div className="p-4">
            <LuLoaderCircle size={20} className="animate-spin inline me-2" /> <span>memuat saran...</span>
          </div>
        ) : suggestionData && (
          <div className="p-4">
            <MarkdownRenderer content={res || ""} />
          </div>
        )}
      </Dialog>
    </SuggestionsContext.Provider>
  );
}
function changeType(changes: Problem | Action | string) {
  if (typeof changes === "string") {
    return "string";
  } else if ((changes as Action).type) {
    return "action";
  } else {
    return "problem";
  }
}
export const useSuggestions = (): SuggestionsContextType => {
  const context = useContext(SuggestionsContext);
  if (!context) {
    throw new Error("useSuggestions must be used within a SuggestionsProvider");
  }
  return context;
};
