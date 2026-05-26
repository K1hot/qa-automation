import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';

test.beforeEach(async ({ page }) => {
  await page.goto('https://www.saucedemo.com');
});

test('user can add product to cart', async ({ page }) => {

  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);
  
  await loginPage.login(
  'standard_user',
  'secret_sauce'
  );

  await inventoryPage.addFirstProductToCart();

  await expect(
  inventoryPage.firstRemoveButton
).toBeVisible();

  await expect(
    inventoryPage.cartBadge
  ).toHaveText('1');

  await inventoryPage.openCart();

  await expect(page.locator('.inventory_item_name')).toBeVisible();
});

  

 