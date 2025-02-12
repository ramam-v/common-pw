import { test, expect } from '@playwright/test';
import { PageKeywords, WebKeywords, CommonUtils } from '../src';

test.describe('Playwright Website Tests', () => {
  let pageKeywords: PageKeywords;
  let webKeywords: WebKeywords;
  let commonUtils: CommonUtils

  // Initialize keywords before each test
  test.beforeEach(({ page }) => {
    pageKeywords = new PageKeywords();
    webKeywords = new WebKeywords();
    commonUtils = new CommonUtils();

  });

  test('verify page title', async ({ page }) => {

    // Use in test reporting
    await commonUtils.reportTestStart();

    // Navigate to the website using PageKeywords
    await pageKeywords.navigateToUrl(page, 'https://playwright.dev/');

    // Capture screenshot of the landing page
    await pageKeywords.capturePageScreenshot(page, 'playwright-landing');

    // Verify the page title
    await expect(page).toHaveTitle(/Playwright/);

    await commonUtils.reportTestEnd();
  });

  test('navigate to get started page', async ({ page }) => {
    // Use in test reporting
    await commonUtils.reportTestStart();
    // Navigate to the website using PageKeywords
    await pageKeywords.navigateToUrl(page, 'https://playwright.dev/');

    // Get the 'Get started' link and click it using WebKeywords
    const getStartedLink = page.getByRole('link', { name: 'Get started' });
    await webKeywords.click(getStartedLink, 'Get Started Link');

    // Get the Installation heading for verification
    const installationHeading = page.getByRole('heading', { name: 'Installation' });

    // Capture screenshot of the Installation page
    await pageKeywords.capturePageScreenshot(page, 'installation-page');

    // Capture screenshot of the Installation heading
    await webKeywords.captureElementScreenshot(
      installationHeading,
      'installation-heading',
      'Installation Heading'
    );

    // Verify the Installation heading is visible
    await expect(installationHeading).toBeVisible();
    await commonUtils.reportTestEnd();
  });
});