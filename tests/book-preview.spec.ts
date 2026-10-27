import { expect, test } from "@playwright/test";
import { bookTitles, coverTrigger, expectPreviewClosed, loadHome } from "./helpers";

for (const title of bookTitles) {
  test(`${title} opens with pointer and closes with its button`, async ({ page }) => {
    await loadHome(page);
    const trigger = coverTrigger(page, title);
    await trigger.scrollIntoViewIfNeeded();
    const scrollBefore = await page.evaluate(() => window.scrollY);
    await trigger.click();
    const dialog = page.getByRole("dialog", { name: title, exact: true });
    await expect(dialog).toBeVisible();
    await expect(trigger).toHaveAttribute("aria-expanded", "true");
    const close = dialog.getByRole("button", { name: "Close cover preview" });
    await expect(close).toBeFocused();
    await expect(page.locator("body")).toHaveCSS("overflow", "hidden");
    // Native dialogs may send Tab to browser chrome, but background controls stay inert.
    await page.keyboard.press("Tab");
    await expect(page.locator("a:focus, [aria-haspopup='dialog']:focus")).toHaveCount(0);
    await page.keyboard.press("Shift+Tab");
    await expect(page.locator("a:focus, [aria-haspopup='dialog']:focus")).toHaveCount(0);
    // Inert background controls cannot steal focus even when explicitly requested.
    await trigger.evaluate((button: HTMLElement) => button.focus());
    await expect(trigger).not.toBeFocused();
    await close.click();
    await expectPreviewClosed(page, trigger);
    await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(scrollBefore);
  });

  for (const key of ["Enter", "Space"]) {
    test(`${title} opens with ${key} and closes with Escape`, async ({ page }) => {
      await loadHome(page);
      const trigger = coverTrigger(page, title);
      await trigger.focus();
      await trigger.press(key);
      await expect(page.getByRole("dialog", { name: title, exact: true })).toBeVisible();
      await page.keyboard.press("Escape");
      await expectPreviewClosed(page, trigger);
    });
  }

  test(`${title} closes when its backdrop is clicked`, async ({ page }) => {
    await loadHome(page);
    const trigger = coverTrigger(page, title);
    await trigger.click();
    await expect(page.getByRole("dialog")).toBeVisible();
    // Both viewport configurations leave the top-left corner outside the preview.
    await page.mouse.click(8, 8);
    await expectPreviewClosed(page, trigger);
  });
}

test("a quick Escape during opening permits another preview", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await loadHome(page);
  const first = coverTrigger(page, bookTitles[0]);
  await first.click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await page.keyboard.press("Escape");
  await page.keyboard.press("Escape");
  await expectPreviewClosed(page, first);
  const second = coverTrigger(page, bookTitles[1]);
  await second.click();
  await expect(page.getByRole("dialog", { name: bookTitles[1] })).toBeVisible();
  await page.getByRole("button", { name: "Close cover preview" }).click();
  await expectPreviewClosed(page, second);
});

test("enabling reduced motion while open stops animation and keeps closing usable", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await loadHome(page);
  const trigger = coverTrigger(page, bookTitles[0]);
  await trigger.click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await page.emulateMedia({ reducedMotion: "reduce" });
  // Two frames deliver the media-query change without waiting for the original
  // opening animation to finish naturally (which would hide this regression).
  await page.evaluate(
    () =>
      new Promise<void>((resolve) => {
        requestAnimationFrame(() => requestAnimationFrame(() => resolve()));
      }),
  );
  expect(
    await page
      .getByRole("dialog")
      .evaluate(
        (dialog) =>
          dialog
            .getAnimations({ subtree: true })
            .filter((animation) => animation.playState === "running").length,
      ),
  ).toBe(0);
  await page.keyboard.press("Escape");
  await expectPreviewClosed(page, trigger);
});

test("a touch tap opens and closes the preview", async ({ page }, testInfo) => {
  test.skip(!testInfo.project.use.hasTouch, "Touch input applies to the mobile project.");
  await loadHome(page);
  const trigger = coverTrigger(page, bookTitles[0]);
  await trigger.tap();
  await expect(page.getByRole("dialog")).toBeVisible();
  await page.getByRole("button", { name: "Close cover preview" }).tap();
  await expectPreviewClosed(page, trigger);
});

test("enabling reduced motion during closing finishes and restores the page", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await loadHome(page);
  await page.locator("body").evaluate((body) => {
    body.style.overflow = "auto";
  });
  const trigger = coverTrigger(page, bookTitles[0]);
  await trigger.click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await page.keyboard.press("Escape");
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.evaluate(
    () =>
      new Promise<void>((resolve) => {
        requestAnimationFrame(() => requestAnimationFrame(() => resolve()));
      }),
  );
  expect(await page.getByRole("dialog").count()).toBe(0);
  await expectPreviewClosed(page, trigger);
  await expect(page.locator("body")).toHaveCSS("overflow", "auto");
  await trigger.click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await page.keyboard.press("Escape");
  await expectPreviewClosed(page, trigger);
});
