import {
  createServiceReport,
  getHistory,
  clearHistory,
} from "../backend/controller/service";
import { ServiceReport, InitialCheck, DiagnosisResult } from "@/types/service";
import { uploadImageToCloudinary } from "../backend/controller/image";

// Mock Firebase dependencies
jest.mock("../backend/config/firebase", () => ({
  firebase: {
    auth: {
      currentUser: null,
    },
    db: {},
  },
}));

jest.mock("firebase/firestore", () => ({
  addDoc: jest.fn(),
  collection: jest.fn(),
  deleteDoc: jest.fn(),
  getDocs: jest.fn(),
}));

jest.mock("../backend/controller/image");

// Import mocked modules for type casting
import { firebase } from "../backend/config/firebase";
import { addDoc, collection, deleteDoc, getDocs } from "firebase/firestore";

describe("Service Controller", () => {
  const mockUser = {
    uid: "test-uid",
    email: "test@example.com",
  };

  const mockInitialCheck: InitialCheck = {
    customerName: "John Doe",
    customerContact: "08123456789",
    deviceName: "iPhone 12",
    complaint: "Screen not working",
  };

  const mockDiagnosisResult: DiagnosisResult = {
    problems: [
      { name: "Cracked screen", level: "critical" },
      { name: "Battery drain", level: "sedang" },
    ],
    actions: [
      { name: "Screen replacement", type: "jasa", cost: 1500000 },
      { name: "New battery", type: "barang", cost: 500000 },
    ],
    images: [new Blob(["test1"], { type: "image/jpeg" }) as File] as
      | File[]
      | string[],
    status: "completed",
    totalCost: 2000000,
  };

  const mockServiceReport: ServiceReport = {
    initialCheck: mockInitialCheck,
    diagnosisResult: mockDiagnosisResult,
  };

  const mockDocRef = { id: "doc-id" };
  const mockDocSnapshot = {
    id: "doc-1",
    data: () => mockServiceReport,
    ref: { path: "users/test-uid/history/doc-1" },
  };
  const mockQuerySnapshot = {
    docs: [mockDocSnapshot],
  };

  beforeEach(() => {
    jest.clearAllMocks();

    // Set up authenticated user
    (firebase.auth.currentUser as unknown) = mockUser;

    // Mock Firestore functions
    (collection as jest.Mock).mockReturnValue({
      path: "users/test-uid/history",
    });
    (addDoc as jest.Mock).mockResolvedValue(mockDocRef);
    (getDocs as jest.Mock).mockResolvedValue(mockQuerySnapshot);
    (deleteDoc as jest.Mock).mockResolvedValue(undefined);

    // Mock image upload
    (uploadImageToCloudinary as jest.Mock).mockImplementation(async (image) => {
      if (typeof image === "string") return image;
      return "https://cloudinary.com/upload-test.jpg";
    });

    // Update mock diagnosis result to have only one image for consistency
    mockDiagnosisResult.images = [
      new Blob(["test1"], { type: "image/jpeg" }) as File,
    ] as File[] | string[];
  });

  describe("createServiceReport", () => {
    it("should create a service report successfully", async () => {
      const result = await createServiceReport(mockServiceReport);

      expect(firebase.auth.currentUser).toBeDefined();
      expect(collection).toHaveBeenCalledWith(
        firebase.db,
        "users",
        mockUser.uid,
        "history"
      );

      // Check that images are uploaded
      expect(uploadImageToCloudinary).toHaveBeenCalledTimes(1);

      expect(addDoc).toHaveBeenCalledWith(
        { path: "users/test-uid/history" },
        expect.objectContaining({
          initialCheck: mockInitialCheck,
          diagnosisResult: expect.objectContaining({
            ...mockDiagnosisResult,
            images: expect.arrayContaining([
              "https://cloudinary.com/upload-test.jpg",
            ]),
          }),
        })
      );

      expect(result).toBe(mockDocRef);
    });

    it("should throw error when user not logged in", async () => {
      (firebase.auth.currentUser as unknown) = null;

      await expect(createServiceReport(mockServiceReport)).rejects.toThrow(
        "User not logged in"
      );

      expect(addDoc).not.toHaveBeenCalled();
      expect(uploadImageToCloudinary).not.toHaveBeenCalled();
    });

    it("should handle empty images array", async () => {
      const reportWithNoImages: ServiceReport = {
        ...mockServiceReport,
        diagnosisResult: {
          ...mockDiagnosisResult,
          images: [],
        },
      };

      await createServiceReport(reportWithNoImages);

      expect(uploadImageToCloudinary).not.toHaveBeenCalled();
      expect(addDoc).toHaveBeenCalled();
    });

    it("should handle image upload failure", async () => {
      const uploadError = new Error("Upload failed");
      (uploadImageToCloudinary as jest.Mock).mockRejectedValue(uploadError);

      await expect(createServiceReport(mockServiceReport)).rejects.toThrow(
        "Upload failed"
      );
    });

    it("should handle Firestore addDoc failure", async () => {
      const dbError = new Error("Database error");
      (addDoc as jest.Mock).mockRejectedValue(dbError);

      await expect(createServiceReport(mockServiceReport)).rejects.toThrow(
        "Database error"
      );
    });
  });

  describe("getHistory", () => {
    it("should get user history successfully", async () => {
      const result = await getHistory();

      expect(firebase.auth.currentUser).toBeDefined();
      expect(collection).toHaveBeenCalledWith(
        firebase.db,
        "users",
        mockUser.uid,
        "history"
      );
      expect(getDocs).toHaveBeenCalled();
      expect(result).toEqual([mockServiceReport]);
    });

    it("should return empty array when no history exists", async () => {
      (getDocs as jest.Mock).mockResolvedValue({ docs: [] });

      const result = await getHistory();

      expect(result).toEqual([]);
    });

    it("should throw error when user not logged in", async () => {
      (firebase.auth.currentUser as unknown) = null;

      await expect(getHistory()).rejects.toThrow("User not logged in");

      expect(collection).not.toHaveBeenCalled();
      expect(getDocs).not.toHaveBeenCalled();
    });

    it("should handle Firestore getDocs failure", async () => {
      const dbError = new Error("Database error");
      (getDocs as jest.Mock).mockRejectedValue(dbError);

      await expect(getHistory()).rejects.toThrow("Database error");
    });

    it("should handle multiple history items", async () => {
      const mockDoc2 = {
        id: "doc-2",
        data: () => ({
          ...mockServiceReport,
          initialCheck: { ...mockInitialCheck, customerName: "Jane Doe" },
        }),
      };
      (getDocs as jest.Mock).mockResolvedValue({
        docs: [mockDocSnapshot, mockDoc2],
      });

      const result = await getHistory();

      expect(result).toHaveLength(2);
      expect(result[0]).toEqual(mockServiceReport);
      expect(result[1].initialCheck.customerName).toBe("Jane Doe");
    });
  });

  describe("clearHistory", () => {
    it("should clear user history successfully", async () => {
      await clearHistory();

      expect(firebase.auth.currentUser).toBeDefined();
      expect(collection).toHaveBeenCalledWith(
        firebase.db,
        "users",
        mockUser.uid,
        "history"
      );
      expect(getDocs).toHaveBeenCalled();
      expect(deleteDoc).toHaveBeenCalledWith(mockDocSnapshot.ref);
    });

    it("should handle clearing empty history", async () => {
      (getDocs as jest.Mock).mockResolvedValue({ docs: [] });

      await clearHistory();

      expect(deleteDoc).not.toHaveBeenCalled();
    });

    it("should throw error when user not logged in", async () => {
      (firebase.auth.currentUser as unknown) = null;

      await expect(clearHistory()).rejects.toThrow("User not logged in");

      expect(collection).not.toHaveBeenCalled();
      expect(getDocs).not.toHaveBeenCalled();
      expect(deleteDoc).not.toHaveBeenCalled();
    });

    it("should handle Firestore getDocs failure during clear", async () => {
      const dbError = new Error("Database error");
      (getDocs as jest.Mock).mockRejectedValue(dbError);

      await expect(clearHistory()).rejects.toThrow("Database error");
    });

    it("should handle deleteDoc failure during clear", async () => {
      const deleteError = new Error("Delete failed");
      (deleteDoc as jest.Mock).mockRejectedValue(deleteError);

      await expect(clearHistory()).rejects.toThrow("Delete failed");
    });

    it("should handle multiple documents deletion", async () => {
      const mockDoc2 = {
        id: "doc-2",
        data: () => mockServiceReport,
        ref: { path: "users/test-uid/history/doc-2" },
      };
      (getDocs as jest.Mock).mockResolvedValue({
        docs: [mockDocSnapshot, mockDoc2],
      });

      await clearHistory();

      expect(deleteDoc).toHaveBeenCalledTimes(2);
      expect(deleteDoc).toHaveBeenCalledWith(mockDocSnapshot.ref);
      expect(deleteDoc).toHaveBeenCalledWith(mockDoc2.ref);
    });
  });
});
