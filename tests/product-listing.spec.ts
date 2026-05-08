import { expect, test } from "../fixtures";
import { CategoryCount } from "../pages/ProductListingPage";

test.describe("ecommerce product listing & pagination tests", () => {
  test("product counts match category data source values", async ({
    productListingPage,
  }) => {
    const actualCount: CategoryCount = {};
    const expectedCount: CategoryCount = {};
    await productListingPage.goto();
    await productListingPage.collectAllCardCategoryCount(actualCount);
    await productListingPage.collectCategoryBannerCount(expectedCount);
    expect(actualCount).toEqual(expectedCount);
  });

  test("Uniqlo Ultra Light Down Jacket on page 3", async ({
    productListingPage,
  }) => {
    await productListingPage.goto();
    const card = await productListingPage.findProduct("Uniqlo Ultra Light Down Jacket");
    if (!card) {
      throw new Error("Product not found");
    }
    await expect(productListingPage.navigationButtons.nth(3)).toHaveAttribute("aria-current", "page");
  });
});
