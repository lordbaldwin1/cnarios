import { Locator, Page } from "@playwright/test";
import { PaymentPage } from "./PaymentPage";

export type AddressFormData = {
  firstName: string;
  lastName: string;
  address: string;
};

export class AddressPage {
  private readonly page: Page;
  readonly proceedButton: Locator;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly addressInput: Locator;

  constructor(page: Page) {
    this.page = page;
    this.proceedButton = this.page.getByRole("button", {
      name: "Proceed to Payment",
    });
    this.firstNameInput = this.page.getByLabel("First Name");
    this.lastNameInput = this.page.getByLabel("Last Name");
    this.addressInput = this.page.getByLabel("Address");
  }

  async goToPayment() {
    await this.proceedButton.click();
    return new PaymentPage(this.page);
  }

  async fillForm(formData: AddressFormData) {
    await this.firstNameInput.fill(formData.firstName);
    await this.lastNameInput.fill(formData.lastName);
    await this.addressInput.fill(formData.address);
  }
}
