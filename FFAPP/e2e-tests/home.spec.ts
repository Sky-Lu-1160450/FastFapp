import { test, expect } from '@playwright/test';

// Test for the home page
test('home page loads correctly and displays title', async ({ page }) => {
  // Navigate to the home page of your app
  await page.goto('http://localhost:3000');

  // Verify that the title is as expected
  await expect(page).toHaveTitle(/FastApp/);


});
