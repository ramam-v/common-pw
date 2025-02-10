import fs from "fs";
import path from "path";

import { Locator, Page, test, expect } from "@playwright/test";

import { CommonUtils } from "../utils/CommonUtils";

export class WebKeywords {
  private comn: CommonUtils;

  constructor() {
    this.comn = new CommonUtils();
  }

  private getCurrentPage(el: Locator): Page {
    return el.page();
  }


  /**
   * Enters text into an element and verifies
   */
  async enterText(el: Locator, dataValue: string, label: string) {
    try {
      await test.step(`Enter and verify ${dataValue} into ${label}`, async () => {
        const val = this.comn.dataValueHandler(dataValue);
        await el.fill(val);

        const actualValue = await el.inputValue();
        expect(actualValue).toBe(val);
      });
    } catch (error) {
      console.error(`Error entering text into ${label}:`, error);
      throw error;
    }
  }

  /**
   * Optionally enters text into an element
   */
  async optionallyEnterText(el: Locator, dataValue: string, label: string) {
    try {
      const stepSkip = this.comn.isEmpty(dataValue) ? '- Skipped' : '';
      const val = this.comn.dataValueHandler(dataValue);

      await test.step(`Enter ${val} into ${label} ${stepSkip}`, async () => {
        if (!this.comn.isEmpty(dataValue)) {
          await el.fill(val);
          const actualValue = await el.inputValue();
          expect(actualValue).toBe(val);
        }
      });
    } catch (error) {
      console.error(`Error optionally entering text into ${label}:`, error);
      throw error;
    }
  }

  /**
   * Sets checkbox state and verifies
   */
  async setCheckbox(el: Locator, state: boolean | string, label: string) {
    try {
      const targetState = typeof state === 'string'
        ? state.toLowerCase() === 'on' || state.toLowerCase() === 'true'
        : state;

      await test.step(`Set and verify ${label} checkbox to ${targetState}`, async () => {
        if (targetState) {
          await el.check();
        } else {
          await el.uncheck();
        }

        const isChecked = await el.isChecked();
        expect(isChecked).toBe(targetState);
      });
    } catch (error) {
      console.error(`Error setting checkbox ${label}:`, error);
      throw error;
    }
  }

  /**
   * Optionally sets checkbox state
   */
  async optionallySetCheckbox(el: Locator, state: boolean | string | undefined, label: string) {
    try {
      if (this.comn.isEmpty(state)) return;
      await this.setCheckbox(el, state!, label);
    } catch (error) {
      console.error(`Error optionally setting checkbox ${label}:`, error);
      throw error;
    }
  }

  /**
   * Select list operations
   */
  async selectByValue(el: Locator, value: string, label: string) {
    try {
      await test.step(`Select and verify ${value} from ${label}`, async () => {
        const val = this.comn.dataValueHandler(value);
        await el.selectOption({ value: val });

        const selectedValue = await el.evaluate((e) => (e as HTMLSelectElement).value);
        expect(selectedValue).toBe(val);
      });
    } catch (error) {
      console.error(`Error selecting value ${value} from ${label}:`, error);
      throw error;
    }
  }

  async optionallySelectByValue(el: Locator, value: string | undefined, label: string) {
    try {
      if (this.comn.isEmpty(value)) return;
      await this.selectByValue(el, value!, label);
    } catch (error) {
      console.error(`Error optionally selecting value from ${label}:`, error);
      throw error;
    }
  }

  async selectByIndex(el: Locator, index: number, label: string) {
    try {
      await test.step(`Select and verify option at index ${index} from ${label}`, async () => {
        await el.selectOption({ index });

        const selectedIndex = await el.evaluate((e) => (e as HTMLSelectElement).selectedIndex);
        expect(selectedIndex).toBe(index);
      });
    } catch (error) {
      console.error(`Error selecting index ${index} from ${label}:`, error);
      throw error;
    }
  }

  async optionallySelectByIndex(el: Locator, index: number | undefined, label: string) {
    try {
      if (this.comn.isEmpty(index)) return;
      await this.selectByIndex(el, index!, label);
    } catch (error) {
      console.error(`Error optionally selecting index from ${label}:`, error);
      throw error;
    }
  }

  async selectByLabel(el: Locator, label: string, listLabel: string) {
    try {
      await test.step(`Select and verify option with label "${label}" from ${listLabel}`, async () => {
        const val = this.comn.dataValueHandler(label);
        await el.selectOption({ label: val });

        const selectedLabel = await el.evaluate((e) => {
          const select = e as HTMLSelectElement;
          return select.options[select.selectedIndex].text;
        });
        expect(selectedLabel).toBe(val);
      });
    } catch (error) {
      console.error(`Error selecting label ${label} from ${listLabel}:`, error);
      throw error;
    }
  }

  async optionallySelectByLabel(el: Locator, label: string | undefined, listLabel: string) {
    try {
      if (this.comn.isEmpty(label)) return;
      await this.selectByLabel(el, label!, listLabel);
    } catch (error) {
      console.error(`Error optionally selecting label from ${listLabel}:`, error);
      throw error;
    }
  }

  /**
   * Clicks on an element and verifies the action
   * @param el - The locator for the element to click
   * @param label - Description of the element
   * @param options - Click options (force, timeout, etc.)
   */
  async click(
    el: Locator,
    label: string,
    options?: { force?: boolean; timeout?: number },
  ) {
    try {
      await test.step(`Click on ${label}`, async () => {
        // Verify element is visible before clicking
        await expect(el).toBeVisible({ timeout: options?.timeout ?? 5000 });

        // Perform the click
        await el.click({
          force: options?.force,
          timeout: options?.timeout,
        });

        // Verify the element was clicked (element should receive focus or similar state change)
        await expect(el)
          .toBeFocused()
          .catch(() => {
            // Some elements might not receive focus after click, which is okay
          });
      });
    } catch (error) {
      console.error(`Error clicking ${label}:`, error);
      throw error;
    }
  }

  /**
   * Optionally clicks on an element if a condition is met
   * @param el - The locator for the element to click
   * @param condition - Boolean condition determining if click should occur
   * @param label - Description of the element
   * @param options - Click options (force, timeout, etc.)
   */
  async optionallyClick(
    el: Locator,
    condition: boolean | undefined,
    label: string,
    options?: { force?: boolean; timeout?: number },
  ) {
    try {
      const stepSkip = !condition ? "- Skipped" : "";

      await test.step(`Click on ${label} ${stepSkip}`, async () => {
        if (condition) {
          await this.click(el, label, options);
        }
      });
    } catch (error) {
      console.error(`Error in optional click for ${label}:`, error);
      throw error;
    }
  }

  /**
   * Double clicks on an element and verifies the action
   * @param el - The locator for the element to double click
   * @param label - Description of the element
   * @param options - Double click options (force, timeout, etc.)
   */
  async doubleClick(
    el: Locator,
    label: string,
    options?: { force?: boolean; timeout?: number },
  ) {
    try {
      await test.step(`Double click on ${label}`, async () => {
        // Verify element is visible before clicking
        await expect(el).toBeVisible({ timeout: options?.timeout ?? 5000 });

        // Perform the double click
        await el.dblclick({
          force: options?.force,
          timeout: options?.timeout,
        });

        // Verify the element was clicked (element should receive focus or similar state change)
        await expect(el)
          .toBeFocused()
          .catch(() => {
            // Some elements might not receive focus after click, which is okay
          });
      });
    } catch (error) {
      console.error(`Error double clicking ${label}:`, error);
      throw error;
    }
  }

  /**
   * Optionally double clicks on an element if a condition is met
   * @param el - The locator for the element to double click
   * @param condition - Boolean condition determining if double click should occur
   * @param label - Description of the element
   * @param options - Double click options (force, timeout, etc.)
   */
  async optionallyDoubleClick(
    el: Locator,
    condition: boolean | undefined,
    label: string,
    options?: { force?: boolean; timeout?: number },
  ) {
    try {
      const stepSkip = !condition ? "- Skipped" : "";

      await test.step(`Double click on ${label} ${stepSkip}`, async () => {
        if (condition) {
          await this.doubleClick(el, label, options);
        }
      });
    } catch (error) {
      console.error(`Error in optional double click for ${label}:`, error);
      throw error;
    }
  }

  /**
   * Right clicks on an element and verifies the action
   * @param el - The locator for the element to right click
   * @param label - Description of the element
   * @param options - Click options (force, timeout, etc.)
   */
  async rightClick(
    el: Locator,
    label: string,
    options?: { force?: boolean; timeout?: number },
  ) {
    try {
      await test.step(`Right click on ${label}`, async () => {
        // Verify element is visible before clicking
        await expect(el).toBeVisible({ timeout: options?.timeout ?? 5000 });

        // Perform the right click
        await el.click({
          button: "right",
          force: options?.force,
          timeout: options?.timeout,
        });

        // For right-clicks, we often expect a context menu to appear
        // This verification might be custom depending on your application
      });
    } catch (error) {
      console.error(`Error right clicking ${label}:`, error);
      throw error;
    }
  }

  /**
   * Optionally right clicks on an element if a condition is met
   * @param el - The locator for the element to right click
   * @param condition - Boolean condition determining if right click should occur
   * @param label - Description of the element
   * @param options - Click options (force, timeout, etc.)
   */
  async optionallyRightClick(
    el: Locator,
    condition: boolean | undefined,
    label: string,
    options?: { force?: boolean; timeout?: number },
  ) {
    try {
      const stepSkip = !condition ? "- Skipped" : "";

      await test.step(`Right click on ${label} ${stepSkip}`, async () => {
        if (condition) {
          await this.rightClick(el, label, options);
        }
      });
    } catch (error) {
      console.error(`Error in optional right click for ${label}:`, error);
      throw error;
    }
  }

  /**
   * Clicks and holds on an element for a specified duration
   * @param el - The locator for the element to click and hold
   * @param label - Description of the element
   * @param duration - Duration to hold the click in milliseconds
   * @param options - Click options (force, timeout, etc.)
   */
  async clickAndHold(
    el: Locator,
    label: string,
    duration: number = 1000,
    options?: { force?: boolean; timeout?: number },
  ) {
    try {
      await test.step(`Click and hold on ${label} for ${duration}ms`, async () => {
        // Verify element is visible before clicking
        await expect(el).toBeVisible({ timeout: options?.timeout ?? 5000 });

        // Perform the click and hold
        await el.click({
          force: options?.force,
          timeout: options?.timeout,
          delay: duration, // This creates a click and hold effect
        });
      });
    } catch (error) {
      console.error(`Error clicking and holding ${label}:`, error);
      throw error;
    }
  }

  /**
   * Optionally clicks and holds on an element if a condition is met
   * @param el - The locator for the element to click and hold
   * @param condition - Boolean condition determining if click and hold should occur
   * @param label - Description of the element
   * @param duration - Duration to hold the click in milliseconds
   * @param options - Click options (force, timeout, etc.)
   */
  async optionallyClickAndHold(
    el: Locator,
    condition: boolean | undefined,
    label: string,
    duration: number = 1000,
    options?: { force?: boolean; timeout?: number },
  ) {
    try {
      const stepSkip = !condition ? "- Skipped" : "";

      await test.step(`Click and hold on ${label} for ${duration}ms ${stepSkip}`, async () => {
        if (condition) {
          await this.clickAndHold(el, label, duration, options);
        }
      });
    } catch (error) {
      console.error(`Error in optional click and hold for ${label}:`, error);
      throw error;
    }
  }

  /**
   * Captures a screenshot of a specific element and attaches it to the test report
   */
  async captureElementScreenshot(
    el: Locator,
    screenshotName: string,
    label: string,
  ) {
    try {
      await test.step(`Capture element screenshot of ${label}: ${screenshotName}`, async () => {
        // Ensure element is visible
        await expect(el).toBeVisible({ timeout: 5000 });

        // Generate timestamp for unique filename
        const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
        const fileName = `${screenshotName}_${timestamp}.png`;

        // Take the screenshot
        const buffer = await el.screenshot({
          timeout: 5000,
        });

        // Create screenshots directory if it doesn't exist
        const screenshotDir = path.join(
          process.cwd(),
          "screenshots",
          "elements",
        );
        if (!fs.existsSync(screenshotDir)) {
          fs.mkdirSync(screenshotDir, { recursive: true });
        }

        // Save to file system
        const filePath = path.join(screenshotDir, fileName);
        fs.writeFileSync(filePath, buffer);

        // Attach to test report
        await test.info().attach(`${label} - ${screenshotName}`, {
          body: buffer,
          contentType: "image/png",
        });
      });
    } catch (error) {
      console.error(`Error capturing element screenshot of ${label}:`, error);
      throw error;
    }
  }
}
