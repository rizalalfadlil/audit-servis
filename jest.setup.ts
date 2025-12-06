import "@testing-library/jest-dom";
import "whatwg-fetch";
import React from "react";

// Polyfill TextEncoder/TextDecoder for Jest environment
import { TextEncoder, TextDecoder } from "util";
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder as typeof global.TextDecoder;

// Mock window.matchMedia
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// Mock Firebase
jest.mock("firebase/app", () => ({
  initializeApp: jest.fn(),
  getApps: jest.fn(() => []),
  getApp: jest.fn(),
  deleteApp: jest.fn(),
  // Add other Firebase services you're using as needed
}));

jest.mock("firebase/auth", () => ({
  getAuth: jest.fn(() => ({
    currentUser: null,
    signInWithEmailAndPassword: jest.fn(),
    createUserWithEmailAndPassword: jest.fn(),
    signOut: jest.fn(),
    onAuthStateChanged: jest.fn(() => jest.fn()), // Return unsubscribe function
  })),
  signInWithEmailAndPassword: jest.fn(),
  createUserWithEmailAndPassword: jest.fn(),
  signOut: jest.fn(),
  onAuthStateChanged: jest.fn(() => jest.fn()), // Return unsubscribe function
}));

jest.mock("firebase/firestore", () => ({
  getFirestore: jest.fn(() => ({
    collection: jest.fn(),
    doc: jest.fn(),
    getDoc: jest.fn(),
    setDoc: jest.fn(),
  })),
  doc: jest.fn(),
  getDoc: jest.fn(),
  setDoc: jest.fn(),
}));

// Mock react-markdown
jest.mock("react-markdown", () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) =>
    React.createElement("div", null, children),
}));

// Mock MarkdownRenderer component - completely bypass react-markdown
jest.mock("@/components/ui/markdown/MarkdownRenderer", () => ({
  MarkdownRenderer: ({
    content,
    className,
  }: {
    content: string;
    className?: string;
  }) =>
    React.createElement(
      "div",
      { className, "data-testid": "markdown-renderer" },
      content
    ),
}));

// Mock SuggestionsProvider and useSuggestions
jest.mock("@/components/ui/layouts/suggestionsLayout", () => ({
  SuggestionsProvider: ({ children }: { children: React.ReactNode }) =>
    children,
  useSuggestions: () => ({
    showSuggestions: jest.fn(),
  }),
}));
// Mock Header and Footer components
jest.mock("@/components/ui/layouts/header", () => ({
  __esModule: true,
  default: () => React.createElement("header", null, "Mock Header"),
}));

jest.mock("@/components/ui/layouts/footer", () => ({
  __esModule: true,
  default: () => React.createElement("footer", null, "Mock Footer"),
}));

// Mock ErrorPage component
jest.mock("@/components/ui/layouts/errorPage", () => ({
  __esModule: true,
  default: ({ code }: { code: string }) =>
    React.createElement("div", null, `Error ${code}`),
}));

// Mock next/navigation
jest.mock("next/navigation", () => ({
  useRouter() {
    return {
      push: jest.fn(),
      replace: jest.fn(),
      prefetch: jest.fn(),
    };
  },
  useSearchParams() {
    return {
      get: jest.fn(),
    };
  },
}));

// Mock tailwind-merge
jest.mock("tailwind-merge", () => ({
  twMerge: jest.fn((...classes: string[]) => classes.join(" ")),
}));

// Mock fetch for docs page
global.fetch = jest.fn(() =>
  Promise.resolve({
    text: () =>
      Promise.resolve("# Mock Content\nThis is mock content for testing."),
  } as Response)
);

// Mock environment variables
process.env.NEXT_PUBLIC_FIREBASE_API_KEY = "test-api-key";
process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN = "test.firebaseapp.com";
process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID = "test-project";
process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET = "test-bucket.appspot.com";
process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID = "test-sender-id";
process.env.NEXT_PUBLIC_FIREBASE_APP_ID = "test-app-id";
process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID = "test-measurement-id";
