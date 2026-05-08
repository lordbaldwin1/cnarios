import { Locator, Page } from "@playwright/test";

export type CategoryCount = {
  [key: string]: number;
};

export class ProductListingPage {
  private readonly page: Page;
  readonly cards: Locator;
  readonly nextButton: Locator;
  readonly headerCounts: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cards = this.page.locator(".MuiCardContent-root");
    this.headerCounts = this.page.locator(".bg-white.border.rounded-lg");
    this.nextButton = this.page.getByRole("button", { name: "Next", exact: true });
  }

  async goto() {
    await this.page.goto("challenges/product-listing-pagination#challenge")
  }

  async getCardCategoryCount(count: CategoryCount) {
    for (const card of (await this.cards.all())) {
      const category = (await card.locator("p").innerText()).split(" ")[1].toUpperCase();
      count[category] = (count[category] || 0) + 1;
    }
  }

  async goNextPage() {
    await this.nextButton.click();
  }

  async collectAllCardCategoryCount(count: CategoryCount) {
    while (await this.nextButton.isEnabled()) {
      await this.getCardCategoryCount(count);
      await this.goNextPage();
    }
    await this.getCardCategoryCount(count);
  }

  async collectCategoryBannerCount(count: CategoryCount) {
    for (const card of (await this.headerCounts.all())) {
      const ptags = card.locator("p");
      const category = await ptags.nth(0).innerText();
      const cardCount = await ptags.nth(1).innerText();
      count[category] = Number.parseInt(cardCount);
    }
  }
}