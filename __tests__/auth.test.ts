import {
  login,
  updateProfile,
  register,
  getCurrentUser,
  logOut,
  checkLogin,
} from "../backend/controller/auth";
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

jest.mock("firebase/auth", () => ({
  signInWithEmailAndPassword: jest.fn(),
  createUserWithEmailAndPassword: jest.fn(),
  signOut: jest.fn(),
}));

jest.mock("firebase/firestore", () => ({
  doc: jest.fn(),
  getDoc: jest.fn(),
  setDoc: jest.fn(),
}));

jest.mock("../backend/controller/image");

// Import mocked modules for type casting
import { firebase } from "../backend/config/firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";

describe("Auth Controller", () => {
  const mockUser = {
    uid: "test-uid",
    email: "test@example.com",
    displayName: "Test User",
  };

  const mockUserDoc = {
    businessName: "Test Business",
    address: "123 Test St",
    logoUrl: "https://example.com/logo.jpg",
  };

  const mockFile = new Blob(["test"], { type: "image/jpeg" }) as File;
  const mockLogoUrl = "https://cloudinary.com/logo.jpg";

  beforeEach(() => {
    jest.clearAllMocks();

    // Reset firebase auth mock
    (firebase.auth.currentUser as unknown) = null;

    // Mock uploadImageToCloudinary
    (uploadImageToCloudinary as jest.Mock).mockResolvedValue(mockLogoUrl);

    // Mock Firestore functions
    (doc as jest.Mock).mockReturnValue({ path: "users/test-uid" });
    (setDoc as jest.Mock).mockResolvedValue(undefined);
  });

  describe("login", () => {
    it("should successfully login user", async () => {
      (signInWithEmailAndPassword as jest.Mock).mockResolvedValue({
        user: mockUser,
      });

      const result = await login("test@example.com", "password123");

      expect(signInWithEmailAndPassword).toHaveBeenCalledWith(
        firebase.auth,
        "test@example.com",
        "password123"
      );
      expect(result).toBe(mockUser);
    });

    it("should throw error when login fails", async () => {
      const mockError = new Error("Invalid credentials");
      (signInWithEmailAndPassword as jest.Mock).mockRejectedValue(mockError);

      await expect(login("test@example.com", "wrongpassword")).rejects.toThrow(
        "Invalid credentials"
      );
    });

    it("should handle non-Error objects", async () => {
      (signInWithEmailAndPassword as jest.Mock).mockRejectedValue(
        "String error"
      );

      await expect(login("test@example.com", "password")).rejects.toThrow(
        "String error"
      );
    });
  });

  describe("register", () => {
    it("should successfully register user", async () => {
      (createUserWithEmailAndPassword as jest.Mock).mockResolvedValue({
        user: mockUser,
      });

      const result = await register(
        "test@example.com",
        "password123",
        "Test Business",
        "123 Test St",
        mockFile
      );

      expect(createUserWithEmailAndPassword).toHaveBeenCalledWith(
        firebase.auth,
        "test@example.com",
        "password123"
      );
      expect(uploadImageToCloudinary).toHaveBeenCalledWith(mockFile);
      expect(doc).toHaveBeenCalledWith(firebase.db, "users", mockUser.uid);
      expect(setDoc).toHaveBeenCalledWith(
        { path: "users/test-uid" },
        {
          businessName: "Test Business",
          address: "123 Test St",
          logoUrl: mockLogoUrl,
        },
        { merge: true }
      );
      expect(result).toBe(mockUser);
    });

    it("should throw error when registration fails", async () => {
      const mockError = new Error("Email already in use");
      (createUserWithEmailAndPassword as jest.Mock).mockRejectedValue(
        mockError
      );

      await expect(
        register(
          "existing@example.com",
          "password123",
          "Test Business",
          "123 Test St",
          mockFile
        )
      ).rejects.toThrow("Email already in use");
    });
  });

  describe("updateProfile", () => {
    beforeEach(() => {
      (firebase.auth.currentUser as unknown) = mockUser;
    });

    it("should update business name", async () => {
      (getDoc as jest.Mock).mockResolvedValue({
        exists: () => true,
        data: () => mockUserDoc,
      });

      await updateProfile("Updated Business", undefined, undefined);

      expect(setDoc).toHaveBeenCalledWith(
        { path: "users/test-uid" },
        { businessName: "Updated Business" },
        { merge: true }
      );
    });

    it("should update address", async () => {
      (getDoc as jest.Mock).mockResolvedValue({
        exists: () => true,
        data: () => mockUserDoc,
      });

      await updateProfile(undefined, "456 New St", undefined);

      expect(setDoc).toHaveBeenCalledWith(
        { path: "users/test-uid" },
        { address: "456 New St" },
        { merge: true }
      );
    });

    it("should update logo", async () => {
      (getDoc as jest.Mock).mockResolvedValue({
        exists: () => true,
        data: () => mockUserDoc,
      });

      const newFile = new Blob(["new"], { type: "image/png" }) as File;
      await updateProfile(undefined, undefined, newFile);

      expect(uploadImageToCloudinary).toHaveBeenCalledWith(newFile);
      expect(setDoc).toHaveBeenCalledWith(
        { path: "users/test-uid" },
        { logoUrl: mockLogoUrl },
        { merge: true }
      );
    });

    it("should update all fields", async () => {
      (getDoc as jest.Mock).mockResolvedValue({
        exists: () => true,
        data: () => mockUserDoc,
      });

      await updateProfile("New Business", "789 New Ave", mockFile);

      expect(setDoc).toHaveBeenCalledWith(
        { path: "users/test-uid" },
        {
          businessName: "New Business",
          address: "789 New Ave",
          logoUrl: mockLogoUrl,
        },
        { merge: true }
      );
    });

    it("should not call setDoc when no updates provided", async () => {
      (getDoc as jest.Mock).mockResolvedValue({
        exists: () => true,
        data: () => mockUserDoc,
      });

      await updateProfile(undefined, undefined, undefined);

      expect(setDoc).not.toHaveBeenCalled();
    });

    it("should throw error when user not logged in", async () => {
      (firebase.auth.currentUser as unknown) = null;

      await expect(
        updateProfile("Business", "Address", undefined)
      ).rejects.toThrow("User not logged in");
    });

    it("should throw error when update fails", async () => {
      const mockError = new Error("Update failed");
      (setDoc as jest.Mock).mockRejectedValue(mockError);

      await expect(
        updateProfile("Business", undefined, undefined)
      ).rejects.toThrow("Update failed");
    });
  });

  describe("getCurrentUser", () => {
    beforeEach(() => {
      (firebase.auth.currentUser as unknown) = mockUser;
    });

    it("should return current user with profile data", async () => {
      (getDoc as jest.Mock).mockResolvedValue({
        exists: () => true,
        data: () => mockUserDoc,
      });

      const result = await getCurrentUser();

      expect(doc).toHaveBeenCalledWith(firebase.db, "users", mockUser.uid);
      expect(getDoc).toHaveBeenCalled();
      expect(result).toEqual({
        ...mockUser,
        businessName: "Test Business",
        address: "123 Test St",
        logoUrl: "https://example.com/logo.jpg",
      });
    });

    it("should throw error when user not logged in", async () => {
      (firebase.auth.currentUser as unknown) = null;

      await expect(getCurrentUser()).rejects.toThrow("User not logged in");
    });

    it("should throw error when user document not found", async () => {
      (getDoc as jest.Mock).mockResolvedValue({
        exists: () => false,
      });

      await expect(getCurrentUser()).rejects.toThrow("User not found");
    });

    it("should throw error when getting user document fails", async () => {
      const mockError = new Error("Database error");
      (getDoc as jest.Mock).mockRejectedValue(mockError);

      await expect(getCurrentUser()).rejects.toThrow("Database error");
    });
  });

  describe("logOut", () => {
    it("should successfully logout user", async () => {
      (signOut as jest.Mock).mockResolvedValue(undefined);

      await logOut();

      expect(signOut).toHaveBeenCalledWith(firebase.auth);
    });

    it("should throw error when logout fails", async () => {
      const mockError = new Error("Logout failed");
      (signOut as jest.Mock).mockRejectedValue(mockError);

      await expect(logOut()).rejects.toThrow("Logout failed");
    });
  });

  describe("checkLogin", () => {
    it("should return true when user is logged in", () => {
      (firebase.auth.currentUser as unknown) = mockUser;

      const result = checkLogin();

      expect(result).toBe(true);
    });

    it("should return false when user is not logged in", () => {
      (firebase.auth.currentUser as unknown) = null;

      const result = checkLogin();

      expect(result).toBe(false);
    });
  });
});
