import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test.beforeEach(async ({ page }) => {
  await page.goto('https://www.saucedemo.com');
});

test('user can login', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.login(
    'standard_user',
    'secret_sauce'
  );

  await expect(page).toHaveURL(/inventory/);

});

test('user cannot login with invalid credentials', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.login(
    'wrong_user',
    'wrong_password'
  );

  await expect(loginPage.errorMessage).toBeVisible();
});

test('user cannot login without password', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.login(
    'standard_user',
    ''
  );

  await expect(page.locator('[data-test="error"]')).toContainText('Password is required');

  await expect(page).not.toHaveURL(/inventory/);
});

test('user cannot login without username', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.login(
    '',
    'secret_sauce'
  )
  await expect(page.locator('[data-test="error"]')
  ).toContainText('Username is required');

  await expect(page).not.toHaveURL(/inventory/);
});

