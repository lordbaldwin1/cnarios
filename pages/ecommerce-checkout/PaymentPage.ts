import { Locator, Page } from "@playwright/test";
import { SuccessPage } from "./SuccessPage";

export class PaymentPage {
  private readonly page: Page;
  readonly payButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.payButton = this.page.getByRole("button", { name: "Pay Now" });
  }

  async pay() {
    await this.payButton.click();
    return new SuccessPage(this.page);
  }
}