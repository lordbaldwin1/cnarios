import { test as base } from "@playwright/test";
import { ButtonPage } from "../pages/ButtonPage";
import { FormPage } from "../pages/FormPage";

export type Fixtures = {
  buttonPage: ButtonPage;
  formPage: FormPage;
};

export const test = base.extend<Fixtures>({
  buttonPage: async ({ page }, use) => {
    const buttonPage = new ButtonPage(page);
    await use(buttonPage);
  },
  formPage: async ({ page }, use) => {
    const formPage = new FormPage(page);
    await use(formPage);
  },
});

export { expect } from "@playwright/test";
