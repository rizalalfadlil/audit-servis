import { toBlob } from "@/utils/transform";
import { getCloudinaryConfig } from "../config/cloudinary";

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

export async function replaceImageToCloudinary(
  publicId: string,
  file: File | Blob | string
): Promise<string> {
  const { cloudName, uploadPreset } = getCloudinaryConfig();
  if (!cloudName || !uploadPreset)
    throw new Error("Cloudinary is not configured");
  const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;
  const form = new FormData();
  form.append("public_id", publicId);
  form.append("overwrite", "true");
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

export async function deleteImageFromCloudinary(publicId: string) {
  const { cloudName } = getCloudinaryConfig();
  if (!cloudName) throw new Error("Cloudinary is not configured");
  const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/destroy`;
  const form = new FormData();
  form.append("public_id", publicId);
  const res = await fetch(url, { method: "POST", body: form });
  if (!res.ok) throw new Error(`Cloudinary delete failed: ${res.status}`);
}
