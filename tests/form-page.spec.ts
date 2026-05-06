import { expect, test } from "../fixtures";
import { FormData } from "../pages/FormPage";

test.describe("form page tests", () => {
  test("verify successful form submission with all valid input data", async ({
    formPage,
  }) => {
    const data: FormData = {
      name: "John Does",
      email: "johndoes@gmail.com",
      phone: "5038882123",
      event: "Frontend Conf 2025",
      tickets: "2",
    };
    await formPage.goto();
    await formPage.fillForm(data);
    await Promise.all([
      formPage.submitForm(),
      expect(formPage.submitButton).toContainText("Submitting"),
    ]);
    await expect(formPage.confirmDialog).toBeVisible();
    await expect(formPage.ticketIdList).toHaveCount(2);
    const [ticket1, ticket2] = await formPage.ticketIdList.allTextContents();
    expect(ticket1).not.toBe(ticket2);
  });

  // Test Steps & Details
  // Description:
  // Verify form does not submit when required fields are missing

  // Steps to Execute:
  // Navigate to the Event Registration form page
  // Leave one or more fields empty
  // Try clicking the Register button
  // Verify Register button is disabled and form cannot be submitted

  test("verify submit form disabled with missing required fields", async ({
    formPage,
  }) => {
    const data: FormData = {
      name: "John Does",
      email: "",
      phone: "",
      event: "Frontend Conf 2025",
      tickets: "",
    };
    await formPage.goto();
    await formPage.fillForm(data);
    await expect(formPage.submitButton).toBeDisabled();
    await expect(
      await formPage.getFieldError(formPage.emailInput),
    ).toBeVisible();
    await expect(
      await formPage.getFieldError(formPage.phoneInput),
    ).toBeVisible();
    await expect(
      await formPage.getFieldError(formPage.ticketInput),
    ).toBeVisible();
  });

  test("verify error message is displayed when invalid email is entered", async ({
    formPage,
  }) => {
    const data: FormData = {
      name: "Alice Smith",
      email: "user@.com",
      phone: "1234567890",
      event: "Frontend Conf 2025",
      tickets: "1",
    };
    await formPage.goto();
    await formPage.fillForm(data);
    await expect(formPage.submitButton).toBeDisabled();
    await expect(await formPage.getFieldError(formPage.emailInput)).toHaveText(
      "Enter a valid email address",
    );
  });

  test("verify error message is displayed when phone number is less than 7 digits", async ({ formPage }) => {
    const data: FormData = {
      name: "Alice Smith",
      email: "user@test.com",
      phone: "123456",
      event: "Frontend Conf 2025",
      tickets: "1",
    };
    await formPage.goto();
    await formPage.fillForm(data);
    await expect(formPage.submitButton).toBeDisabled();
    await expect(await formPage.getFieldError(formPage.phoneInput)).toHaveText("Enter a valid phone (7-15 digits)");
  });
});
