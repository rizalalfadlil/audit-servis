import { toURL } from "@/utils/transform";
import {
  FileUpload,
} from "primereact/fileupload";
import { Image } from "primereact/image";
type Props = {
  onFilesChange?: (files: File) => void;
  images?: File[] | string[];
  removeImage: (index: number) => void;
};

export default function ImageUploads({
  onFilesChange,
  images,
  removeImage,
}: Props) {
  return (
    <>
      <FileUpload
        mode="basic"
        auto
        accept="image/*"
        maxFileSize={1000000}
        onSelect={(e) => {
          const files = (e.files as File[]) || [];
          if (!files.length) return;
          const first = files[0];
          // eslint-disable-next-line @typescript-eslint/no-unused-expressions
          if (first instanceof Blob) onFilesChange && onFilesChange(first);
        }}
      />
      <div className="flex gap-4 *:rounded-lg overflow-y-auto">
        {images?.filter(Boolean).map((image, index) => (
          <Image
            src={toURL(image)}
            className="h-40 aspect-square"
            key={index}
            alt="image"
            onClick={() => removeImage(index)}
          />
        ))}
      </div>
    </>
  );
}
