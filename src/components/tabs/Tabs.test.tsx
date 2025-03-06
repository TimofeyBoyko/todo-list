import { render, screen, fireEvent } from "@testing-library/react";
import Tabs from "./index";
import { Tab } from "./Tabs.types";

describe("Tabs Component", () => {
  const mockTabs: Tab[] = [
    {
      id: "tab1",
      label: "Tab 1",
      content: <div data-testid="tab1-content">Content for Tab 1</div>,
    },
    {
      id: "tab2",
      label: "Tab 2",
      content: <div data-testid="tab2-content">Content for Tab 2</div>,
    },
    {
      id: "tab3",
      label: "Tab 3",
      content: <div data-testid="tab3-content">Content for Tab 3</div>,
    },
  ];

  it("renders with default first tab active", () => {
    render(<Tabs tabs={mockTabs} />);

    // Check if all tab labels are rendered
    expect(screen.getByText("Tab 1")).toBeInTheDocument();
    expect(screen.getByText("Tab 2")).toBeInTheDocument();
    expect(screen.getByText("Tab 3")).toBeInTheDocument();

    // Check if first tab content is visible
    expect(screen.getByTestId("tab1-content")).toBeInTheDocument();

    // Check if other tab contents are not visible
    expect(screen.queryByTestId("tab2-content")).not.toBeInTheDocument();
    expect(screen.queryByTestId("tab3-content")).not.toBeInTheDocument();
  });

  it("changes active tab when clicked", () => {
    render(<Tabs tabs={mockTabs} />);

    // Click on second tab
    fireEvent.click(screen.getByText("Tab 2"));

    // Check if second tab content is now visible
    expect(screen.getByTestId("tab2-content")).toBeInTheDocument();

    // Check if other tab contents are not visible
    expect(screen.queryByTestId("tab1-content")).not.toBeInTheDocument();
    expect(screen.queryByTestId("tab3-content")).not.toBeInTheDocument();
  });

  it("calls onTabChange when tab is clicked", () => {
    const handleTabChange = jest.fn();
    render(<Tabs tabs={mockTabs} onTabChange={handleTabChange} />);

    // Click on third tab
    fireEvent.click(screen.getByText("Tab 3"));

    // Check if onTabChange was called with correct tab id
    expect(handleTabChange).toHaveBeenCalledWith("tab3");
  });

  it("respects externally controlled active tab", () => {
    const { rerender } = render(<Tabs tabs={mockTabs} activeTab="tab2" />);

    // Check if second tab content is visible
    expect(screen.getByTestId("tab2-content")).toBeInTheDocument();

    // Update active tab externally
    rerender(<Tabs tabs={mockTabs} activeTab="tab3" />);

    // Check if third tab content is now visible
    expect(screen.getByTestId("tab3-content")).toBeInTheDocument();
  });

  it("handles case when externalActiveTab becomes undefined", () => {
    const { rerender } = render(<Tabs tabs={mockTabs} activeTab="tab2" />);

    // Check if second tab content is visible
    expect(screen.getByTestId("tab2-content")).toBeInTheDocument();

    // Update to remove the activeTab prop
    rerender(<Tabs tabs={mockTabs} />);

    // Tab should remain on tab2 since we're not forcing a change
    expect(screen.getByTestId("tab2-content")).toBeInTheDocument();

    // Click on a different tab to verify interaction still works
    fireEvent.click(screen.getByText("Tab 3"));
    expect(screen.getByTestId("tab3-content")).toBeInTheDocument();
  });

  it("allows internal tab changes when no external control is provided", () => {
    // Render without external activeTab - should use internal state
    render(<Tabs tabs={mockTabs} />);
    
    // First tab should be active by default
    expect(screen.getByTestId("tab1-content")).toBeInTheDocument();
    
    // Click on a different tab
    fireEvent.click(screen.getByText("Tab 2"));
    
    // Second tab should now be active
    expect(screen.getByTestId("tab2-content")).toBeInTheDocument();
    expect(screen.queryByTestId("tab1-content")).not.toBeInTheDocument();
  });
  
  it("respects external control and allows onTabChange to be called", () => {
    // Create a mock for onTabChange
    const onTabChangeMock = jest.fn();
    
    // Render with tab2 active and a mock onTabChange handler
    render(<Tabs tabs={mockTabs} activeTab="tab2" onTabChange={onTabChangeMock} />);
    
    // Verify tab2 content is visible
    expect(screen.getByTestId("tab2-content")).toBeInTheDocument();
    
    // Click on a different tab
    fireEvent.click(screen.getByText("Tab 1"));
    
    // The tab2 content should still be visible because we're externally controlling it
    // But onTabChange should have been called with the new tab id
    expect(screen.getByTestId("tab2-content")).toBeInTheDocument();
    expect(onTabChangeMock).toHaveBeenCalledWith("tab1");
  });

  it("handles empty tabs array", () => {
    // Should render without errors even with empty tabs
    render(<Tabs tabs={[]} />);

    // No tab content should be visible
    expect(screen.queryByTestId("tab1-content")).not.toBeInTheDocument();
    expect(screen.queryByTestId("tab2-content")).not.toBeInTheDocument();
    expect(screen.queryByTestId("tab3-content")).not.toBeInTheDocument();
  });
});
