import { Locator, Page } from "@playwright/test";
import { AddressPage } from "./AddressPage";

export class CartPage {
  private readonly page: Page;
  readonly productCards: Locator;
  readonly totalPrice: Locator;
  readonly proceedButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.productCards = this.page.locator(".MuiCard-root.shadow-md");
    this.totalPrice = this.page.getByRole("heading", { level: 6, name: "Total" });
    this.proceedButton = this.page.getByRole("button", { name: "Proceed to Address" });
  }

  getProductCardDetails(product: string) {
    const card = this.productCards.filter({ hasText: product });
    return {
      name: card.locator("p").first(),
      quantity: card.locator(".flex.items-center.space-x-2 > p"),
      price: card.locator(".font-semibold"),
    };
  }

  getProductCardPrice(product: string) {
    return this.productCards
      .filter({ hasText: product })
      .locator(".font-semibold");
  }

  async decreaseProductQuantity(product: string, increment: number = 1) {
    const card = this.productCards.filter({ hasText: product });
    const decrementButton = card.getByRole("button").first();
    for (let i = 0; i < increment; i++) {
      await decrementButton.click();
    }
  }

  async increaseProductQuantity(product: string, increment: number = 1) {
    const card = this.productCards.filter({ hasText: product });
    const increaseButton = card.getByRole("button").last();
    for (let i = 0; i < increment; i++) {
      await increaseButton.click();
    }
  }

  async goToAddress() {
    await this.proceedButton.click();
    return new AddressPage(this.page);
  }
}
