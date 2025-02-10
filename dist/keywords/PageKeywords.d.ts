import { Page } from "@playwright/test";
export declare class PageKeywords {
    private comn;
    constructor();
    /**
     * Navigates to a URL and verifies
     */
    navigateToUrl(page: Page, url: string): Promise<void>;
    /**
     * Sets date value programmatically and verifies
     */
    selectDate(page: Page, selector: string, value: string, label: string): Promise<void>;
    /**
     * Optionally sets date value
     */
    optionallySelectDate(page: Page, selector: string, value: string | undefined, label: string): Promise<void>;
    /**
     * Captures a full page or viewport screenshot and attaches it to the test report
     * @param page - The page object
     * @param screenshotName - Base name for the screenshot
     * @param fullPage - Whether to capture the full scrollable page
     */
    capturePageScreenshot(page: Page, screenshotName: string, fullPage?: boolean): Promise<void>;
    /**
     * Captures a screenshot of a specific viewport area
     */
    captureViewportScreenshot(page: Page, screenshotName: string, clip: {
        x: number;
        y: number;
        width: number;
        height: number;
    }): Promise<void>;
}
