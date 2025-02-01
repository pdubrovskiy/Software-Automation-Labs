import { TestSetup } from "../../../level_1/test-setup";
import { By } from "selenium-webdriver";

class JSAlertsTest extends TestSetup {
  public async testJSAlert(): Promise<void> {
    await this.navigateTo("/javascript_alerts");
    const alertButton = await this.driver.findElement(
      By.css('button[onclick="jsAlert()"]')
    );
    await alertButton.click();
    const alert = await this.driver.switchTo().alert();
    await alert.accept();
    const resultText = await this.driver.findElement(By.id("result")).getText();
    if (resultText !== "You successfully clicked an alert") {
      throw new Error("Alert was not handled correctly");
    }
  }

  public async testJSConfirm(): Promise<void> {
    await this.navigateTo("/javascript_alerts");
    const confirmButton = await this.driver.findElement(
      By.css('button[onclick="jsConfirm()"]')
    );
    await confirmButton.click();
    let alert = await this.driver.switchTo().alert();
    await alert.accept();
    let resultText = await this.driver.findElement(By.id("result")).getText();
    if (resultText !== "You clicked: Ok") {
      throw new Error("Confirm accept was not handled correctly");
    }
    await confirmButton.click();
    alert = await this.driver.switchTo().alert();
    await alert.dismiss();
    resultText = await this.driver.findElement(By.id("result")).getText();
    if (resultText !== "You clicked: Cancel") {
      throw new Error("Confirm dismiss was not handled correctly");
    }
  }

  public async testJSPrompt(): Promise<void> {
    await this.navigateTo("/javascript_alerts");
    const promptButton = await this.driver.findElement(
      By.css('button[onclick="jsPrompt()"]')
    );
    const testText = "Test input text";
    await promptButton.click();
    const alert = await this.driver.switchTo().alert();
    await alert.sendKeys(testText);
    await alert.accept();
    const resultText = await this.driver.findElement(By.id("result")).getText();
    if (resultText !== `You entered: ${testText}`) {
      throw new Error("Prompt input was not handled correctly");
    }
  }
}

describe("JavaScript Alerts Tests", () => {
  let test: JSAlertsTest;

  beforeEach(async () => {
    test = new JSAlertsTest();
    await test.setUp();
  });

  afterEach(async () => {
    await test.tearDown();
  });

  it("should handle JS alert", async () => {
    await test.testJSAlert();
  });

  it("should handle JS confirm dialog", async () => {
    await test.testJSConfirm();
  });

  it("should handle JS prompt", async () => {
    await test.testJSPrompt();
  });
});
