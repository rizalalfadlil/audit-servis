import { Action, Problem } from "./service";

export type SetCheckIn = {
  setCustomerName: (name: string) => void;
  setCustomerContact: (contact: string | number) => void;
  setDeviceName: (name: string) => void;
  setComplaint: (complaint: string) => void;
};
export type SetDiagnosisResult = {
  addProblem: (problem: Problem) => void;
  addAction: (action: Action) => void;
  addImage: (image: File) => void;
  removeProblem: (index: number) => void;
  removeAction: (index: number) => void;
  removeImage: (index: number) => void;
  setStatus: (status: string) => void;
};
