type CloudinaryConfig = {
  cloudName: string;
  uploadPreset: string;
};

export const getCloudinaryConfig = (): CloudinaryConfig => {
  const cloudName =
    process.env.CLOUDINARY_CLOUD_NAME ||
    process.env.CLOUDINARY_CLOUD_NAME ||
    "";
  const uploadPreset =
    process.env.CLOUDINARY_UPLOAD_PRESET ||
    process.env.CLOUDINARY_UPLOAD_PRESET ||
    "";
  return { cloudName, uploadPreset };
};
