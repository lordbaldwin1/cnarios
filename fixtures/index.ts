import { test as base } from "@playwright/test";
import { ButtonPage } from "../pages/ButtonPage";
import { FormPage } from "../pages/FormPage";
import { ProductListingPage } from "../pages/ProductListingPage";
import { ShoppingPage } from "../pages/ecommerce-checkout/ShoppingPage";
import { HeaderComponent } from "../pages/ecommerce-checkout/HeaderComponent";

export type Fixtures = {
  buttonPage: ButtonPage;
  formPage: FormPage;
  productListingPage: ProductListingPage;
  shoppingPage: ShoppingPage;
  headerComponent: HeaderComponent;
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
  shoppingPage: async ({ page }, use) => {
    const shoppingPage = new ShoppingPage(page);
    await use(shoppingPage);
  },
  headerComponent: async ({ page }, use) => {
    const headerComponent = new HeaderComponent(page);
    await use(headerComponent);
  }
});

export { expect } from "@playwright/test";
