import { TestSetup } from "../../../level_1/test-setup";
import { By, until } from "selenium-webdriver";

class JQueryMenuTest extends TestSetup {
  private readonly waitTimeout: number = 5000;

  public async testMenuNavigation(): Promise<void> {
    await this.navigateTo("/jqueryui/menu");

    const actions = this.driver.actions();
    const menu = await this.driver.wait(
      until.elementLocated(By.css("#menu")),
      this.waitTimeout
    );
    await this.driver.wait(until.elementIsVisible(menu), this.waitTimeout);

    const enabledItem = await this.driver.wait(
      until.elementLocated(By.css("#ui-id-3")),
      this.waitTimeout
    );
    await this.driver.wait(
      until.elementIsVisible(enabledItem),
      this.waitTimeout
    );
    await actions.move({ origin: enabledItem }).perform();
    await this.driver.sleep(1000);

    const downloadsItem = await this.driver.wait(
      until.elementLocated(By.css("#ui-id-4")),
      this.waitTimeout
    );
    await this.driver.wait(
      until.elementIsVisible(downloadsItem),
      this.waitTimeout
    );
    await actions.move({ origin: downloadsItem }).perform();
    await this.driver.sleep(1000);

    const pdfItem = await this.driver.wait(
      until.elementLocated(By.css("#ui-id-5")),
      this.waitTimeout
    );
    await this.driver.wait(until.elementIsVisible(pdfItem), this.waitTimeout);
    await actions.move({ origin: pdfItem }).click().perform();
  }

  public async testDisabledItems(): Promise<void> {
    await this.navigateTo("/jqueryui/menu");

    const disabledItem = await this.driver.findElement(By.css("#ui-id-1"));
    const classes = await disabledItem.getAttribute("class");
    if (!classes.includes("ui-state-disabled")) {
      throw new Error("Menu item should be disabled");
    }

    await disabledItem.click();
    const currentUrl = await this.driver.getCurrentUrl();
    if (!currentUrl.includes("/jqueryui/menu")) {
      throw new Error("Disabled menu item should not be clickable");
    }
  }
}

describe("JQuery UI Menu Tests", () => {
  let test: JQueryMenuTest;

  beforeEach(async () => {
    test = new JQueryMenuTest();
    await test.setUp();
  });

  afterEach(async () => {
    await test.tearDown();
  });

  it("should navigate through menu items", async () => {
    await test.testMenuNavigation();
  });

  it("should handle disabled menu items correctly", async () => {
    await test.testDisabledItems();
  });
});
