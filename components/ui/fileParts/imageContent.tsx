import { toURL } from "@/utils/transform";
import { Image } from "primereact/image";

export const ImageContent = ({ images }: { images: string[] | File[] }) => {
  return (
    images.length > 0 && (
      <div>
        <div>
          <p className="text-lg font-bold">Gambar Bukti</p>
          <p className="text-xs">berikut ini adalah gambar kondisi perangkat</p>
        </div>
        <div className="flex flex-wrap gap-4">
          {images.map((image, index) => (
            <Image
              src={toURL(image)}
              className="h-20 aspect-square my-8"
              key={index}
              alt="image"
            />
          ))}
        </div>
      </div>
    )
  );
};
