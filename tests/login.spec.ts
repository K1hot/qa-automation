import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('https://www.saucedemo.com');
});

test('user can login', async ({ page }) => {
  await page.fill('#user-name', 'standard_user');
  await page.fill('#password', 'secret_sauce');
  await page.click('#login-button');

  await expect(page.locator('.title')).toHaveText('Products');
  await expect(page).toHaveURL(/inventory/);

});

test('user cannot login with invalid credentials', async ({ page }) => {
  await page.fill('#user-name', 'wrong_user');
  await page.fill('#password', 'wrong_password');
  await page.click('#login-button');

  await expect(page.locator('[data-test="error"]')).toBeVisible();
});

test('user cannot login without password', async ({ page }) => {
  await page.fill('#user-name', 'standard_user');
  await page.click('#login-button');

  await expect(page.locator('[data-test="error"]')).toContainText('Password is required');

  await expect(page).not.toHaveURL(/inventory/);
});

test('user cannot login without username', async ({ page }) => {
  await page.fill('#password', 'secret_sauce');
  await page.click('#login-button');

  await expect(page.locator('[data-test="error"]')
  ).toContainText('Username is required');

  await expect(page).not.toHaveURL(/inventory/);
});

