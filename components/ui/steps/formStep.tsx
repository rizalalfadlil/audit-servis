import { Divider } from "primereact/divider";
import { FloatLabel } from "primereact/floatlabel";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Button } from "primereact/button";
import { InitialCheck } from "@/types/service";
import { SetCheckIn } from "@/types/service-react";

const FormStep = ({
  getCheckIn,
  setCheckIn,
  next,
}: {
  getCheckIn: InitialCheck;
  setCheckIn: SetCheckIn;
  next: () => void;
}) => {
  const { customerName, customerContact, deviceName, complaint } = getCheckIn;
  const { setCustomerName, setCustomerContact, setDeviceName, setComplaint } =
    setCheckIn;
  return (
    <section>
      <div>
        <p className="text-2xl font-bold">Formulir Pemeriksaan</p>
        <p>
          Masukkan informasi pelanggan, perangkat yang akan di diagnosis, dan
          keluhan yang dialami.
        </p>
      </div>
      <Divider />
      <div className="grid sm:grid-cols-3 gap-8 py-2  sm:py-8">
        <div className="hidded sm:grid p-12 hidden">
          <div
            className=" bg-contain bg-center bg-no-repeat"
            style={{ backgroundImage: "url(/graphics/phone.svg)" }}
          ></div>
        </div>
        <div className="space-y-8 sm:col-span-2">
          <div className="grid gap-8 **:w-full py-4">
            <p className="text-xl font-bold">Informasi Pelanggan</p>
            <FloatLabel>
              <InputText
                id="name"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
              />
              <label htmlFor="name">nama</label>
            </FloatLabel>
            <FloatLabel>
              <InputText
                id="contact"
                value={String(customerContact)}
                onChange={(e) => setCustomerContact(e.target.value)}
              />
              <label htmlFor="contact">kontak</label>
            </FloatLabel>
            <p className="text-xl font-bold">Informasi Perangkat</p>
            <FloatLabel>
              <InputText
                id="device_name"
                value={deviceName}
                onChange={(e) => setDeviceName(e.target.value)}
              />
              <label htmlFor="device_name">Nama Perangkat</label>
            </FloatLabel>
            <FloatLabel>
              <InputTextarea
                id="complaint"
                value={complaint}
                onChange={(e) => setComplaint(e.target.value)}
              />
              <label htmlFor="complaint">Keluhan</label>
            </FloatLabel>
          </div>
          <Button
            label="Selanjutnya"
            icon="pi pi-arrow-right"
            iconPos="right"
            className="w-full sm:w-fit"
            onClick={next}
          />
        </div>
      </div>
    </section>
  );
};

export default FormStep;
