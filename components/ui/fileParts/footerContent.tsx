import { formatCurrency } from "@/utils/transform";

export const Footer = ({
  status,
  totalCost,
}: {
  status: string;
  totalCost: number;
}) => {
  return (
    <div className="grid grid-cols-2">
      <div>
        <p className="text-lg font-bold">Status</p>
        <p>{status}</p>
      </div>
      <div>
        <p className="text-lg font-bold">Perkiraan biaya</p>
        <p>{formatCurrency(totalCost)}</p>
      </div>
    </div>
  );
};
