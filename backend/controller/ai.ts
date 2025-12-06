import { Action, Problem } from "@/types/service";
import { prompt } from "@/utils/prompt";

const buildPrompt = async ({
  trigger,
  change,
  deviceName,
  complaint,
}: {
  trigger: "keluhan" | "masalah" | "tindakan_barang" | "tindakan_jasa";
  change?: Problem | Action | string;
  deviceName?: string;
  complaint?: string;
}) => {
  const systemInstruction = prompt.systemInstruction;

  const problem = change as Problem;
  const action = change as Action;

  const contentsMap = {
    ["keluhan"]: prompt.trigger_data.keluhan(deviceName!, complaint!),
    ["masalah"]: prompt.trigger_data.masalah(deviceName!, problem.name!),
    ["tindakan_barang"]: prompt.trigger_data.tindakan_barang(
      deviceName!,
      action.name!
    ),
    ["tindakan_jasa"]: prompt.trigger_data.tindakan_jasa(
      deviceName!,
      action.name!
    ),
  };

  return {
    systemInstruction,
    prompt: contentsMap[trigger],
  };
};
export const getAiSuggestions = async ({
  trigger,
  change,
  deviceName,
  complaint,
}: {
  trigger: "keluhan" | "masalah" | "tindakan_barang" | "tindakan_jasa";
  change?: Problem | Action | string;
  deviceName?: string;
  complaint?: string;
}) => {
  const promptStructure = await buildPrompt({
    trigger,
    change,
    deviceName,
    complaint,
  });

  const response = await GetResponse(promptStructure.prompt);
  console.log(response);
  return response;
};

async function GetResponse(content: string) {
  const response = await fetch("/api/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      messages: [{ role: "user", content }],
    }),
  });
  const data = await response.json();
  return data;
}
