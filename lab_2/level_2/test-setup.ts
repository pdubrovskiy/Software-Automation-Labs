import { WebDriver, Builder } from "selenium-webdriver";
import { Options } from "selenium-webdriver/chrome";

export class TestSetup {
  protected driver: WebDriver;
  protected readonly baseUrl = "https://www.sharelane.com/cgi-bin";

  constructor() {
    this.driver = null as unknown as WebDriver;
  }

  public async setUp(): Promise<void> {
    const options = new Options();
    options.addArguments("--start-maximized");

    this.driver = await new Builder()
      .forBrowser("chrome")
      .setChromeOptions(options)
      .build();
  }

  public async tearDown(): Promise<void> {
    if (this.driver) {
      await this.driver.quit();
    }
  }

  protected async navigateTo(path: string): Promise<void> {
    await this.driver.get(`${this.baseUrl}${path}`);
  }

  protected async handleError(message: string): Promise<void> {
    throw new Error(`Test failed: ${message}`);
  }
}
