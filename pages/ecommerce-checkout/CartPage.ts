import { Locator, Page } from "@playwright/test";

export class CartPage {
  private readonly page: Page;
  readonly productCards: Locator;

  constructor(page: Page) {
    this.page = page;
    this.productCards = this.page.locator(".MuiCard-root.shadow-md");
  }

  getProductCardDetails(product: string) {
    const card = this.productCards.filter({ hasText: product });
    return {
      name: card.locator("p").first(),
      quantity: card.locator(".flex.items-center.space-x-2 > p"),
      price: card.locator(".font-semibold"),
    }
  }
}
