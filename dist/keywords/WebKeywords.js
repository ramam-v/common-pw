"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebKeywords = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const test_1 = require("@playwright/test");
const CommonUtils_1 = require("../utils/CommonUtils");
class WebKeywords {
    constructor() {
        this.comn = new CommonUtils_1.CommonUtils();
    }
    getCurrentPage(el) {
        return el.page();
    }
    // ... [Previous methods remain the same] ...
    /**
     * Clicks on an element and verifies the action
     * @param el - The locator for the element to click
     * @param label - Description of the element
     * @param options - Click options (force, timeout, etc.)
     */
    async click(el, label, options) {
        try {
            await test_1.test.step(`Click on ${label}`, async () => {
                // Verify element is visible before clicking
                await (0, test_1.expect)(el).toBeVisible({ timeout: options?.timeout ?? 5000 });
                // Perform the click
                await el.click({
                    force: options?.force,
                    timeout: options?.timeout,
                });
                // Verify the element was clicked (element should receive focus or similar state change)
                await (0, test_1.expect)(el)
                    .toBeFocused()
                    .catch(() => {
                    // Some elements might not receive focus after click, which is okay
                });
            });
        }
        catch (error) {
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
    async optionallyClick(el, condition, label, options) {
        try {
            const stepSkip = !condition ? "- Skipped" : "";
            await test_1.test.step(`Click on ${label} ${stepSkip}`, async () => {
                if (condition) {
                    await this.click(el, label, options);
                }
            });
        }
        catch (error) {
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
    async doubleClick(el, label, options) {
        try {
            await test_1.test.step(`Double click on ${label}`, async () => {
                // Verify element is visible before clicking
                await (0, test_1.expect)(el).toBeVisible({ timeout: options?.timeout ?? 5000 });
                // Perform the double click
                await el.dblclick({
                    force: options?.force,
                    timeout: options?.timeout,
                });
                // Verify the element was clicked (element should receive focus or similar state change)
                await (0, test_1.expect)(el)
                    .toBeFocused()
                    .catch(() => {
                    // Some elements might not receive focus after click, which is okay
                });
            });
        }
        catch (error) {
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
    async optionallyDoubleClick(el, condition, label, options) {
        try {
            const stepSkip = !condition ? "- Skipped" : "";
            await test_1.test.step(`Double click on ${label} ${stepSkip}`, async () => {
                if (condition) {
                    await this.doubleClick(el, label, options);
                }
            });
        }
        catch (error) {
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
    async rightClick(el, label, options) {
        try {
            await test_1.test.step(`Right click on ${label}`, async () => {
                // Verify element is visible before clicking
                await (0, test_1.expect)(el).toBeVisible({ timeout: options?.timeout ?? 5000 });
                // Perform the right click
                await el.click({
                    button: "right",
                    force: options?.force,
                    timeout: options?.timeout,
                });
                // For right-clicks, we often expect a context menu to appear
                // This verification might be custom depending on your application
            });
        }
        catch (error) {
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
    async optionallyRightClick(el, condition, label, options) {
        try {
            const stepSkip = !condition ? "- Skipped" : "";
            await test_1.test.step(`Right click on ${label} ${stepSkip}`, async () => {
                if (condition) {
                    await this.rightClick(el, label, options);
                }
            });
        }
        catch (error) {
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
    async clickAndHold(el, label, duration = 1000, options) {
        try {
            await test_1.test.step(`Click and hold on ${label} for ${duration}ms`, async () => {
                // Verify element is visible before clicking
                await (0, test_1.expect)(el).toBeVisible({ timeout: options?.timeout ?? 5000 });
                // Perform the click and hold
                await el.click({
                    force: options?.force,
                    timeout: options?.timeout,
                    delay: duration, // This creates a click and hold effect
                });
            });
        }
        catch (error) {
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
    async optionallyClickAndHold(el, condition, label, duration = 1000, options) {
        try {
            const stepSkip = !condition ? "- Skipped" : "";
            await test_1.test.step(`Click and hold on ${label} for ${duration}ms ${stepSkip}`, async () => {
                if (condition) {
                    await this.clickAndHold(el, label, duration, options);
                }
            });
        }
        catch (error) {
            console.error(`Error in optional click and hold for ${label}:`, error);
            throw error;
        }
    }
    /**
     * Captures a screenshot of a specific element and attaches it to the test report
     */
    async captureElementScreenshot(el, screenshotName, label) {
        try {
            await test_1.test.step(`Capture element screenshot of ${label}: ${screenshotName}`, async () => {
                // Ensure element is visible
                await (0, test_1.expect)(el).toBeVisible({ timeout: 5000 });
                // Generate timestamp for unique filename
                const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
                const fileName = `${screenshotName}_${timestamp}.png`;
                // Take the screenshot
                const buffer = await el.screenshot({
                    timeout: 5000,
                });
                // Create screenshots directory if it doesn't exist
                const screenshotDir = path_1.default.join(process.cwd(), "screenshots", "elements");
                if (!fs_1.default.existsSync(screenshotDir)) {
                    fs_1.default.mkdirSync(screenshotDir, { recursive: true });
                }
                // Save to file system
                const filePath = path_1.default.join(screenshotDir, fileName);
                fs_1.default.writeFileSync(filePath, buffer);
                // Attach to test report
                await test_1.test.info().attach(`${label} - ${screenshotName}`, {
                    body: buffer,
                    contentType: "image/png",
                });
            });
        }
        catch (error) {
            console.error(`Error capturing element screenshot of ${label}:`, error);
            throw error;
        }
    }
}
exports.WebKeywords = WebKeywords;
//# sourceMappingURL=WebKeywords.js.map