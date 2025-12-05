import { Image } from "primereact/image";

export const Header = ({
  businessName,
  logoUrl,
  address,
}: {
  businessName: string;
  logoUrl: string;
  address: string;
}) => {
  return (
    <div className="flex items-center gap-4 border-b-2 pb-4 px-4">
      <Image
        src={logoUrl}
        alt="logo"
        className="h-16 aspect-square object-contain"
      />
      <div>
        <p className="text-lg font-bold">{businessName}</p>
        <p className="text-xs">{address}</p>
      </div>
    </div>
  );
};
