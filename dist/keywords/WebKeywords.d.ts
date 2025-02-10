import { Locator } from "@playwright/test";
export declare class WebKeywords {
    private comn;
    constructor();
    private getCurrentPage;
    /**
     * Clicks on an element and verifies the action
     * @param el - The locator for the element to click
     * @param label - Description of the element
     * @param options - Click options (force, timeout, etc.)
     */
    click(el: Locator, label: string, options?: {
        force?: boolean;
        timeout?: number;
    }): Promise<void>;
    /**
     * Optionally clicks on an element if a condition is met
     * @param el - The locator for the element to click
     * @param condition - Boolean condition determining if click should occur
     * @param label - Description of the element
     * @param options - Click options (force, timeout, etc.)
     */
    optionallyClick(el: Locator, condition: boolean | undefined, label: string, options?: {
        force?: boolean;
        timeout?: number;
    }): Promise<void>;
    /**
     * Double clicks on an element and verifies the action
     * @param el - The locator for the element to double click
     * @param label - Description of the element
     * @param options - Double click options (force, timeout, etc.)
     */
    doubleClick(el: Locator, label: string, options?: {
        force?: boolean;
        timeout?: number;
    }): Promise<void>;
    /**
     * Optionally double clicks on an element if a condition is met
     * @param el - The locator for the element to double click
     * @param condition - Boolean condition determining if double click should occur
     * @param label - Description of the element
     * @param options - Double click options (force, timeout, etc.)
     */
    optionallyDoubleClick(el: Locator, condition: boolean | undefined, label: string, options?: {
        force?: boolean;
        timeout?: number;
    }): Promise<void>;
    /**
     * Right clicks on an element and verifies the action
     * @param el - The locator for the element to right click
     * @param label - Description of the element
     * @param options - Click options (force, timeout, etc.)
     */
    rightClick(el: Locator, label: string, options?: {
        force?: boolean;
        timeout?: number;
    }): Promise<void>;
    /**
     * Optionally right clicks on an element if a condition is met
     * @param el - The locator for the element to right click
     * @param condition - Boolean condition determining if right click should occur
     * @param label - Description of the element
     * @param options - Click options (force, timeout, etc.)
     */
    optionallyRightClick(el: Locator, condition: boolean | undefined, label: string, options?: {
        force?: boolean;
        timeout?: number;
    }): Promise<void>;
    /**
     * Clicks and holds on an element for a specified duration
     * @param el - The locator for the element to click and hold
     * @param label - Description of the element
     * @param duration - Duration to hold the click in milliseconds
     * @param options - Click options (force, timeout, etc.)
     */
    clickAndHold(el: Locator, label: string, duration?: number, options?: {
        force?: boolean;
        timeout?: number;
    }): Promise<void>;
    /**
     * Optionally clicks and holds on an element if a condition is met
     * @param el - The locator for the element to click and hold
     * @param condition - Boolean condition determining if click and hold should occur
     * @param label - Description of the element
     * @param duration - Duration to hold the click in milliseconds
     * @param options - Click options (force, timeout, etc.)
     */
    optionallyClickAndHold(el: Locator, condition: boolean | undefined, label: string, duration?: number, options?: {
        force?: boolean;
        timeout?: number;
    }): Promise<void>;
    /**
     * Captures a screenshot of a specific element and attaches it to the test report
     */
    captureElementScreenshot(el: Locator, screenshotName: string, label: string): Promise<void>;
}
