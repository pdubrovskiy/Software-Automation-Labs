import { TestSetup } from "../../test-setup";
import { By, until } from "selenium-webdriver";

class BasicAuthTest extends TestSetup {
  private readonly username: string = "admin";
  private readonly password: string = "admin";

  public async testBasicAuth(): Promise<void> {
    await this.navigateTo(`/basic_auth`);
    const authUrl = `https://${this.username}:${this.password}@the-internet.herokuapp.com/basic_auth`;
    await this.driver.get(authUrl);

    const successMessage = await this.driver.wait(
      until.elementLocated(By.css(".example p")),
      5000
    );

    const messageText = await successMessage.getText();
    if (!messageText.includes("Congratulations")) {
      throw new Error("Basic auth failed");
    }
  }
}

describe("Basic Authentication Tests", () => {
  let test: BasicAuthTest;

  beforeEach(async () => {
    test = new BasicAuthTest();
    await test.setUp();
  });

  afterEach(async () => {
    await test.tearDown();
  });

  it("should successfully authenticate with valid credentials", async () => {
    await test.testBasicAuth();
  });
});
