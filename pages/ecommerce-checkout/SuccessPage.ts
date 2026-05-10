import { Locator, Page } from "@playwright/test";

export class SuccessPage {
  readonly successHeading: Locator;
  readonly billingFullName: Locator;
  readonly billingAddress: Locator;
  readonly orderSummaryLine: Locator;
  readonly totalPaid: Locator;
  readonly backToHomeButton: Locator;

  constructor(page: Page) {
    this.successHeading = page.getByRole("heading", {
      name: /Order Placed Successfully/,
    });
    const summaryBlock = this.successHeading.locator("..");
    this.billingFullName = summaryBlock.locator("p").nth(0);
    this.billingAddress = summaryBlock.locator("p").nth(1);
    this.orderSummaryLine = summaryBlock.locator("p").nth(2);
    this.totalPaid = summaryBlock.getByRole("heading", {
      level: 6,
      name: /Total Paid:/,
    });
    this.backToHomeButton = page.getByRole("button", { name: "Back to Home" });
  }
}
