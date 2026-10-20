import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";
import { bookTitles, coverTrigger, loadHome } from "./helpers";

test("home and both previews render without runtime or hydration errors", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });
  await loadHome(page);
  for (const title of bookTitles) {
    await coverTrigger(page, title).click();
    await expect(page.getByRole("dialog", { name: title, exact: true })).toBeVisible();
    await page.getByRole("button", { name: "Close cover preview" }).click();
    await expect(page.getByRole("dialog")).not.toBeVisible();
  }
  expect(errors).toEqual([]);
});

test("page and cover preview have no automated WCAG A/AA violations", async ({ page }) => {
  await loadHome(page);
  const scan = () =>
    new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"]).analyze();
  expect((await scan()).violations).toEqual([]);
  await coverTrigger(page, bookTitles[0]).click();
  await expect(page.getByRole("dialog")).toBeVisible();
  expect((await scan()).violations).toEqual([]);
});

test("skip link moves keyboard focus to the main content", async ({ page, browserName }) => {
  await loadHome(page);
  // WebKit follows Safari's default: Option+Tab includes links in keyboard traversal.
  const nextLink = browserName === "webkit" ? "Alt+Tab" : "Tab";
  await page.keyboard.press(nextLink);
  const skip = page.getByRole("link", { name: "Skip to content" });
  await expect(skip).toBeFocused();
  await skip.press("Enter");
  await expect(page).toHaveURL(/#main$/);
  await expect(page.getByRole("main")).toBeInViewport();
  await page.keyboard.press(nextLink);
  await expect(
    page.getByRole("main").getByRole("link", { name: "Explore the Books" }),
  ).toBeFocused();
});

test("book navigation reaches the books section", async ({ page }) => {
  await loadHome(page);
  await page.getByRole("link", { name: "Explore the Books" }).click();
  await expect(page).toHaveURL(/#books$/);
  await expect(
    page.getByRole("heading", { name: "Begin with a whisper. Follow it into the deep." }),
  ).toBeInViewport();
});

test("layout stays within the viewport at mobile, tablet and desktop widths", async ({ page }) => {
  for (const width of [390, 768, 1200]) {
    await page.setViewportSize({ width, height: 900 });
    await loadHome(page);
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(
      width,
    );
    await coverTrigger(page, bookTitles[0]).click();
    const close = page.getByRole("button", { name: "Close cover preview" });
    await expect(close).toBeInViewport({ ratio: 1 });
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(
      width,
    );
    await close.click();
    await expect(page.getByRole("dialog")).not.toBeVisible();
  }
});
