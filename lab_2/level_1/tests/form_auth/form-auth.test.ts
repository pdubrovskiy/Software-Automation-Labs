import { TestSetup } from "../../test-setup";
import { By, until } from "selenium-webdriver";

class FormAuthTest extends TestSetup {
  private username: string = "tomsmith";
  private password: string = "SuperSecretPassword!";
  public async testSuccessfulLogin(): Promise<void> {
    await this.navigateTo("/login");

    const usernameInput = await this.driver.findElement(By.id("username"));
    const passwordInput = await this.driver.findElement(By.id("password"));
    const loginButton = await this.driver.findElement(
      By.css('button[type="submit"]')
    );

    await usernameInput.sendKeys(this.username);
    await passwordInput.sendKeys(this.password);
    await loginButton.click();

    const flashMessage = await this.driver.wait(
      until.elementLocated(By.id("flash")),
      5000
    );
    const messageText = await flashMessage.getText();
    if (!messageText.includes("You logged into a secure area!")) {
      throw new Error("Login was not successful");
    }
  }

  public async testFailedLogin(): Promise<void> {
    await this.navigateTo("/login");

    const usernameInput = await this.driver.findElement(By.id("username"));
    const passwordInput = await this.driver.findElement(By.id("password"));
    const loginButton = await this.driver.findElement(
      By.css('button[type="submit"]')
    );

    await usernameInput.sendKeys("invalid");
    await passwordInput.sendKeys("invalid");
    await loginButton.click();

    const flashMessage = await this.driver.wait(
      until.elementLocated(By.id("flash")),
      5000
    );
    const messageText = await flashMessage.getText();
    if (!messageText.includes("Your username is invalid!")) {
      throw new Error("Expected invalid username error message");
    }
  }

  public async testLogout(): Promise<void> {
    await this.testSuccessfulLogin();

    const logoutButton = await this.driver.findElement(
      By.css(".button.secondary")
    );
    await logoutButton.click();

    const loginForm = await this.driver.wait(
      until.elementLocated(By.id("login")),
      5000
    );
    if (!(await loginForm.isDisplayed())) {
      throw new Error("Should be redirected to login page after logout");
    }
  }
}

describe("Form Authentication Tests", () => {
  let test: FormAuthTest;

  beforeEach(async () => {
    test = new FormAuthTest();
    await test.setUp();
  });

  afterEach(async () => {
    await test.tearDown();
  });

  it("should login successfully with valid credentials", async () => {
    await test.testSuccessfulLogin();
  });

  it("should show error message with invalid credentials", async () => {
    await test.testFailedLogin();
  });

  it("should logout successfully", async () => {
    await test.testLogout();
  });
});
