import { expect, test } from "@playwright/test";
import { bookTitles, coverTrigger, loadHome } from "./helpers";

test("home page preserves its layout", async ({ page }) => {
  await loadHome(page);
  await expect(page).toHaveScreenshot("home.png", { fullPage: true });
});

for (const title of bookTitles) {
  test(`${title} cover preview preserves its layout`, async ({ page }) => {
    await loadHome(page);
    await coverTrigger(page, title).click();
    const dialog = page.getByRole("dialog", { name: title, exact: true });
    await expect(dialog).toBeVisible();
    await expect(page).toHaveScreenshot(
      `${title === bookTitles[0] ? "first" : "second"}-cover-preview.png`,
    );
  });
}
