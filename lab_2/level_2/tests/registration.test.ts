import { afterEach, beforeEach, describe, expect, it } from "@jest/globals";
import { By, until, WebElement } from "selenium-webdriver";
import { ErrorMessage } from "../enums/error-message.enum";
import { ExpectedResult } from "../enums/expected-result.enum";
import { IRegistrationData } from "../interfaces/registration-data.interface";
import { TestSetup } from "../test-setup";

class RegistrationTest extends TestSetup {
  private testData: Array<IRegistrationData> = [
    {
      zipCode: "12345",
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
      password: "password123",
      confirmPassword: "password123",
      expectedResult: ExpectedResult.SUCCESS,
    },
    {
      zipCode: "1234",
      firstName: "Jane",
      lastName: "Doe",
      email: "jane.doe@example.com",
      password: "password123",
      confirmPassword: "password123",
      expectedResult: ExpectedResult.ERROR,
      errorMessage: "Oops, error on page. ZIP code should have 5 digits",
    },
    {
      zipCode: "12345",
      firstName: "",
      lastName: "Smith",
      email: "smith@example.com",
      password: "password123",
      confirmPassword: "password123",
      expectedResult: ExpectedResult.ERROR,
      errorMessage: "First name is required",
    },
    {
      zipCode: "12345",
      firstName: "Alice",
      lastName: "Smith",
      email: "invalid-email",
      password: "password123",
      confirmPassword: "password123",
      expectedResult: ExpectedResult.ERROR,
      errorMessage: "Email address is not valid",
    },
    {
      zipCode: "12345",
      firstName: "Bob",
      lastName: "Wilson",
      email: "bob.wilson@example.com",
      password: "pass123",
      confirmPassword: "pass124",
      expectedResult: ExpectedResult.ERROR,
      errorMessage: "Passwords don't match",
    },
  ];

  public async setupTest(): Promise<void> {
    await this.setUp();
    await this.navigateTo("/register.py");
  }

  private async waitForElement(
    locator: By,
    timeout: number = 10000
  ): Promise<WebElement> {
    try {
      const element = await this.driver.wait(
        until.elementLocated(locator),
        timeout
      );
      await this.driver.wait(until.elementIsVisible(element), timeout);
      return element;
    } catch (error) {
      throw new Error(`Element not found or not visible: ${locator}`);
    }
  }

  private async isElementPresent(locator: By): Promise<boolean> {
    try {
      await this.driver.findElement(locator);
      return true;
    } catch {
      return false;
    }
  }

  private async waitForErrorMessage(expectedError?: string): Promise<void> {
    try {
      // Wait for page to stabilize
      await this.driver.sleep(1000);

      // First try the standard error message locations
      const errorSelectors = [
        By.css(".error_message"),
        By.css("span.error_message"),
        By.css("[class*='error']"),
        By.css("span[style*='color: red']"),
        By.xpath("//span[contains(text(), 'error')]"),
        By.xpath("//span[contains(text(), 'Oops')]"),
        By.xpath("//p[contains(text(), 'error')]"),
        By.xpath("//p[contains(text(), 'Oops')]"),
        By.xpath("//td[contains(text(), 'error')]"),
        By.xpath("//td[contains(text(), 'Oops')]"),
      ];

      let errorElement: WebElement | null = null;
      let actualError: string = "";

      // Try each selector
      for (const selector of errorSelectors) {
        if (await this.isElementPresent(selector)) {
          errorElement = await this.driver.findElement(selector);
          actualError = await errorElement.getText();
          if (actualError) {
            // If we found an error message and we're not looking for a specific one, we're done
            if (!expectedError) break;

            // If we're looking for a specific message and this matches, we're done
            if (actualError.toLowerCase().includes(expectedError.toLowerCase()))
              break;
          }
        }
      }

      if (!errorElement || !actualError) {
        // If we still haven't found an error message, try getting all visible text
        const bodyText = await this.driver
          .findElement(By.css("body"))
          .getText();
        if (
          bodyText.toLowerCase().includes("error") ||
          bodyText.toLowerCase().includes("oops") ||
          bodyText.toLowerCase().includes("invalid")
        ) {
          actualError = bodyText;
        } else {
          throw new Error("Error message element not found");
        }
      }

      if (expectedError) {
        const normalizedActual = actualError.toLowerCase();
        const normalizedExpected = expectedError.toLowerCase();

        if (!normalizedActual.includes(normalizedExpected)) {
          throw new Error(
            `Expected error "${expectedError}" but got "${actualError}"`
          );
        }
      }
    } catch (e) {
      const error = e as Error;
      throw new Error(`Error message validation failed: ${error.message}`);
    }
  }

  public async testZipCode(
    zipCode: string,
    expectedResult: ExpectedResult,
    errorMessage?: string
  ): Promise<void> {
    await this.navigateTo("/register.py");

    // Wait for the page to load
    await this.driver.sleep(1000);

    const zipInput = await this.waitForElement(By.name("zip_code"));
    await zipInput.clear();
    await zipInput.sendKeys(zipCode);

    const continueButton = await this.waitForElement(
      By.css("[value='Continue']")
    );
    await continueButton.click();

    // Wait for the page to process
    await this.driver.sleep(1000);

    if (expectedResult === "error") {
      await this.waitForErrorMessage(errorMessage);
    } else {
      // Check if we're on the second page by looking for the registration form elements
      await this.waitForElement(By.name("first_name"));
      await this.waitForElement(By.name("email"));
      await this.waitForElement(By.name("password1"));
    }
  }

  // TC001: Successful User Registration
  public async testRegistrationForm(data: IRegistrationData): Promise<void> {
    if (data.expectedResult === ExpectedResult.SUCCESS) {
      await this.testZipCode(data.zipCode, ExpectedResult.SUCCESS);

      // Wait for form to be fully loaded
      await this.driver.sleep(1000);

      // Find all form elements based on the actual HTML structure
      const firstNameInput = await this.waitForElement(By.name("first_name"));
      const lastNameInput = await this.waitForElement(By.name("last_name"));
      const emailInput = await this.waitForElement(By.name("email"));
      const passwordInput = await this.waitForElement(By.name("password1"));
      const confirmPasswordInput = await this.waitForElement(
        By.name("password2")
      );

      // Clear all fields first
      await firstNameInput.clear();
      await lastNameInput.clear();
      await emailInput.clear();
      await passwordInput.clear();
      await confirmPasswordInput.clear();

      // Fill in the form
      await firstNameInput.sendKeys(data.firstName);
      await lastNameInput.sendKeys(data.lastName);
      await emailInput.sendKeys(data.email);
      await passwordInput.sendKeys(data.password);
      await confirmPasswordInput.sendKeys(data.confirmPassword);

      // Submit the form using the Register button
      const registerButton = await this.waitForElement(
        By.css("[value='Register']")
      );
      await registerButton.click();

      // Wait for registration to process
      await this.driver.sleep(1000);

      try {
        // Look for success message in various places
        const successSelectors = [
          By.css(".confirmation_message"),
          By.xpath("//p[contains(text(), 'Account is created')]"),
          By.xpath("//td[contains(text(), 'Account is created')]"),
        ];

        let successFound = false;
        for (const selector of successSelectors) {
          try {
            const element = await this.driver.findElement(selector);
            const text = await element.getText();
            if (text.includes("Account is created")) {
              successFound = true;
              break;
            }
          } catch {
            continue;
          }
        }

        if (!successFound) {
          await this.handleError("Registration was not successful");
        }
      } catch (error) {
        await this.handleError("Success message not found");
      }
    } else {
      await this.testZipCode(
        data.zipCode,
        ExpectedResult.ERROR,
        data.errorMessage
      );
    }
  }

  // TC004: Valid ZIP Code Navigation
  public async testValidZipCode(): Promise<void> {
    const zipCodeField = await this.driver.findElement(By.name("zip_code"));
    await zipCodeField.sendKeys("12345");
    await this.driver.findElement(By.css("input[value='Continue']")).click();

    const registerButton = await this.driver.findElement(
      By.css("input[value='Register']")
    );
    const isDisplayed = await registerButton.isDisplayed();
    expect(isDisplayed).toBe(true);
  }

  // TC002: Empty ZIP Code Validation
  public async testEmptyZipCode(): Promise<void> {
    await this.driver.findElement(By.css("input[value='Continue']")).click();

    const errorMessage = await this.driver.findElement(
      By.className("error_message")
    );
    const isDisplayed = await errorMessage.isDisplayed();
    const text = await errorMessage.getText();

    expect(isDisplayed).toBe(true);
    expect(text).toBe(ErrorMessage.ZIP_CODE_ERROR);
  }

  // TC003: Invalid ZIP Code - Too Long
  public async testInvalidZipCode(): Promise<void> {
    const zipCodeField = await this.driver.findElement(By.name("zip_code"));
    await zipCodeField.sendKeys("123456");
    await this.driver.findElement(By.css("input[value='Continue']")).click();

    const errorMessage = await this.driver.findElement(
      By.className("error_message")
    );
    const isDisplayed = await errorMessage.isDisplayed();

    expect(isDisplayed).toBe(true);
  }

  // TC001: Successful User Registration
  public async testValidRegistration(): Promise<void> {
    await this.navigateTo("/register.py?page=1&zip_code=12345");

    await this.driver.findElement(By.name("first_name")).sendKeys("test");
    await this.driver.findElement(By.name("last_name")).sendKeys("test");
    await this.driver.findElement(By.name("email")).sendKeys("test@test.test");
    await this.driver.findElement(By.name("password1")).sendKeys("12345");
    await this.driver.findElement(By.name("password2")).sendKeys("12345");
    await this.driver.findElement(By.css("input[value='Register']")).click();

    const confirmationMessage = await this.driver.findElement(
      By.className("confirmation_message")
    );
    const isDisplayed = await confirmationMessage.isDisplayed();

    expect(isDisplayed).toBe(true);
  }

  // TC005: Empty Registration Form Submission
  public async testEmptyRegistration(): Promise<void> {
    await this.navigateTo("/register.py?page=1&zip_code=12345");
    await this.driver.findElement(By.css("input[value='Register']")).click();

    const errorMessage = await this.driver.findElement(
      By.className("error_message")
    );
    const isDisplayed = await errorMessage.isDisplayed();
    const text = await errorMessage.getText();

    expect(isDisplayed).toBe(true);
    expect(text).toBe(ErrorMessage.USER_INFO_ERROR);
  }

  // TC006: Invalid Email Format
  public async testInvalidEmailFormat(): Promise<void> {
    await this.navigateTo("/register.py?page=1&zip_code=12345");

    await this.driver.findElement(By.name("first_name")).sendKeys("test");
    await this.driver.findElement(By.name("last_name")).sendKeys("test");
    await this.driver.findElement(By.name("email")).sendKeys("testtest.test"); // Invalid email without @
    await this.driver.findElement(By.name("password1")).sendKeys("12345");
    await this.driver.findElement(By.name("password2")).sendKeys("12345");
    await this.driver.findElement(By.css("input[value='Register']")).click();

    const errorMessage = await this.driver.findElement(
      By.className("error_message")
    );
    const isDisplayed = await errorMessage.isDisplayed();
    const text = await errorMessage.getText();

    expect(isDisplayed).toBe(true);
    expect(text).toBe(ErrorMessage.EMAIL_ERROR);
  }
}

describe("Registration Tests", () => {
  let test: RegistrationTest;

  beforeEach(async () => {
    test = new RegistrationTest();
    await test.setupTest();
  });

  afterEach(async () => {
    await test.tearDown();
  });

  // TC004: Valid ZIP Code Navigation
  it("should accept valid zip code", async () => {
    await test.testValidZipCode();
  });

  // TC002: Empty ZIP Code Validation
  it("should not register user with empty zip code", async () => {
    await test.testEmptyZipCode();
  });

  // TC003: Invalid ZIP Code - Too Long
  it("should not register user with invalid zip code", async () => {
    await test.testInvalidZipCode();
  });

  // TC001: Successful User Registration
  it("should register user with valid info", async () => {
    await test.testValidRegistration();
  });

  // TC005: Empty Registration Form Submission
  it("should not register user without info", async () => {
    await test.testEmptyRegistration();
  });

  // TC006: Invalid Email Format
  it("should not register user with invalid email format", async () => {
    await test.testInvalidEmailFormat();
  });

  // TC007, TC008, TC009, TC010
  it.each<[string, number]>([
    ["valid data", 0], // TC010: Complete Valid Registration Flow
    ["missing first name", 2], // TC007: Missing First Name
    ["invalid email", 3], // TC006: Invalid Email Format
    ["mismatched passwords", 4], // TC008: Password Mismatch
  ])(
    "should handle registration form - %s",
    async (_: string, index: number) => {
      await test.testRegistrationForm(test["testData"][index]);
    }
  );
});
