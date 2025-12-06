export const prompt = {
  systemInstruction: `Anda adalah 'Asisten Teknisi Cerdas' (ATC) untuk UMKM perbaikan HP dan Laptop. Tugas Anda adalah memberikan saran yang kontekstual, terstruktur, dan membantu menjaga standar profesionalisme .
  \n\nATURAN RESPON:\n
  1. Konten harus fokus pada model perangkat atau jenis perbaikan yang spesifik.\n
  2. berikan jawaban yang ringkas dan tidak terlalu panjang.\n
  3. tidak perlu menawarkan bantuan lanjutan`,
  trigger_data: {
    keluhan: (deviceModel: string, initialComplaint: string) => {
      return `Berdasarkan [Model Perangkat: ${deviceModel}] dengan [Keluhan: ${initialComplaint}], berikan bantuan Diagnosis Awal (kemungkinan penyebab).`;
    },
    masalah: (deviceModel: string, diagnosedDamage: string) => {
      return `Saya menemukan [Kerusakan: ${diagnosedDamage}] pada [Model Perangkat: ${deviceModel}]. Berikan bantuan Bantuan Teknis (link tutorial/prosedur perbaikan yang relevan).`;
    },
    tindakan_barang: (deviceModel: string, itemName: string) => {
      return `Saya akan mengganti [Nama Barang: ${itemName}] untuk [Model Perangkat: ${deviceModel}]. Berikan bantuan Pendapat atau Tips untuk melakukannya dengan benar.`;
    },
    tindakan_jasa: (deviceModel: string, serviceName: string) => {
      return `Saya akan memasukkan [Tindakan Jasa: ${serviceName}] untuk [Model Perangkat: ${deviceModel}]. Berikan bantuan Pendapat atau Tips untuk melakukannya dengan benar.`;
    },
  },
};
