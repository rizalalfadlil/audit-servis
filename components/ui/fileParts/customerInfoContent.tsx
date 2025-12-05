export const CustomerInfo = ({
  customerName,
  customerContact,
  deviceName,
  complaint,
}: {
  customerName: string;
  customerContact: string | number;
  deviceName: string;
  complaint: string;
}) => (
  <table className="w-fit">
    <tbody className="**:p-2">
      <tr>
        <td>Nama pelanggan</td>
        <td>: {customerName}</td>
      </tr>
      <tr>
        <td>Kontak pelanggan</td>
        <td>: {customerContact}</td>
      </tr>
      <tr>
        <td>Nama Perangkat</td>
        <td>: {deviceName}</td>
      </tr>
      <tr>
        <td>Keluhan</td>
        <td>: {complaint}</td>
      </tr>
    </tbody>
  </table>
);
