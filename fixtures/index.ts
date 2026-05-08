import { test as base } from "@playwright/test";
import { ButtonPage } from "../pages/ButtonPage";
import { FormPage } from "../pages/FormPage";
import { ProductListingPage } from "../pages/ProductListingPage";

export type Fixtures = {
  buttonPage: ButtonPage;
  formPage: FormPage;
  productListingPage: ProductListingPage;
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
  productListingPage: async ({ page }, use) => {
    const productListingPage = new ProductListingPage(page);
    await use(productListingPage);
  },
});

export { expect } from "@playwright/test";
