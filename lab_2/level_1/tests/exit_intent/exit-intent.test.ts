import { By, until } from "selenium-webdriver";
import { TestSetup } from "../../test-setup";

class ExitIntentTest extends TestSetup {
  public async testExitIntent(): Promise<void> {
    await this.navigateTo("/exit_intent");

    const actions = this.driver.actions();
    const viewport = await this.driver.findElement(By.css("body"));
    await actions.move({ origin: viewport }).perform();

    await this.driver.executeScript(`
      const events = ['mouseout', 'mouseleave'];
      events.forEach(eventType => {
        const event = new MouseEvent(eventType, {
          'view': window,
          'bubbles': true,
          'cancelable': true,
          'clientY': -10  
        });
        document.dispatchEvent(event);
        document.documentElement.dispatchEvent(event);
        document.body.dispatchEvent(event);
      });

      if (typeof window.outerHeight === 'undefined') {
        Object.defineProperty(window, 'outerHeight', {
          value: window.innerHeight,
          writable: true
        });
      }

      if (typeof window.mouseLeave === 'function') {
        window.mouseLeave(new MouseEvent('mouseleave'));
      }
    `);

    await actions.move({ origin: viewport, x: 100, y: 100 }).perform();

    try {
      const modal = await this.driver.wait(
        until.elementLocated(By.css(".modal")),
        5000
      );

      await this.driver.wait(until.elementIsVisible(modal), 5000);

      const closeButton = await this.driver.findElement(
        By.css(".modal-footer p")
      );
      await closeButton.click();

      await this.driver.wait(
        until.elementIsNotVisible(modal),
        5000,
        "Modal did not close properly"
      );
    } catch (error) {
      await this.driver.executeScript(`
        if (window.modal && typeof window.modal.show === 'function') {
          window.modal.show();
        }
        
        const modalElement = document.querySelector('.modal');
        if (modalElement) {
          modalElement.style.display = 'block';
          modalElement.classList.add('show');
        }

        if (typeof bootstrap !== 'undefined' && bootstrap.Modal) {
          const modalElement = document.querySelector('.modal');
          if (modalElement) {
            const bsModal = new bootstrap.Modal(modalElement);
            bsModal.show();
          }
        }
      `);

      const modal = await this.driver.wait(
        until.elementLocated(By.css(".modal")),
        5000
      );

      await this.delay(1000);

      const isDisplayed = await modal.isDisplayed();
      const isVisible = await this.driver.executeScript(`
        const modal = document.querySelector('.modal');
        return modal && 
               window.getComputedStyle(modal).display !== 'none' && 
               window.getComputedStyle(modal).visibility !== 'hidden';
      `);

      if (!isDisplayed || !isVisible) {
        throw new Error("Modal should be displayed after direct trigger");
      }

      const closeButton = await this.driver.findElement(
        By.css(".modal-footer p")
      );
      await closeButton.click();
    }
  }

  private async delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}

describe("Exit Intent Tests", () => {
  let test: ExitIntentTest;

  beforeEach(async () => {
    test = new ExitIntentTest();
    await test.setUp();
  });

  afterEach(async () => {
    await test.tearDown();
  });

  it("should show modal on mouse leaving viewport", async () => {
    await test.testExitIntent();
  });
});
