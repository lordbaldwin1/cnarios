import { expect, Locator, Page } from "@playwright/test";
import { CartPage } from "./CartPage";

export type CheckoutPages =
  | "Products"
  | "Cart"
  | "Address"
  | "Payment"
  | "Success";

export class HeaderComponent {
  private readonly page: Page;
  readonly header: Locator;
  readonly cartButton: Locator;
  readonly progressIcons: Locator;
  readonly cartCount: Locator;

  constructor(page: Page) {
    this.page = page;
    this.header = this.page.getByRole("heading", { level: 6, name: "My Shop" });
    this.cartButton = this.page.locator("header >> button");
    this.progressIcons = this.page.locator(".MuiStepLabel-iconContainer");
    this.cartCount = this.page.locator(".MuiBadge-badge");
  }

  async goToCart() {
    await this.cartButton.click();
    await expect(this.progressIcons.nth(1)).toContainClass("Mui-active");
    return new CartPage(this.page);
  }

  async isActivePage(page: CheckoutPages) {
    let pageNumber: number;
    switch (page) {
      case "Products":
        pageNumber = 0;
        break;
      case "Cart":
        pageNumber = 1;
        break;
      case "Address":
        pageNumber = 2;
        break;
      case "Payment":
        pageNumber = 3;
        break;
      case "Success":
        pageNumber = 4;
        break;
      default:
        throw new Error(`Unknown page: ${page}`);
    }

    await expect(this.progressIcons.nth(pageNumber)).toContainClass("Mui-active");
  }
}
