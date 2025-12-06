import {
  uploadImageToCloudinary,
  replaceImageToCloudinary,
} from "../backend/controller/image";
import { getCloudinaryConfig } from "../backend/config/cloudinary";
import { toBlob } from "../utils/transform";

// Mock dependencies
jest.mock("../backend/config/cloudinary");
jest.mock("../utils/transform");

describe("Image Controller", () => {
  const mockCloudinaryConfig = {
    cloudName: "test-cloud",
    uploadPreset: "test-preset",
  };

  const mockFile = new Blob(["test"], { type: "image/jpeg" }) as File;
  const mockImageUrl = "https://example.com/image.jpg";
  const mockPublicId = "test-public-id";
  const mockResponse = {
    secure_url: mockImageUrl,
    url: mockImageUrl,
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (getCloudinaryConfig as jest.Mock).mockReturnValue(mockCloudinaryConfig);
    (toBlob as jest.Mock).mockImplementation(async (input) => {
      if (input instanceof Blob) return input;
      if (typeof input === "string") return new Blob([input]);
      return new Blob();
    });

    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => mockResponse,
    }) as jest.Mock;
  });

  describe("uploadImageToCloudinary", () => {
    it("should upload a file to Cloudinary", async () => {
      const result = await uploadImageToCloudinary(mockFile);

      expect(getCloudinaryConfig).toHaveBeenCalled();
      expect(toBlob).toHaveBeenCalledWith(mockFile);
      expect(global.fetch).toHaveBeenCalledWith(
        `https://api.cloudinary.com/v1_1/${mockCloudinaryConfig.cloudName}/image/upload`,
        {
          method: "POST",
          body: expect.any(FormData),
        }
      );
      expect(result).toBe(mockImageUrl);
    });

    it("should handle string input (URL)", async () => {
      const imageUrl = "https://example.com/photo.jpg";
      await uploadImageToCloudinary(imageUrl);

      expect(toBlob).toHaveBeenCalledWith(imageUrl);
    });

    it("should throw error when Cloudinary is not configured", async () => {
      (getCloudinaryConfig as jest.Mock).mockReturnValue({});

      await expect(uploadImageToCloudinary(mockFile)).rejects.toThrow(
        "Cloudinary is not configured"
      );
    });

    it("should throw error when upload fails", async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        status: 400,
      });

      await expect(uploadImageToCloudinary(mockFile)).rejects.toThrow(
        "Cloudinary upload failed: 400"
      );
    });

    it("should throw error when no URL is returned", async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => ({}),
      });

      await expect(uploadImageToCloudinary(mockFile)).rejects.toThrow(
        "Missing URL from Cloudinary response"
      );
    });
  });

  describe("replaceImageToCloudinary", () => {
    it("should replace an existing image on Cloudinary", async () => {
      const result = await replaceImageToCloudinary(mockPublicId, mockFile);

      expect(getCloudinaryConfig).toHaveBeenCalled();
      expect(toBlob).toHaveBeenCalledWith(mockFile);

      const formData = new FormData();
      formData.append("public_id", mockPublicId);
      formData.append("overwrite", "true");
      formData.append("file", mockFile);
      formData.append("upload_preset", mockCloudinaryConfig.uploadPreset);

      expect(global.fetch).toHaveBeenCalledWith(
        `https://api.cloudinary.com/v1_1/${mockCloudinaryConfig.cloudName}/image/upload`,
        {
          method: "POST",
          body: expect.any(FormData),
        }
      );

      expect(result).toBe(mockImageUrl);
    });
  });
});
