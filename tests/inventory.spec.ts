import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test.beforeEach(async ({ page }) => {
  await page.goto('https://www.saucedemo.com');

  const loginPage = new LoginPage(page);

  await loginPage.login('standard_user', 'secret_sauce' );
});

test('product title is visible', async ({ page }) => {
  await expect(page.locator('.title')).toHaveText('Products');
  });

test('cart icon is visible', async ({ page }) => {
await expect(page.locator('.shopping_cart_link')).toBeVisible();
});