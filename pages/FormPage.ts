import { Locator, Page } from "@playwright/test";

export type Event = "Frontend Conf 2025" | "Automation Summit" | "Design & UX Meetup";

export type FormData = {
  name: string;
  email: string;
  phone: string;
  event: Event;
  tickets: string;
};

export type FormField = "name" | "email" | "phone" | "event" | "tickets";

export class FormPage {
  private readonly page: Page;
  readonly nameInput: Locator;
  readonly emailInput: Locator;
  readonly phoneInput: Locator;
  readonly eventSelect: Locator;
  readonly ticketInput: Locator;
  readonly submitButton: Locator;
  readonly confirmButton: Locator;
  readonly confirmDialog: Locator;
  readonly ticketIdList: Locator;

  constructor(page: Page) {
    this.page = page;
    this.nameInput = this.page.getByRole("textbox", { name: "Full Name" });
    this.emailInput = this.page.getByTestId("input-email");
    this.phoneInput = this.page.getByTestId("input-phone");
    this.eventSelect = this.page.getByRole("combobox", {
      name: "Select Event",
    });
    this.ticketInput = this.page.getByRole("spinbutton", {
      name: "Number of Tickets",
    });
    this.submitButton = this.page.getByTestId("btn-submit");
    this.confirmButton = this.page.getByTestId("btn-confirm");
    this.confirmDialog = this.page.getByRole("dialog");
    this.ticketIdList =  this.page.getByTestId("ticket-id-item");
  }

  async goto() {
    await this.page.goto("concepts/form#try-it-yourself");
  }

  async fillName(name: string) {
    await this.nameInput.fill(name);
  }

  async fillEmail(email: string) {
    await this.emailInput.fill(email);
  }

  async fillPhone(phone: string) {
    await this.phoneInput.fill(phone);
  }

  async selectEvent(event: Event) {
    await this.eventSelect.click();
    const option = this.page.getByRole("option", { name: event });
    await option.click();
  }

  async fillTickets(tickets: string) {
    await this.ticketInput.fill(tickets);
  }

  async fillForm(data: FormData) {
    await this.fillName(data.name);
    await this.fillEmail(data.email);
    await this.fillPhone(data.phone);
    await this.selectEvent(data.event);
    await this.fillTickets(data.tickets);
    await this.ticketInput.blur();
  }

  async submitForm() {
    await this.submitButton.click();
  }

  async confirmSubmission() {
    await this.confirmButton.click();
  }

  async getFieldError(locator: Locator) {
    const describedBy = await locator.getAttribute("aria-describedby");
    if (!describedBy) {
      throw new Error("Expected locator to have aria-describedby");
    }

    return this.page.locator(`#${describedBy}`);
  }
}
