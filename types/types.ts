export interface deviceProps {
  name: string;
  complaint: string;
  problems: string[];
  actions: { name: string; type: "service" | "product"; cost: number }[];
  status: string;
}
