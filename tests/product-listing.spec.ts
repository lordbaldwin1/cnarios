import { expect, test } from "../fixtures";
import { CategoryCount } from "../pages/ProductListingPage";


test.describe("ecommerce product listing & pagination tests", () => {
// Test Steps & Details
// Description:
// Verify total number of products in each category matches expected values

// Steps to Execute:
// Navigate to product listing page
// Iterate through all pages
// Extract category for each product
// Count products per category
// Compare counts with expected values from product data file
  test("product counts match category data source values", async ({ productListingPage }) => {
    const count: CategoryCount = {};
    const data: CategoryCount = {};
    await productListingPage.goto();
    await productListingPage.collectAllCardCategoryCount(count);
    await productListingPage.collectCategoryBannerCount(data);
    expect(count).toEqual(data);
  });
});