import { test, expect } from "@playwright/test";

test.describe("Todo App Pagination", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    
    // Wait for the application to be fully rendered
    await page.waitForLoadState("networkidle");
  });

  test("should render pagination when there are multiple pages of todos", async ({
    page,
  }) => {
    // Add multiple todos to create pagination
    for (let i = 1; i <= 25; i++) {
      await page
        .getByPlaceholder("What needs to be done?")
        .fill(`Todo item ${i}`);
      await page.keyboard.press("Enter");
    }

    // Verify pagination is visible
    const pagination = page.locator(".py-4.border-t");
    await expect(pagination).toBeVisible();

    // Verify page 1 is active
    const page1Button = page.getByRole("button", { name: "Page 1" });
    await expect(page1Button).toHaveAttribute("aria-current", "page");

    // Verify page 2 is visible
    const page2Button = page.getByRole("button", { name: "Page 2" });
    await expect(page2Button).toBeVisible();

    // Take a screenshot of the pagination with multiple pages
    await page.screenshot({ path: "tests/e2e/screenshots/pagination-multiple-pages.png", fullPage: true });
  });

  test("should navigate to second page when page 2 is clicked", async ({
    page,
  }) => {
    // Add multiple todos to create pagination
    for (let i = 1; i <= 25; i++) {
      await page
        .getByPlaceholder("What needs to be done?")
        .fill(`Todo item ${i}`);
      await page.keyboard.press("Enter");
    }

    // Click on page 2
    await page.getByRole("button", { name: "Page 2" }).click();

    // Verify page 2 is now active
    const page2Button = page.getByRole("button", { name: "Page 2" });
    await expect(page2Button).toHaveAttribute("aria-current", "page");

    // Take a screenshot of the active second page
    await page.screenshot({ path: "tests/e2e/screenshots/pagination-page2-active.png", fullPage: true });
  });

  test("should handle ellipsis navigation correctly", async ({ page }) => {
    // First take a screenshot of the empty todo list before adding items
    await page.screenshot({ path: "tests/e2e/screenshots/todo-list-empty.png", fullPage: true });
    // Add many todos to create multiple pages with ellipsis
    for (let i = 1; i <= 25; i++) {
      await page
        .getByPlaceholder("What needs to be done?")
        .fill(`Todo item ${i}`);
      await page.keyboard.press("Enter");
    }

    // Verify first page shows 1, 2, ...
    await expect(page.getByRole("button", { name: "Page 1" })).toBeVisible();
    await expect(page.getByRole("button", { name: "Page 2" })).toBeVisible();
    await expect(page.getByText("...")).toBeVisible();

    // Click on ellipsis to navigate forward
    await page.getByRole("button", { name: "Page 2" }).click();
    await page.getByRole("button", { name: "Page 3" }).click();

    // Verify we've moved to the next page
    await expect(page.getByRole("button", { name: "Page 3" })).toHaveAttribute(
      "aria-current",
      "page"
    );

    // Take a screenshot showing ellipsis navigation
    await page.screenshot({ path: "tests/e2e/screenshots/pagination-ellipsis-navigation.png", fullPage: true });
  });
});
