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

export const translateFirebaseMessage = (message: string): string => {
  const messageMap: Record<string, string> = {
    ["auth/email-already-in-use"]: "Email sudah terdaftar",
    ["auth/invalid-email"]: "Format email salah",
    ["auth/operation-not-allowed"]: "Tidak diizinkan",
    ["auth/weak-password"]: "Password sangat lemah",
    ["auth/user-not-found"]: "User tidak ditemukan",
    ["auth/wrong-password"]: "Password salah",
    ["auth/invalid-credential"]: "Password tidak sesuai",
  };
  return messageMap[message] ?? message;
};

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(amount);
};