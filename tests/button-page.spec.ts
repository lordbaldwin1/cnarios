import { test as base, expect } from "@playwright/test";
import { ButtonPage } from "../pages/ButtonPage";

type bpTestData = {
  startingSuggestions: string[];
  expectedSuggestions: string[];
};

type Fixture = {
  bp: ButtonPage;
  testData: bpTestData;
};

const testData: bpTestData = {
  startingSuggestions: [
    "Unknown",
    "Anjali Sharma",
    "Ravi Kumar",
    "Neha Verma",
    "Ram",
  ],
  expectedSuggestions: [
    "Unknown",
    "Ravi Kumar",
    "Neha Verma",
    "Ram",
  ],
};


const test = base.extend<Fixture>({
  bp: async ({ page }, use) => {
    const bp = new ButtonPage(page);
    await bp.goto();
    await use(bp);
  },
  testData: async ({}, use) => {
    await use(testData);
  }
});

test.describe("Button Page tests", () => {
  test("BTN_001 Click Follow button when enabled", async ({ bp }) => {
    const card = bp.getEnabledCard();
    await expect(bp.header).toContainText("Suggestions");

    await expect(card.icon).toHaveClass(/add-person-icon/);
    await expect(card.button).toHaveText("Follow");

    await card.clickFollow();

    await expect(card.icon).toHaveClass(/done-icon/);
    await expect(card.button).toHaveText("Following");
  });

  test("BTN_002 Tooltip visibility on hover", async ({ bp }) => {
    const card = bp.getEnabledCard();

    await card.hoverFollow();
    await expect(bp.tooltip).toHaveText("Follow");
    await card.clickFollow();
    await expect(bp.tooltip).toHaveText("Unfollow");
  });

  test("BTN_003 Follow button shows 'Processing..' text", async ({ bp }) => {
    const card = bp.getEnabledCard();

    await Promise.all([
      card.clickFollow(),
      expect(card.button).toHaveText("Processing..."),
    ])
    await expect(card.button).toHaveText("Following");
  });

  test("BTN_004 Click Unfollow (toggle back)", async ({ bp }) => {
    const card = bp.getEnabledCard();

    await expect(card.button).toHaveText("Follow");
    await card.clickFollow();
    await expect(card.button).toHaveText("Following");
    await card.clickFollow();
    await expect(card.button).toHaveText("Follow");
  });

  test("BTN_005 Remove a suggestion card", async ({ bp, testData }) => {
    expect(await bp.getSuggestionNames()).toEqual(testData.startingSuggestions);
    await bp.removeSuggestion("Anjali Sharma");
    expect(await bp.getSuggestionNames()).toEqual(testData.expectedSuggestions);
  });
});