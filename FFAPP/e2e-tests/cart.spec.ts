import { test, expect } from '@playwright/test';

test('Add item to cart', async ({ page }) => {
  // Step 1: Go to the shop page
  await page.goto('http://localhost:3000/shop/2');

  // Step 2: Locate the first product's "Add" button
  const firstProductAddButton = page.locator('.shop-cart-control .add').first();

  // Ensure the "Add" button is visible
  await expect(firstProductAddButton).toBeVisible();

  // Step 3: Click the "Add" button
  await firstProductAddButton.click();

  // Step 4: Verify the cart count increases
  const cartCount = page.locator('.shop-cart-control .count'); // Adjust this selector based on where the count appears
  await expect(cartCount).toHaveText('1'); // Verify the count updates to "1"

  // Step 4: Locate the "Minus" button and click it to remove the item
  const firstProductMinusButton = page.locator('.shop-cart-control .minus').first();
  await expect(firstProductMinusButton).toBeVisible(); // Ensure the "Minus" button is visible
  await firstProductMinusButton.click(); // Click the "Minus" button

  // Step 5: Verify the cart count disappears (item count becomes 0)
  await expect(cartCount).not.toBeVisible(); // Verify the count disappears

    // Add the item to the cart multiple times
    await firstProductAddButton.click();
    await firstProductAddButton.click();

    // Verify the count increases to 2
    await expect(cartCount).toHaveText('2');

    // Remove one item and verify count decreases
    await firstProductMinusButton.click();
    await expect(cartCount).toHaveText('1');


  
});
