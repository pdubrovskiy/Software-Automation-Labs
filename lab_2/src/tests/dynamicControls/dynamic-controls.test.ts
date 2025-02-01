import { TestSetup } from "../../../level_1/test-setup";
import { By, until } from "selenium-webdriver";

class DynamicControlsTest extends TestSetup {
  public async testCheckboxDynamicControl(): Promise<void> {
    await this.navigateTo("/dynamic_controls");

    const removeButton = await this.driver.findElement(
      By.css("#checkbox-example button")
    );
    await removeButton.click();
    await this.driver.wait(until.elementLocated(By.css("#message")), 5000);

    try {
      await this.driver.findElement(By.css("#checkbox"));
      throw new Error("Checkbox should not be present");
    } catch {}

    await removeButton.click();
    await this.driver.wait(until.elementLocated(By.css("#checkbox")), 5000);
  }

  public async testInputDynamicControl(): Promise<void> {
    await this.navigateTo("/dynamic_controls");

    const input = await this.driver.findElement(By.css("#input-example input"));
    const enableButton = await this.driver.findElement(
      By.css("#input-example button")
    );

    if (await input.isEnabled()) {
      throw new Error("Input should be disabled initially");
    }

    await enableButton.click();
    await this.driver.wait(until.elementIsEnabled(input), 5000);

    if (!(await input.isEnabled())) {
      throw new Error("Input should be enabled");
    }

    await enableButton.click();
    await this.driver.wait(until.elementIsDisabled(input), 5000);
  }
}

describe("Dynamic Controls Tests", () => {
  let test: DynamicControlsTest;

  beforeEach(async () => {
    test = new DynamicControlsTest();
    await test.setUp();
  });

  afterEach(async () => {
    await test.tearDown();
  });

  it("should handle dynamic checkbox controls", async () => {
    await test.testCheckboxDynamicControl();
  });

  it("should handle dynamic input controls", async () => {
    await test.testInputDynamicControl();
  });
});
