import { expect, test } from "../fixtures";
import { CategoryCount, CategoryTopRatings } from "../pages/ProductListingPage";

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
    const card = await productListingPage.findProduct(
      "Uniqlo Ultra Light Down Jacket",
    );
    if (!card) {
      throw new Error("Product not found");
    }
    await expect(productListingPage.navigationButtons.nth(3)).toHaveAttribute(
      "aria-current",
      "page",
    );
  });

  test("highest rated products in each category match expected data", async ({
    productListingPage,
  }) => {
    const expected: CategoryTopRatings = {
      BOOKS: {
        titles: [
          "The Pragmatic Programmer",
          "Sapiens: A Brief History of Humankind",
          "Atomic Habits",
          "Clean Code",
        ],
        rating: 5,
      },
      SPORTS: {
        titles: [
          "Wilson Pro Staff Tennis Racket",
          "Callaway Golf Set",
          "Adidas Predator Football",
          "Nike Mercurial Football Boots",
        ],
        rating: 5,
      },
      HOME: {
        titles: [
          "Samsung Smart Refrigerator",
          "KitchenAid Stand Mixer",
          "Breville Barista Express",
          "Instant Pot Duo",
          "Philips Air Fryer XXL",
          "Dyson V15 Detect Vacuum",
        ],
        rating: 5,
      },
      CLOTHING: {
        titles: [
          "Nike Air Force 1 Sneakers",
          "Patagonia Fleece Sweater",
          "The North Face Jacket",
          "Under Armour Running Shoes",
        ],
        rating: 5,
      },
      ELECTRONICS: {
        titles: [
          "Sony PlayStation 5",
          "GoPro HERO11 Black",
          "Bose QuietComfort 45",
          "Apple MacBook Air M2",
          "Apple iPhone 14 Pro",
          "Sony WH-1000XM5 Headphones",
        ],
        rating: 5,
      },
    };
    await productListingPage.goto();
    const ratings = await productListingPage.setupTopCategories();
    await productListingPage.findTopRatedProducts(ratings);
    expect(ratings).toEqual(expected);
  });
});
