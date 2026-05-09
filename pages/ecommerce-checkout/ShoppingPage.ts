import { Locator, Page } from "@playwright/test";


export class ShoppingPage {
  private readonly page: Page;
  readonly productCards: Locator;

  constructor(page: Page) {
    this.page = page;
    this.productCards = this.page.locator(".MuiCard-root.w-60.h-80");
  }

  async goto() {
    await this.page.goto("/challenges/product-purchasing#challenge");
  }

  async addItemToCart(productName: string) {
    for (const card of (await this.productCards.all())) {
      const cardName = await card.getByRole("heading", { level: 6 }).innerText();
      if (cardName === productName) {
        await card.getByRole("button", { name: "Add to Cart" }).click();
        return;
      }
    }
    throw new Error("Failed to add item to cart: product not found");
  }
}