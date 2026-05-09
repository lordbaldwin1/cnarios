import { test, expect } from "../fixtures";

test.describe("ecommerce checkout e2e tests", () => {
  // Test Steps & Details
  // Description:
  // Add a product to the cart and check that it appears correctly

  // Steps to Execute:
  // Navigate to product listing page
  // Click 'Add to Cart' on 'Wireless Headphones'
  // Click cart icon in the navbar
  // Verify 'Wireless Headphones' is displayed with correct price and quantity
  test("product added to cart appears correctly in cart", async ({
    shoppingPage,
    headerComponent,
  }) => {
    await shoppingPage.goto();
    await shoppingPage.addItemToCart("Wireless Headphones");
    const cartPage = await headerComponent.goToCart();
    const cardDetails = cartPage.getProductCardDetails("Wireless Headphones");
    await expect(cardDetails.name).toHaveText("Wireless Headphones ($120)");
    await expect(cardDetails.price).toHaveText("$120");
    await expect(cardDetails.quantity).toHaveText("1");
  });
});
