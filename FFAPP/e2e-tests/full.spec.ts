import { test, expect } from '@playwright/test';

test('End-to-End Test for Registration, Login, and Edit Address', async ({ page }) => {
  // Step 1: Go to the localhost
  await page.goto('http://localhost:3000');

  // Step 2: Click the 'Visitor' button to go to the login page
  await page.click('text="Visitor"');

  // Verify that the page navigates to the login page
  await page.waitForURL('http://localhost:3000/login');
  await expect(page).toHaveURL(/\/login/);

  // Step 3: Click the 'Register' button (if it opens a modal or expands the form)
  await page.click('text="Register"');

  // Fill in the registration form and click the 'Register' button
  await page.fill('input[placeholder="Please enter the username"]', 'Zhou777');
  await page.fill('input[placeholder="Please enter password"]', 'Zhou123456');
  await page.fill('input[placeholder="What is your Nickname?"]', 'Test6Nickname');
  await page.click('text="Register"');

  // Verify that the page navigates back to the login page
  await page.waitForURL('http://localhost:3000/login');
  await expect(page).toHaveURL(/\/login/);

  // Verify that the login form elements are visible
  await expect(page.locator('input[name="username"]')).toBeVisible();
  await expect(page.locator('input[name="password"]')).toBeVisible();
  await expect(page.locator('button[type="submit"]')).toBeVisible();

  // Fill in the login form and submit it
  await page.fill('input[name="username"]', 'Zhou777');
  await page.fill('input[name="password"]', 'Zhou123456');
  await page.click('button[type="submit"]');

  // Verify that the user is redirected to the 'me' page
  await page.waitForURL('http://localhost:3000/me');
  await expect(page).toHaveURL(/\/me/);

   // Step 4: Click the 'Edit Address' span to toggle edit mode
   const toggleEditButton = page.locator('text="My address"'); // Adjust if your default text changes
   await expect(toggleEditButton).toBeVisible();
   await toggleEditButton.click();
 
   // Step 5: Verify that the input field for the new address is now visible
   const inputField = page.locator('input[placeholder="Enter new address"]');
   await expect(inputField).toBeVisible();
 
   // Step 6: Enter the new address and save it
   const newAddress = 'Heguang Xiaoqu jinggang';
   await inputField.fill(newAddress); // Fill the input field
   const saveButton = page.locator('text="Save"');
   await saveButton.click(); // Click the save button
 
   // Step 7: Verify that the updated address is displayed correctly
   const updatedAddressLocator = page.locator(`text="${newAddress}"`);
   await expect(updatedAddressLocator).toBeVisible();

   // Step 8: Navigate to the home page
  await page.click('text="Home"');
  await page.waitForURL('http://localhost:3000/home');
  await expect(page).toHaveURL(/\/home/);

  // Step 9: Select "Chinese Food" and click inside
  await page.click('text="Chinese Food"');
  await page.waitForURL(/\/shop\/2/);
  await expect(page).toHaveURL(/\/shop\/2/);

  
});
