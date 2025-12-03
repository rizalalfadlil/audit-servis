export interface ServiceReport {
  initialCheck: InitialCheck,
  diagnosisResult: DiagnosisResult
};
export type InitialCheck = {
  customerName: string;
  customerContact: string | number;
  deviceName: string;
  complaint: string;
};
export type DiagnosisResult = {
  problems: Problem[];
  actions: Action[];
  images: string[];
};
export type Problem = {
  name: string;
  level: "low" | "moderate" | "critical";
};
export type Action = {
  name: string;
  type: "service" | "product";
  cost: number;
};
