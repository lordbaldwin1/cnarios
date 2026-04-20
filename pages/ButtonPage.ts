import { Locator, Page } from "@playwright/test";

export class ButtonPage {
  private readonly page: Page;
  private readonly enabledCards: Locator;

  readonly header: Locator;
  readonly tooltip: Locator;
  readonly cardList: Locator;

  constructor(page: Page) {
    this.page = page;
    this.header = this.page.getByRole("heading", { level: 2, name: "Suggestions for you" });
    this.enabledCards = this.page.locator(".MuiCard-root").filter({
      hasNot: this.page.getByRole("heading", { level: 6, name: "Unknown", exact: true })
    });
    this.cardList = this.page.locator(".MuiCard-root");
    this.tooltip = this.page.getByRole("tooltip");
  }

  async goto() {
    await this.page.goto("/concepts/button#try-it-yourself");
  }

  getEnabledCard() {
    const card = this.enabledCards.nth(0);
    const button = card.locator(".MuiCardContent-root").getByRole("button");
    const removeButton = card.getByLabel("Remove");
    const icon = button.locator("svg");
    return {
      button,
      icon,
      clickFollow: async () => await button.click(),
      hoverFollow: async () => await button.hover(),
      clickRemove: async () => await removeButton.click(),
    }
  }

  getCardByName(name: string) {
    return this.cardList.filter({
      hasText: name,
    });
  }

  async getSuggestionNames() {
    const res: string[] = [];
    for (const card of (await this.cardList.all())) {
      const title = await card.getByRole("heading").textContent();
      if (!title) {
        throw new Error("Test data error: card missing person name");
      }
      res.push(title);
    }
    return res;
  }

  async removeSuggestion(name: string) {
    const cardToRemove = this.getCardByName(name);
    await cardToRemove.getByLabel("Remove").click();
  }
}