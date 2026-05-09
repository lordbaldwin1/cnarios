import { Locator, Page } from "@playwright/test";

export type CategoryCount = {
  [key: string]: number;
};

type TopProduct = {
  titles: string[];
  rating: number;
};

export type CategoryTopRatings = Record<string, TopProduct | null>;

export class ProductListingPage {
  private readonly page: Page;
  readonly headerCards: Locator;
  readonly productCards: Locator;
  readonly navigationButtons: Locator;
  readonly nextButton: Locator;
  readonly prevButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.productCards = this.page.locator(".MuiCardContent-root");
    this.headerCards = this.page.locator(".bg-white.border.rounded-lg");
    this.nextButton = this.page.getByRole("button", {
      name: "Next",
      exact: true,
    });
    this.prevButton = this.page.getByRole("button", {
      name: "Prev",
      exact: true,
    });
    this.navigationButtons = this.page
      .getByRole("navigation", { name: "pagination navigation" })
      .locator("li > button");
  }

  async goto() {
    await this.page.goto("challenges/product-listing-pagination#challenge");
  }

  async getCardCategoryCount(count: CategoryCount) {
    for (const card of await this.productCards.all()) {
      const category = (await card.locator("p").innerText())
        .split(" ")[1]
        .toUpperCase();
      count[category] = (count[category] || 0) + 1;
    }
  }

  async goNextPage() {
    await this.nextButton.click();
  }

  async goPrevPage() {
    await this.prevButton.click();
  }

  async collectAllCardCategoryCount(count: CategoryCount) {
    while (await this.nextButton.isEnabled()) {
      await this.getCardCategoryCount(count);
      await this.goNextPage();
    }
    await this.getCardCategoryCount(count);
  }

  async collectCategoryBannerCount(count: CategoryCount) {
    for (const card of await this.headerCards.all()) {
      const ptags = card.locator("p");
      const category = await ptags.nth(0).innerText();
      const cardCount = await ptags.nth(1).innerText();
      count[category] = Number.parseInt(cardCount);
    }
  }

  async findProduct(productName: string) {
    let card: {
      title: string;
      category: string;
      price: string;
    } | null = null;
    while (await this.nextButton.isEnabled()) {
      card = await this.searchCards(productName);
      if (card) {
        return card;
      }
      await this.goNextPage();
    }
    card = await this.searchCards(productName);
    return card;
  }

  async searchCards(productName: string) {
    for (const card of await this.productCards.all()) {
      const headers = card.getByRole("heading", { level: 6 });
      const title = await headers.nth(0).innerText();

      if (title === productName) {
        return {
          title,
          category: await card.getByRole("paragraph").innerText(),
          price: await headers.nth(1).innerText(),
        };
      }
    }
    return null;
  }

  async setupTopCategories() {
    const ratings: CategoryTopRatings = {};
    for (const card of await this.headerCards.all()) {
      const category = (
        await card.getByRole("paragraph").nth(0).innerText()
      ).toUpperCase();
      ratings[category] = null;
    }
    return ratings;
  }

  async searchPageForTopRatings(ratings: CategoryTopRatings) {
    for (const card of await this.productCards.all()) {
      const title = await card
        .getByRole("heading", { level: 6 })
        .nth(0)
        .innerText();
      const category = (await card.getByRole("paragraph").innerText())
        .split(" ")[1]
        .toUpperCase();
      const stars = card.getByRole("img");

      const ratingText = await stars.getAttribute("aria-label");
      if (!ratingText) {
        throw new Error("aria-label missing from product rating");
      }
      const rating = Number(ratingText.split(" ")[0]);

      if (!ratings[category] || ratings[category].rating < rating) {
        ratings[category] = { titles: [title], rating };
      } else if (ratings[category].rating === rating) {
        const oldTitles = ratings[category].titles;
        ratings[category] = { titles: [...oldTitles, title], rating };
      }
    }
  }

  async findTopRatedProducts(ratings: CategoryTopRatings) {
    while (await this.nextButton.isEnabled()) {
      await this.searchPageForTopRatings(ratings);
      await this.goNextPage();
    }
    await this.searchPageForTopRatings(ratings);
  }

  async goToPage(page: number) {
    await this.navigationButtons.nth(page).click();
  }
}
