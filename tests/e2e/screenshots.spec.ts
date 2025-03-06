import { test, Page } from "@playwright/test";

// Helper to add a specific number of todos
async function addTodos(page: Page, count: number) {
  for (let i = 1; i <= count; i++) {
    await page
      .getByPlaceholder("What needs to be done?")
      .fill(`Todo item ${i}`);
    await page.keyboard.press("Enter");

    // Small delay to ensure UI updates properly
    await page.waitForTimeout(100);
  }
}

test.describe("Todo App Screenshots", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");

    // Wait for the application to be fully rendered
    await page.waitForLoadState("networkidle");
  });

  test("capture empty state", async ({ page }) => {
    // Take screenshot of the empty state
    await page.screenshot({
      path: "tests/e2e/screenshots/empty-state.png",
      fullPage: true,
    });
  });

  test("capture with few todos", async ({ page }) => {
    // Add 3 todos
    await addTodos(page, 3);

    // Take screenshot of todo list with a few items
    await page.screenshot({ path: "tests/e2e/screenshots/few-todos.png", fullPage: true });

    // Complete one todo
    await page.getByRole("checkbox").first().check();

    // Take screenshot with completed todo
    await page.screenshot({
      path: "tests/e2e/screenshots/completed-todo.png",
      fullPage: true,
    });
  });

  test("capture pagination states", async ({ page }) => {
    // Add enough todos to create pagination
    await addTodos(page, 25);

    // First page
    await page.screenshot({
      path: "tests/e2e/screenshots/pagination-page1.png",
      fullPage: true,
    });

    // Second page
    await page.getByRole("button", { name: "Page 2" }).click();
    await page.waitForTimeout(300); // Wait for page transition
    await page.screenshot({
      path: "tests/e2e/screenshots/pagination-page2.png",
      fullPage: true,
    });
  });

  test("capture responsive states", async ({ page }) => {
    // Add some todos for visual context
    await addTodos(page, 8);

    // Desktop view (default)
    await page.screenshot({
      path: "tests/e2e/screenshots/desktop-view.png",
      fullPage: true,
    });

    // Tablet view
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.waitForTimeout(300); // Wait for responsive layout to adjust
    await page.screenshot({
      path: "tests/e2e/screenshots/tablet-view.png",
      fullPage: true,
    });

    // Mobile view
    await page.setViewportSize({ width: 375, height: 667 });
    await page.waitForTimeout(300); // Wait for responsive layout to adjust
    await page.screenshot({
      path: "tests/e2e/screenshots/mobile-view.png",
      fullPage: true,
    });
  });
});
