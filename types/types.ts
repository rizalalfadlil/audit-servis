export interface deviceProps {
  name: string;
  complaint: string;
  problems: string[];
  actions: { name: string; type: "service" | "product"; cost: number }[];
  status: string;
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