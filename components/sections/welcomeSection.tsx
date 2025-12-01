import { Button } from "primereact/button";
const WelcomeSection = () => {
  return (
    <section className="h-dvh flex flex-col justify-center items-center">
      <div className="flex flex-col gap-2 text-center justify-center items-center">
        <p className="text-4xl font-bold">
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </p>
        <p className="text-lg">
          Lorem ipsum dolor sit amet consectetur adipisicing elit Lorem ipsum
          dolor sit.
        </p>
        <div className="flex gap-2 mt-4">
          <Button label="Get Started" />
          <Button label="Docs" className="p-button-outlined" />
        </div>
      </div>
    </section>
  );
};

export default WelcomeSection;