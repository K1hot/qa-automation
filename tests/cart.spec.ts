import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';

test.beforeEach(async ({ page }) => {
await page.goto('https://www.saucedemo.com');
});

test('user can add product to cart', async ({ page }) => {

  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);
  const cartPage = new CartPage(page);

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

  await expect(
    cartPage.productName
  ).toBeVisible();
});
 
  test('user can remove product from cart', async ({ page }) => {
    
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);
  const cartPage = new CartPage(page);

  await loginPage.login (
    'standard_user',
    'secret_sauce'
  );

  await inventoryPage.addFirstProductToCart();

  await inventoryPage.openCart();

  await expect(
    cartPage.productName).toBeVisible();

  await cartPage.removeProduct();

  await expect(
    cartPage.productName
  ).toHaveCount(0);
  }
)


 