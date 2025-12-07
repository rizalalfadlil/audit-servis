import "@testing-library/jest-dom";
import "whatwg-fetch";
import React from "react";

import { TextEncoder, TextDecoder } from "util";
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder as typeof global.TextDecoder;

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

jest.mock("firebase/app", () => ({
  initializeApp: jest.fn(),
  getApps: jest.fn(() => []),
  getApp: jest.fn(),
  deleteApp: jest.fn(),
}));

jest.mock("firebase/auth", () => ({
  getAuth: jest.fn(() => ({
    currentUser: null,
    signInWithEmailAndPassword: jest.fn(),
    createUserWithEmailAndPassword: jest.fn(),
    signOut: jest.fn(),
    onAuthStateChanged: jest.fn(() => jest.fn()),
  })),
  signInWithEmailAndPassword: jest.fn(),
  createUserWithEmailAndPassword: jest.fn(),
  signOut: jest.fn(),
  onAuthStateChanged: jest.fn(() => jest.fn()),
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
jest.mock("react-markdown", () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) =>
    React.createElement("div", null, children),
}));

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

jest.mock("@/components/ui/layouts/suggestionsLayout", () => ({
  SuggestionsProvider: ({ children }: { children: React.ReactNode }) =>
    children,
  useSuggestions: () => ({
    showSuggestions: jest.fn(),
  }),
}));

jest.mock("@/components/ui/layouts/header", () => ({
  __esModule: true,
  default: () => React.createElement("header", null, "Mock Header"),
}));

jest.mock("@/components/ui/layouts/footer", () => ({
  __esModule: true,
  default: () => React.createElement("footer", null, "Mock Footer"),
}));

jest.mock("@/components/ui/layouts/errorPage", () => ({
  __esModule: true,
  default: ({ code }: { code: string }) =>
    React.createElement("div", null, `Error ${code}`),
}));

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

jest.mock("tailwind-merge", () => ({
  twMerge: jest.fn((...classes: string[]) => classes.join(" ")),
}));

global.fetch = jest.fn(() =>
  Promise.resolve({
    text: () =>
      Promise.resolve("# Mock Content\nThis is mock content for testing."),
  } as Response)
);

process.env.NEXT_PUBLIC_FIREBASE_API_KEY = "test-api-key";
process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN = "test.firebaseapp.com";
process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID = "test-project";
process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET = "test-bucket.appspot.com";
process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID = "test-sender-id";
process.env.NEXT_PUBLIC_FIREBASE_APP_ID = "test-app-id";
process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID = "test-measurement-id";
