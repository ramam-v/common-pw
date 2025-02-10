"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PageKeywords = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const test_1 = require("@playwright/test");
const CommonUtils_1 = require("../utils/CommonUtils");
class PageKeywords {
    constructor() {
        this.comn = new CommonUtils_1.CommonUtils();
    }
    /**
     * Navigates to a URL and verifies
     */
    async navigateToUrl(page, url) {
        try {
            await test_1.test.step(`Navigate to and verify ${url}`, async () => {
                await page.goto(url);
                const currentUrl = page.url();
                (0, test_1.expect)(currentUrl).toContain(url);
            });
        }
        catch (error) {
            console.error(`Error navigating to ${url}:`, error);
            throw error;
        }
    }
    /**
     * Sets date value programmatically and verifies
     */
    async selectDate(page, selector, value, label) {
        try {
            await test_1.test.step(`Set and verify date ${value} for ${label}`, async () => {
                const val = this.comn.dataValueHandler(value);
                await page.evaluate(([sel, v]) => {
                    const el = document.querySelector(sel);
                    if (el) {
                        el.value = v;
                        el.dispatchEvent(new Event("input", { bubbles: true }));
                        el.dispatchEvent(new Event("change", { bubbles: true }));
                    }
                }, [selector, val]);
                const actualValue = await page.$eval(selector, (el) => el.value);
                (0, test_1.expect)(actualValue).toBe(val);
            });
        }
        catch (error) {
            console.error(`Error setting date for ${label}:`, error);
            throw error;
        }
    }
    /**
     * Optionally sets date value
     */
    async optionallySelectDate(page, selector, value, label) {
        try {
            if (this.comn.isEmpty(value))
                return;
            await this.selectDate(page, selector, value, label);
        }
        catch (error) {
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
    async capturePageScreenshot(page, screenshotName, fullPage = true) {
        try {
            await test_1.test.step(`Capture ${fullPage ? "full" : "visible"} page screenshot: ${screenshotName}`, async () => {
                // Generate timestamp for unique filename
                const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
                const fileName = `${screenshotName}_${timestamp}.png`;
                // Take the screenshot
                const buffer = await page.screenshot({
                    fullPage,
                    timeout: 5000,
                });
                // Create screenshots directory if it doesn't exist
                const screenshotDir = path_1.default.join(process.cwd(), "screenshots", "pages");
                if (!fs_1.default.existsSync(screenshotDir)) {
                    fs_1.default.mkdirSync(screenshotDir, { recursive: true });
                }
                // Save to file system
                const filePath = path_1.default.join(screenshotDir, fileName);
                fs_1.default.writeFileSync(filePath, buffer);
                // Attach to test report
                await test_1.test.info().attach(screenshotName, {
                    body: buffer,
                    contentType: "image/png",
                });
            });
        }
        catch (error) {
            console.error(`Error capturing page screenshot for ${screenshotName}:`, error);
            throw error;
        }
    }
    /**
     * Captures a screenshot of a specific viewport area
     */
    async captureViewportScreenshot(page, screenshotName, clip) {
        try {
            await test_1.test.step(`Capture viewport screenshot: ${screenshotName}`, async () => {
                const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
                const fileName = `${screenshotName}_${timestamp}.png`;
                // Take the screenshot
                const buffer = await page.screenshot({
                    clip,
                    timeout: 5000,
                });
                // Create screenshots directory if it doesn't exist
                const screenshotDir = path_1.default.join(process.cwd(), "screenshots", "viewport");
                if (!fs_1.default.existsSync(screenshotDir)) {
                    fs_1.default.mkdirSync(screenshotDir, { recursive: true });
                }
                // Save to file system
                const filePath = path_1.default.join(screenshotDir, fileName);
                fs_1.default.writeFileSync(filePath, buffer);
                // Attach to test report
                await test_1.test.info().attach(screenshotName, {
                    body: buffer,
                    contentType: "image/png",
                });
            });
        }
        catch (error) {
            console.error(`Error capturing viewport screenshot for ${screenshotName}:`, error);
            throw error;
        }
    }
}
exports.PageKeywords = PageKeywords;
//# sourceMappingURL=PageKeywords.js.map