import { TestSetup } from "../../test-setup";
import { By, WebElement } from "selenium-webdriver";

class DropdownTest extends TestSetup {
  private async getDropdown(): Promise<WebElement> {
    return this.driver.findElement(By.id("dropdown"));
  }

  public async testDropdownSelection(): Promise<void> {
    await this.navigateTo("/dropdown");

    const dropdown = await this.getDropdown();

    await this.selectOption(dropdown, "1");
    await this.verifyOptionSelected("1");

    await this.selectOption(dropdown, "2");
    await this.verifyOptionSelected("2");
  }

  private async selectOption(
    dropdown: WebElement,
    value: string
  ): Promise<void> {
    await dropdown.click();
    const option = await this.driver.findElement(
      By.css(`option[value="${value}"]`)
    );
    await option.click();
  }

  private async verifyOptionSelected(value: string): Promise<void> {
    const selectedOption = await this.driver.findElement(
      By.css(`option[value="${value}"]`)
    );
    const isSelected = await selectedOption.isSelected();
    if (!isSelected) {
      throw new Error(`Option ${value} was not selected`);
    }
  }
}

describe("Dropdown Tests", () => {
  let test: DropdownTest;

  beforeEach(async () => {
    test = new DropdownTest();
    await test.setUp();
  });

  afterEach(async () => {
    await test.tearDown();
  });

  it("should be able to select different options from dropdown", async () => {
    await test.testDropdownSelection();
  });
});
