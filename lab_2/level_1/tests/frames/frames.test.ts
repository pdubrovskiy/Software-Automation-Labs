import { TestSetup } from "../../test-setup";
import { By, until } from "selenium-webdriver";

class FramesTest extends TestSetup {
  public async testIFrame(): Promise<void> {
    await this.navigateTo("/iframe");

    const iframe = await this.driver.findElement(By.css("#mce_0_ifr"));
    await this.driver.switchTo().frame(iframe);

    const editor = await this.driver.wait(
      until.elementLocated(By.id("tinymce")),
      5000
    );
    await this.driver.wait(until.elementIsVisible(editor), 5000);

    const testText = "Hello from automated test!";
    await this.driver.executeScript(
      "arguments[0].innerHTML = arguments[1]",
      editor,
      testText
    );

    const editorText = await editor.getText();
    if (editorText !== testText) {
      throw new Error("Editor text does not match input text");
    }

    await this.driver.switchTo().defaultContent();
  }

  public async testNestedFrames(): Promise<void> {
    await this.navigateTo("/nested_frames");

    const topFrame = await this.driver.findElement(By.name("frame-top"));
    await this.driver.switchTo().frame(topFrame);

    const leftFrame = await this.driver.findElement(By.name("frame-left"));
    await this.driver.switchTo().frame(leftFrame);

    const leftContent = await this.driver.findElement(By.css("body")).getText();
    if (leftContent !== "LEFT") {
      throw new Error("Left frame content is incorrect");
    }

    await this.driver.switchTo().parentFrame();

    const middleFrame = await this.driver.findElement(By.name("frame-middle"));
    await this.driver.switchTo().frame(middleFrame);

    const middleContent = await this.driver
      .findElement(By.css("body"))
      .getText();
    if (middleContent !== "MIDDLE") {
      throw new Error("Middle frame content is incorrect");
    }

    await this.driver.switchTo().defaultContent();
  }
}

describe("Frames Tests", () => {
  let test: FramesTest;

  beforeEach(async () => {
    test = new FramesTest();
    await test.setUp();
  });

  afterEach(async () => {
    await test.tearDown();
  });

  it("should handle iframe editor", async () => {
    await test.testIFrame();
  });

  it("should handle nested frames", async () => {
    await test.testNestedFrames();
  });
});
