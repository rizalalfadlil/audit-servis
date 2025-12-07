import { render, cleanup, act } from "@testing-library/react";
import Home from "../app/page";
import AppPage from "../app/app/page";
import DocsPage from "../app/docs/page";
import HistoryPage from "../app/history/page";
import ProfilePage from "../app/profile/page";

describe("Page Rendering", () => {
  const testPageRenders = (
    PageComponent: React.ComponentType,
    pageName: string
  ) => {
    it(`renders ${pageName} page without crashing`, () => {
      const originalError = console.error;
      console.error = jest.fn();

      try {
        act(() => {
          render(<PageComponent />);
        });
        expect(document.body).toBeInTheDocument();
      } catch (error) {
        throw new Error(`Failed to render ${pageName} page: ${error}`);
      } finally {
        console.error = originalError;
        cleanup();
      }
    });
  };

  testPageRenders(Home, "home");
  testPageRenders(AppPage, "app");
  testPageRenders(DocsPage, "docs");
  testPageRenders(HistoryPage, "history");
  testPageRenders(ProfilePage, "profile");
});
