import { TestSetup } from "../../../level_1/test-setup";
import { By } from "selenium-webdriver";

class MultipleWindowsTest extends TestSetup {
  public async testNewWindow(): Promise<void> {
    await this.navigateTo("/windows");

    const originalWindow = await this.driver.getWindowHandle();
    const newWindowLink = await this.driver.findElement(
      By.css('a[href="/windows/new"]')
    );
    await newWindowLink.click();

    await this.driver.wait(
      async () => (await this.driver.getAllWindowHandles()).length === 2,
      5000
    );

    const windows = await this.driver.getAllWindowHandles();
    const newWindow = windows.find((handle) => handle !== originalWindow);
    if (!newWindow) {
      throw new Error("New window was not opened");
    }

    await this.driver.switchTo().window(newWindow);

    const newWindowText = await this.driver.findElement(By.css("h3")).getText();
    if (newWindowText !== "New Window") {
      throw new Error("New window content is incorrect");
    }

    await this.driver.close();
    await this.driver.switchTo().window(originalWindow);

    const originalPageHeader = await this.driver
      .findElement(By.css("h3"))
      .getText();
    if (originalPageHeader !== "Opening a new window") {
      throw new Error("Failed to switch back to original window");
    }
  }

  public async testMultipleWindows(): Promise<void> {
    await this.navigateTo("/windows");

    const originalWindow = await this.driver.getWindowHandle();
    const newWindowLink = await this.driver.findElement(
      By.css('a[href="/windows/new"]')
    );
    await newWindowLink.click();
    await newWindowLink.click();

    await this.driver.wait(
      async () => (await this.driver.getAllWindowHandles()).length === 3,
      5000
    );

    const windows = await this.driver.getAllWindowHandles();
    if (windows.length !== 3) {
      throw new Error("Expected 3 windows to be open");
    }

    for (const window of windows) {
      if (window !== originalWindow) {
        await this.driver.switchTo().window(window);
        const windowText = await this.driver
          .findElement(By.css("h3"))
          .getText();
        if (windowText !== "New Window") {
          throw new Error("New window content is incorrect");
        }
        await this.driver.close();
      }
    }

    await this.driver.switchTo().window(originalWindow);
  }
}

describe("Multiple Windows Tests", () => {
  let test: MultipleWindowsTest;

  beforeEach(async () => {
    test = new MultipleWindowsTest();
    await test.setUp();
  });

  afterEach(async () => {
    await test.tearDown();
  });

  it("should handle new window", async () => {
    await test.testNewWindow();
  });

  it("should handle multiple windows", async () => {
    await test.testMultipleWindows();
  });
});
