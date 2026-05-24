import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('https://www.saucedemo.com');

  await page.fill('#user-name', 'standard_user');
  await page.fill('#password', 'secret_sauce');
  await page.click('#login-button');
});

test('product title is visible', async ({ page }) => {
  await expect(page.locator('.title')).toHaveText('Products');
  });

test('cart icon is visible', async ({ page }) => {
await expect(page.locator('.shopping_cart_link')).toBeVisible();
});