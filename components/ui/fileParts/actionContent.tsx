import { formatCurrency } from "@/utils/transform";

export const ActionContent = ({
  actions,
}: {
  actions: { name: string; type: string; cost: number }[];
}) => {
  return actions.length > 0 && (
    <>
      <div>
        <p className="text-lg font-bold">Tindakan yang diperlukan</p>
        <p className="text-xs">
          Berikut adalah daftar suku cadang dan biaya jasa yang diusulkan untuk
          memperbaiki masalah di atas
        </p>
      </div>
      <table className="border *:border **:border **:p-1">
        <thead>
          <tr className="font-bold">
            <th>Nama</th>
            <th>Jenis</th>
            <th>Biaya</th>
          </tr>
        </thead>
        <tbody>
          {actions.map((action) => (
            <tr key={action.name}>
              <td>{action.name}</td>
              <td>{action.type}</td>
              <td>{formatCurrency(action.cost)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};