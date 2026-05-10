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

  test("product quantity can be adjusted with total reflecting update", async ({
    shoppingPage,
    headerComponent,
  }) => {
    await shoppingPage.goto();
    await shoppingPage.addItemToCart("Smartphone Stand");
    const cartPage = await headerComponent.goToCart();

    const cardDetails = cartPage.getProductCardDetails("Smartphone Stand");
    await expect(cardDetails.price).toHaveText("$45");
    await expect(cardDetails.quantity).toHaveText("1");
    await expect(cartPage.totalPrice).toContainText("$45");

    await cartPage.increaseProductQuantity("Smartphone Stand");
    await expect(cardDetails.price).toHaveText("$90");
    await expect(cardDetails.quantity).toHaveText("2");
    await expect(cartPage.totalPrice).toContainText("$90");

    await cartPage.decreaseProductQuantity("Smartphone Stand");
    await expect(cardDetails.price).toHaveText("$45");
    await expect(cardDetails.quantity).toHaveText("1");
    await expect(cartPage.totalPrice).toContainText("$45");

    await cartPage.increaseProductQuantity("Smartphone Stand", 4);
    await expect(cardDetails.price).toHaveText("$225");
    await expect(cardDetails.quantity).toHaveText("5");
    await expect(cartPage.totalPrice).toContainText("$225");
  });

  test("removing product from cart", async ({
    shoppingPage,
    headerComponent,
  }) => {
    await shoppingPage.goto();
    await shoppingPage.addItemToCart("Laptop Backpack");
    const cartPage = await headerComponent.goToCart();

    await expect(headerComponent.cartCount).toBeVisible();
    await expect(headerComponent.cartButton).toHaveText("1");

    await cartPage.decreaseProductQuantity("Laptop Backpack");
    await expect(cartPage.productCards).toHaveCount(0);
    await expect(headerComponent.cartCount).toBeHidden();
  });

  test("attempt to proceed to payment without entering address", async ({
    shoppingPage,
    headerComponent,
  }) => {
    await shoppingPage.goto();
    await shoppingPage.addItemToCart("Bluetooth Speaker");
    const cartPage = await headerComponent.goToCart();
    const addressPage = await cartPage.goToAddress();
    await headerComponent.isActivePage("Address");
    await expect(addressPage.proceedButton).toBeDisabled();
  });

  // Test Steps & Details
  // Description:
  // Complete the full flow with payment success
  
  // Steps to Execute:
  // Add 'Fitness Band' to cart
  // Proceed to cart, then billing
  // Enter valid first name, last name, and address
  // Click 'Proceed to Payment'
  // Click 'Pay Now'
  // Verify success message with billing details and total is displayed
});
