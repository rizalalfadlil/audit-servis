import { render, cleanup, act } from "@testing-library/react";
import Home from "../app/page";
import AppPage from "../app/app/page";
import DocsPage from "../app/docs/page";
import HistoryPage from "../app/history/page";
import ProfilePage from "../app/profile/page";

describe("Page Rendering", () => {
  // Helper function to safely test page rendering
  const testPageRenders = (
    PageComponent: React.ComponentType,
    pageName: string
  ) => {
    it(`renders ${pageName} page without crashing`, () => {
      // Suppress expected error messages in test output
      const originalError = console.error;
      console.error = jest.fn();

      try {
        act(() => {
          render(<PageComponent />);
        });
        // Just check that the component renders without crashing
        expect(document.body).toBeInTheDocument();
      } catch (error) {
        // If the test fails, provide a more helpful error message
        throw new Error(`Failed to render ${pageName} page: ${error}`);
      } finally {
        // Restore original console.error
        console.error = originalError;
        cleanup(); // Clean up to prevent worker process leaks
      }
    });
  };

  testPageRenders(Home, "home");
  testPageRenders(AppPage, "app");
  testPageRenders(DocsPage, "docs");
  testPageRenders(HistoryPage, "history");
  testPageRenders(ProfilePage, "profile");
});
