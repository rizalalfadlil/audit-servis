export interface ServiceReport {
  initialCheck: {
    customerName: string;
    customerContact: string | number;
    name: string;
    complaint: string;
  };
  diagnosisResult: {
    problems: Problem[];
    actions: Action[];
  };
}
export type Problem = {
  name: string;
  level: "low" | "moderate" | "critical";
};
export type Action = {
  name: string;
  type: "service" | "product";
  cost: number;
};
