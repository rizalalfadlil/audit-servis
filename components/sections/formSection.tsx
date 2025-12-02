import { Divider } from "primereact/divider";
import { BsLaptop } from "react-icons/bs";
import { FloatLabel } from "primereact/floatlabel";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Button } from "primereact/button";

const FormSection = () => {
  return (
    <section>
      <p className="text-2xl font-bold">Step 1</p>
      <Divider />
      <div className="grid sm:grid-cols-3 gap-8 py-8">
        <div className="flex justify-center items-center bg-gray-50 border border-gray-200 rounded-lg">
          <BsLaptop className="text-4xl" size={100} />
        </div>
        <div className="space-y-8 sm:col-span-2">
          <div className="grid gap-8 **:w-full py-4">
            <p className="text-xl font-bold">User Information</p>
            <FloatLabel>
              <InputText id="name" />
              <label htmlFor="name">Name</label>
            </FloatLabel>
            <FloatLabel>
              <InputText id="contact" />
              <label htmlFor="contact">Contact</label>
            </FloatLabel>
            <p className="text-xl font-bold">Device Information</p>
            <FloatLabel>
              <InputText id="device_name" />
              <label htmlFor="device_name">Device Name</label>
            </FloatLabel>
            <FloatLabel>
              <InputTextarea id="problem" />
              <label htmlFor="problem">Problem</label>
            </FloatLabel>
          </div>
          <Button label="Submit" className="w-full sm:w-fit" />
        </div>
      </div>
    </section>
  );
};

export default FormSection;
