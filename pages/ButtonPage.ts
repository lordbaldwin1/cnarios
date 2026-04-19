import { Locator, Page } from "@playwright/test";

export class ButtonPage {
  private readonly page: Page;
  private readonly enabledCards: Locator;

  readonly header: Locator;
  readonly tooltip: Locator;

  constructor(page: Page) {
    this.page = page;
    this.header = this.page.getByRole("heading", { level: 2, name: "Suggestions for you" });
    this.enabledCards = this.page.locator(".MuiCard-root").filter({
      hasNot: this.page.getByRole("heading", { level: 6, name: "Unknown", exact: true })
    });
    this.tooltip = this.page.getByRole("tooltip");
  }

  async goto() {
    await this.page.goto("/concepts/button#try-it-yourself");
  }

  getEnabledCard() {
    const card = this.enabledCards.nth(0);
    const button = card.locator(".MuiCardContent-root").getByRole("button");
    const icon = button.locator("svg");
    return {
      button,
      icon,
      clickFollow: async () => await button.click(),
      hoverFollow: async () => await button.hover(),
    }
  }
}