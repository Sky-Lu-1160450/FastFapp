import { test, expect } from '@playwright/test';

test('login page should display correctly and allow user to log in', async ({ page }) => {
  // Navigate to the login page
  await page.goto('http://localhost:3000/login');

  // Verify that the login form elements are visible
  await expect(page.locator('input[name="username"]')).toBeVisible();
  await expect(page.locator('input[name="password"]')).toBeVisible();
  await expect(page.locator('button[type="submit"]')).toBeVisible();

  // Fill in the login form and submit it
  await page.fill('input[name="username"]', 'Libai1');
  await page.fill('input[name="password"]', 'Li123456');
  await page.click('button[type="submit"]');

  // Wait for navigation to the 'me' page (assuming it redirects after a successful login)
  await page.waitForURL('http://localhost:3000/me');

  // Verify that the user is redirected to the 'me' page
  await expect(page).toHaveURL(/\/me/);
  // Optionally, check for a welcome message or an element that confirms login success
  
});

// Test for login failure (optional)
test('login page should display an error message for incorrect login', async ({ page }) => {
  // Navigate to the login page
  await page.goto('http://localhost:3000/login');

  // Fill in the login form with incorrect credentials
  await page.fill('input[name="username"]', 'wronguser');
  await page.fill('input[name="password"]', 'wrongpassword');
  await page.click('button[type="submit"]');
  await page.pause();

  // Wait for and check for an error message in the UI
  // Replace '.error-message' with the actual selector that displays the error message in your UI
  await expect(page.locator('text=Please enter the correct username and password')).toBeVisible();
});
