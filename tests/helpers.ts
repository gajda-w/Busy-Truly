import { expect, type Locator, type Page } from "@playwright/test";

export const bookTitles = ["Skradzione Szepty", "Królowa Wiedźm"] as const;

export function coverTrigger(page: Page, title: string) {
  return page.getByRole("button", { name: `Take a closer look at ${title}`, exact: true });
}

export async function loadHome(page: Page) {
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  // Scroll through the page so lazy-loaded images also settle before full-page capture.
  for (const image of await page.locator("img").all()) {
    await image.scrollIntoViewIfNeeded();
    await expect(image).toBeVisible();
    await expect
      .poll(() =>
        image.evaluate((element: HTMLImageElement) => element.complete && element.naturalWidth > 0),
      )
      .toBe(true);
  }
  await page.evaluate(async () => {
    await document.fonts.ready;
    await Promise.all(
      Array.from(document.images, (image) => image.decode().catch(() => undefined)),
    );
    window.scrollTo({ top: 0, behavior: "instant" });
  });
}

export async function expectPreviewClosed(page: Page, trigger: Locator) {
  await expect(page.getByRole("dialog")).not.toBeVisible();
  await expect(trigger).toBeFocused();
  await expect(trigger).toHaveAttribute("aria-expanded", "false");
  await expect(page.locator("body")).not.toHaveCSS("overflow", "hidden");
}
