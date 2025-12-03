export const toURL = (file: File | string) => {
  if (typeof file === "string") return file;
  if (file instanceof Blob) return URL.createObjectURL(file);
  return "";
};

export const toBlob = async (input: File | Blob | string): Promise<Blob> => {
  if (input instanceof Blob) return input;
  if (typeof input === "string") {
    if (input.startsWith("data:")) {
      const res = await fetch(input);
      return await res.blob();
    }
    return new Blob([input]);
  }
  return new Blob();
};
