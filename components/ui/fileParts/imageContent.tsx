import { toURL } from "@/utils/transform";

export const ImageContent = ({ images }: { images: string[] | File[] }) => {
  return images.length > 0 && (
    <div>
      <div>
        <p className="text-lg font-bold">Images</p>
        <p className="text-xs">berikut ini adalah gambar kondisi perangkat</p>
      </div>
      <div className="flex flex-wrap gap-4">
        {images.map((image, index) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={toURL(image)}
            className="h-40 aspect-square my-8"
            key={index}
            alt="image"
          />
        ))}
      </div>
    </div>
  );
};