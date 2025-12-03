import { ServiceReport } from "@/types/service";
import { toBlob } from "@/utils/transform";
import { getCloudinaryConfig } from "../cloudinary";

export const createServiceReport = (serviceReport: ServiceReport) => {
  // eslint-disable-next-line no-console
  console.log(serviceReport);
};

export async function uploadImageToCloudinary(
  file: File | Blob | string
): Promise<string> {
  const { cloudName, uploadPreset } = getCloudinaryConfig();
  if (!cloudName || !uploadPreset)
    throw new Error("Cloudinary is not configured");
  const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;
  const form = new FormData();
  const blob = await toBlob(file);
  form.append("file", blob);
  form.append("upload_preset", uploadPreset);
  const res = await fetch(url, { method: "POST", body: form });
  if (!res.ok) throw new Error(`Cloudinary upload failed: ${res.status}`);
  const json = (await res.json()) as { secure_url?: string; url?: string };
  const out = json.secure_url || json.url;
  if (!out) throw new Error("Missing URL from Cloudinary response");
  return out;
}
