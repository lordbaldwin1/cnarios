import { expect } from "@playwright/test";
import { test } from "../fixtures";

test.describe("Button Page tests", () => {
  test.beforeEach(async ({ buttonPage }) => {
    await buttonPage.goto();
  });
  
  test("BTN_001 Click Follow button when enabled", async ({ buttonPage }) => {
    const card = buttonPage.getEnabledCard();
    await expect(buttonPage.header).toContainText("Suggestions");

    await expect(card.icon).toHaveClass(/add-person-icon/);
    await expect(card.button).toHaveText("Follow");

    await card.clickFollow();

    await expect(card.icon).toHaveClass(/done-icon/);
    await expect(card.button).toHaveText("Following");
  });

  test("BTN_002 Tooltip visibility on hover", async ({ buttonPage }) => {
    const card = buttonPage.getEnabledCard();

    await card.hoverFollow();
    await expect(buttonPage.tooltip).toHaveText("Follow");
    await card.clickFollow();
    await expect(buttonPage.tooltip).toHaveText("Unfollow");
  });

  test("BTN_003 Follow button shows 'Processing..' text", async ({
    buttonPage,
  }) => {
    const card = buttonPage.getEnabledCard();

    await Promise.all([
      card.clickFollow(),
      expect(card.button).toHaveText("Processing..."),
    ]);
    await expect(card.button).toHaveText("Following");
  });

  test("BTN_004 Click Unfollow (toggle back)", async ({ buttonPage }) => {
    const card = buttonPage.getEnabledCard();

    await expect(card.button).toHaveText("Follow");
    await card.clickFollow();
    await expect(card.button).toHaveText("Following");
    await card.clickFollow();
    await expect(card.button).toHaveText("Follow");
  });

  test("BTN_005 Remove a suggestion card", async ({ buttonPage }) => {
    const startingSuggestions = [
      "Unknown",
      "Anjali Sharma",
      "Ravi Kumar",
      "Neha Verma",
      "Ram",
    ];
    const expectedAfterRemove = ["Unknown", "Ravi Kumar", "Neha Verma", "Ram"];

    expect(await buttonPage.getSuggestionNames()).toEqual(startingSuggestions);
    await buttonPage.removeSuggestion("Anjali Sharma");
    expect(await buttonPage.getSuggestionNames()).toEqual(expectedAfterRemove);
  });
});
