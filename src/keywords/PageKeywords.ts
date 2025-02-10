import fs from "fs";
import path from "path";

import { Page, test, expect } from "@playwright/test";

import { CommonUtils } from "../utils/CommonUtils";

export class PageKeywords {
  private comn: CommonUtils;

  constructor() {
    this.comn = new CommonUtils();
  }

  /**
   * Navigates to a URL and verifies
   */
  async navigateToUrl(page: Page, url: string) {
    try {
      await test.step(`Navigate to and verify ${url}`, async () => {
        await page.goto(url);

        const currentUrl = page.url();
        expect(currentUrl).toContain(url);
      });
    } catch (error) {
      console.error(`Error navigating to ${url}:`, error);
      throw error;
    }
  }

  /**
   * Sets date value programmatically and verifies
   */
  async selectDate(page: Page, selector: string, value: string, label: string) {
    try {
      await test.step(`Set and verify date ${value} for ${label}`, async () => {
        const val = this.comn.dataValueHandler(value);
        await page.evaluate(
          ([sel, v]) => {
            const el = document.querySelector(sel) as HTMLInputElement;
            if (el) {
              el.value = v;
              el.dispatchEvent(new Event("input", { bubbles: true }));
              el.dispatchEvent(new Event("change", { bubbles: true }));
            }
          },
          [selector, val],
        );

        const actualValue = await page.$eval(
          selector,
          (el) => (el as HTMLInputElement).value,
        );
        expect(actualValue).toBe(val);
      });
    } catch (error) {
      console.error(`Error setting date for ${label}:`, error);
      throw error;
    }
  }

  /**
   * Optionally sets date value
   */
  async optionallySelectDate(
    page: Page,
    selector: string,
    value: string | undefined,
    label: string,
  ) {
    try {
      if (this.comn.isEmpty(value)) return;
      await this.selectDate(page, selector, value!, label);
    } catch (error) {
      console.error(`Error optionally setting date for ${label}:`, error);
      throw error;
    }
  }

  /**
   * Captures a full page or viewport screenshot and attaches it to the test report
   * @param page - The page object
   * @param screenshotName - Base name for the screenshot
   * @param fullPage - Whether to capture the full scrollable page
   */
  async capturePageScreenshot(
    page: Page,
    screenshotName: string,
    fullPage: boolean = true,
  ) {
    try {
      await test.step(`Capture ${fullPage ? "full" : "visible"} page screenshot: ${screenshotName}`, async () => {
        // Generate timestamp for unique filename
        const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
        const fileName = `${screenshotName}_${timestamp}.png`;

        // Take the screenshot
        const buffer = await page.screenshot({
          fullPage,
          timeout: 5000,
        });

        // Create screenshots directory if it doesn't exist
        const screenshotDir = path.join(process.cwd(), "screenshots", "pages");
        if (!fs.existsSync(screenshotDir)) {
          fs.mkdirSync(screenshotDir, { recursive: true });
        }

        // Save to file system
        const filePath = path.join(screenshotDir, fileName);
        fs.writeFileSync(filePath, buffer);

        // Attach to test report
        await test.info().attach(screenshotName, {
          body: buffer,
          contentType: "image/png",
        });
      });
    } catch (error) {
      console.error(
        `Error capturing page screenshot for ${screenshotName}:`,
        error,
      );
      throw error;
    }
  }

  /**
   * Captures a screenshot of a specific viewport area
   */
  async captureViewportScreenshot(
    page: Page,
    screenshotName: string,
    clip: { x: number; y: number; width: number; height: number },
  ) {
    try {
      await test.step(`Capture viewport screenshot: ${screenshotName}`, async () => {
        const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
        const fileName = `${screenshotName}_${timestamp}.png`;

        // Take the screenshot
        const buffer = await page.screenshot({
          clip,
          timeout: 5000,
        });

        // Create screenshots directory if it doesn't exist
        const screenshotDir = path.join(
          process.cwd(),
          "screenshots",
          "viewport",
        );
        if (!fs.existsSync(screenshotDir)) {
          fs.mkdirSync(screenshotDir, { recursive: true });
        }

        // Save to file system
        const filePath = path.join(screenshotDir, fileName);
        fs.writeFileSync(filePath, buffer);

        // Attach to test report
        await test.info().attach(screenshotName, {
          body: buffer,
          contentType: "image/png",
        });
      });
    } catch (error) {
      console.error(
        `Error capturing viewport screenshot for ${screenshotName}:`,
        error,
      );
      throw error;
    }
  }
}
