import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";
import { bookTitles, coverTrigger, expectPreviewClosed } from "./helpers";

const products = [
  { slug: "skradzione-szepty", title: bookTitles[0] },
  { slug: "krolowa-wiedzm", title: bookTitles[1] },
] as const;

test("catalog covers lead to each book and its accessible preview", async ({ page }, testInfo) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });
  await page.goto("/");
  await page
    .getByRole("navigation", { name: "Main navigation" })
    .getByRole("link", { name: "Books", exact: true })
    .click();
  await expect(page).toHaveURL("/product");
  for (const { slug, title } of products) {
    const cover = page.getByRole("link", { name: `Discover ${title}`, exact: true });
    if (testInfo.project.use.hasTouch) {
      await cover.tap();
    } else {
      await cover.focus();
      await cover.press("Enter");
    }
    await expect(page).toHaveURL(`/product/${slug}`);
    await expect(page.getByRole("heading", { level: 1, name: title, exact: true })).toBeVisible();
    await expect(page).toHaveTitle(`${title} — K.T. Writz`);
    await expect(page.getByRole("button", { name: "Buy the Book" })).toBeDisabled();
    const trigger = coverTrigger(page, title);
    await trigger.click();
    await expect(page.getByRole("dialog", { name: title, exact: true })).toBeVisible();
    await page.getByRole("button", { name: "Close cover preview" }).click();
    await expectPreviewClosed(page, trigger);
    await page.getByRole("link", { name: "All books", exact: true }).click();
    await expect(page).toHaveURL("/product");
  }
  await page.getByRole("link", { name: "K.T. WRITZ", exact: true }).click();
  await expect(page).toHaveURL("/");
  expect(errors).toEqual([]);
});

test("book titles and details links also open their product pages", async ({ page }) => {
  await page.goto("/product");
  await page.getByRole("heading", { name: products[0].title }).getByRole("link").click();
  await expect(page).toHaveURL(`/product/${products[0].slug}`);
  await page.goBack();
  await expect(page).toHaveURL("/product");
  await page
    .getByRole("article", { name: products[1].title })
    .getByRole("link", { name: "Discover the book", exact: true })
    .click();
  await expect(page).toHaveURL(`/product/${products[1].slug}`);
});

test("product routes load directly, remain accessible and fit narrow viewports", async ({
  page,
}) => {
  for (const path of ["/product", ...products.map(({ slug }) => `/product/${slug}`)]) {
    const response = await page.goto(path);
    expect(response?.status()).toBe(200);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .analyze();
    expect(results.violations).toEqual([]);
    for (const width of [320, 390, 768, 1200]) {
      await page.setViewportSize({ width, height: 900 });
      expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(
        width,
      );
    }
  }
});

test("unknown books return a 404", async ({ page }) => {
  const response = await page.goto("/product/missing-book");
  expect(response?.status()).toBe(404);
});

test("catalog covers tilt with the pointer and respect reduced motion", async ({
  page,
}, testInfo) => {
  test.skip(Boolean(testInfo.project.use.hasTouch), "Pointer hover applies to desktop devices.");
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/product");
  for (const { title } of products) {
    const cover = page.getByRole("link", { name: `Discover ${title}`, exact: true });
    const image = cover.getByRole("img");
    await cover.scrollIntoViewIfNeeded();
    await expect(image).toBeVisible();
    await page.mouse.move(0, 0);
    const resting = (await image.boundingBox())!;
    await cover.hover({ position: { x: 30, y: 30 } });
    await expect
      .poll(async () => Math.abs((await image.boundingBox())!.x - resting.x))
      .toBeGreaterThan(2);
    await page.emulateMedia({ reducedMotion: "reduce" });
    await expect
      .poll(async () => Math.abs((await image.boundingBox())!.x - resting.x))
      .toBeLessThan(0.5);
    await cover.hover({ position: { x: 200, y: 200 } });
    expect(Math.abs((await image.boundingBox())!.x - resting.x)).toBeLessThan(0.5);
    await page.emulateMedia({ reducedMotion: "no-preference" });
  }
});
