import { expect, Locator, Page } from "@playwright/test";
import { CartPage } from "./CartPage";


export class HeaderComponent {
  private readonly page: Page;
  readonly header: Locator;
  readonly cartButton: Locator;
  readonly progressIcons: Locator;

  constructor(page: Page) {
    this.page = page;
    this.header = page.getByRole("heading", { level: 6, name: "My Shop" });
    this.cartButton = page.locator("header >> button");
    this.progressIcons = page.locator(".MuiStepLabel-iconContainer");
  }

  async goToCart() {
    await this.cartButton.click();
    await expect(this.progressIcons.nth(1)).toContainClass("Mui-active");
    return new CartPage(this.page);
  }

  async isPageActive(pageNumber: number) {
    const index = pageNumber - 1;

  }
}