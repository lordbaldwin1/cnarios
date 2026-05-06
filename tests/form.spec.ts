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
});


