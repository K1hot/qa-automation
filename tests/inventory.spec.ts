import { test, expect } from '@playwright/test';
import { login } from '../utils/login';

test.beforeEach(async ({ page }) => {
  await page.goto('https://www.saucedemo.com');

  await login(page, 'standard_user', 'secret_sauce' );
});

test('product title is visible', async ({ page }) => {
  await expect(page.locator('.title')).toHaveText('Products');
  });

test('cart icon is visible', async ({ page }) => {
await expect(page.locator('.shopping_cart_link')).toBeVisible();
});