import { Locator, Page } from "@playwright/test";


export class AddressPage {
  private readonly page: Page;
  readonly proceedButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.proceedButton = this.page.getByRole("button", { name: "Proceed to Payment" });
  }

  async goToPayment() {
    await this.proceedButton.click();
  }
}