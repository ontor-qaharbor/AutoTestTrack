import { test, expect } from '@playwright/test';

/**
 * Example test suite demonstrating AutoTestTrack capabilities
 * This is a sample test that you can use as a template for your own tests
 */

test.describe('AutoTestTrack - Example Tests', () => {
  
  test.beforeEach(async ({ page }) => {
    // Setup that runs before each test
    console.log('Setting up test environment...');
  });

  test('Example - Basic page navigation and title verification', async ({ page }) => {
    // Navigate to a public website for demonstration
    await page.goto('https://example.com');
    
    // Verify the page title
    await expect(page).toHaveTitle(/Example Domain/);
    
    // Verify page content
    await expect(page.locator('h1')).toContainText('Example Domain');
    
    // Verify that specific text is visible
    await expect(page.locator('body')).toContainText('This domain is for use in illustrative examples');
  });

  test('Example - Interactive elements testing', async ({ page }) => {
    // Navigate to a page with interactive elements
    await page.goto('https://httpbin.org/');
    
    // Verify the page loads successfully
    await expect(page).toHaveTitle(/httpbin.org/);
    
    // Check if the main heading is visible
    await expect(page.locator('h1')).toBeVisible();
    
    // Verify navigation links exist
    const navLinks = page.locator('nav a');
    await expect(navLinks.first()).toBeVisible();
  });

  test('Example - Form interaction demo', async ({ page }) => {
    // Navigate to httpbin forms page for demonstration
    await page.goto('https://httpbin.org/forms/post');
    
    // Fill out a form (if available)
    const customerNameField = page.locator('input[name="custname"]');
    if (await customerNameField.isVisible()) {
      await customerNameField.fill('Test User');
    }
    
    const emailField = page.locator('input[name="custemail"]');
    if (await emailField.isVisible()) {
      await emailField.fill('test@example.com');
    }
    
    // Verify form fields were filled
    if (await customerNameField.isVisible()) {
      await expect(customerNameField).toHaveValue('Test User');
    }
    
    if (await emailField.isVisible()) {
      await expect(emailField).toHaveValue('test@example.com');
    }
  });

  test('Example - Mobile viewport testing', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    
    // Navigate to a responsive website
    await page.goto('https://example.com');
    
    // Verify the page adapts to mobile view
    await expect(page).toHaveTitle(/Example Domain/);
    
    // Check that content is still accessible on mobile
    await expect(page.locator('h1')).toBeVisible();
  });

  test.skip('Example - Skipped test (template)', async ({ page }) => {
    // This test is skipped but shows the structure
    // Remove .skip to enable this test
    await page.goto('https://example.com');
    await expect(page).toHaveTitle(/Example/);
  });

  test.afterEach(async ({ page }, testInfo) => {
    // Cleanup that runs after each test
    console.log(`Test "${testInfo.title}" completed with status: ${testInfo.status}`);
    
    // Take screenshot on failure
    if (testInfo.status !== testInfo.expectedStatus) {
      const screenshotPath = `test-results/failure-${testInfo.title.replace(/\s+/g, '-')}-${Date.now()}.png`;
      await page.screenshot({ path: screenshotPath });
      console.log(`Screenshot saved: ${screenshotPath}`);
    }
  });
});

/**
 * Advanced example showing parameterized tests
 */
test.describe('AutoTestTrack - Parameterized Tests Example', () => {
  
  const testData = [
    { url: 'https://example.com', expectedTitle: 'Example Domain' },
    { url: 'https://httpbin.org', expectedTitle: 'httpbin.org' }
  ];

  testData.forEach(({ url, expectedTitle }) => {
    test(`Parameterized test for ${url}`, async ({ page }) => {
      await page.goto(url);
      await expect(page).toHaveTitle(new RegExp(expectedTitle, 'i'));
    });
  });
});

/**
 * Example of using test fixtures and custom setup
 */
test.describe('AutoTestTrack - Custom Setup Example', () => {
  
  test('Example with custom setup', async ({ page, browserName }) => {
    console.log(`Running test in ${browserName} browser`);
    
    // Custom setup based on browser
    if (browserName === 'webkit') {
      // Special setup for Safari
      await page.setExtraHTTPHeaders({
        'User-Agent': 'AutoTestTrack-Safari-Agent'
      });
    }
    
    await page.goto('https://example.com');
    await expect(page).toHaveTitle(/Example Domain/);
  });
});