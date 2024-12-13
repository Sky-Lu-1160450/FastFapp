import { test, expect } from '@playwright/test';

test('Add items to cart, checkout, and place order', async ({ page }) => {
  // Step 1: Go to the shop page
  await page.goto('http://localhost:3000');
  await page.click('text="Visitor"');
  // Verify that the page navigates to the login page
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




//   await page.goto('http://localhost:3000/shop/2');

  // Step 2: Locate the first product's "Add" button
  const firstProductAddButton = page.locator('.shop-cart-control .add').first();

  // Ensure the "Add" button is visible
  await expect(firstProductAddButton).toBeVisible();

  // Step 3: Click the "Add" button 3 times
  for (let i = 0; i < 3; i++) {
    await firstProductAddButton.click();
  }

  // Step 4: Verify the cart count updates to 3
  const cartCount = page.locator('.shop-cart-control .count'); // Adjust selector based on the element structure
  await expect(cartCount).toHaveText('3'); // Ensure the count updates to 3

  // Step 5: Open the cart and verify the cart popup appears
  const cartContent = page.locator('.shop-cart__content'); // Selector for the cart icon/button
  await cartContent.click();
  const cartPopup = page.locator('.shop-cart__popup'); // Selector for the cart popup
  await expect(cartPopup).toBeVisible();

  // Step 6: Click the "Checkout" button
  const checkoutButton = page.locator('.checkout-btn button'); // Adjust selector for the checkout button
  await expect(checkoutButton).toBeVisible();
  await checkoutButton.click();

   // Step 7: Wait for the dialog to appear
   const confirmationDialog = page.locator('.van-dialog');
   await expect(confirmationDialog).toBeVisible();
 
   // Step 8: Locate and click the `确认` button
   const confirmButton = page.locator('.van-dialog__confirm', { hasText: '确认' }); // Adjust selector if necessary
   await expect(confirmButton).toBeVisible();
   await confirmButton.click();

  // Step 9: Verify the order was successfully placed and cart is cleared
  const successDialog = page.locator('.van-dialog .van-dialog__message'); // Check for success message
  await expect(successDialog).toHaveText('Your order has been placed successfully.');

   // Step 10: Click the 确认 button on the success dialog
   const secondConfirmButton = page.locator('.van-dialog__confirm', { hasText: '确认' });
   await expect(secondConfirmButton).toBeVisible();
   await secondConfirmButton.click();
 
//    // Step 11: Verify cart is empty
//    await expect(cartContent.locator('.cart-info__price--empty')).toBeVisible();
});
