import { test as base, Page, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';

type MyFixtures = {
  loginPage: LoginPage;
  inventoryPage: InventoryPage;
  cartPage: CartPage;
  authenticatedPage: Page;
};

export const test = base.extend<MyFixtures>({
  
  authenticatedPage: async ({
    page, 
    loginPage
  }, use) => {

  await page.goto('https://www.saucedemo.com');

  await loginPage.login(
    'standard_user',
    'secret_sauce'
  );

  await use(page);
  },

  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },

  inventoryPage: async ({ page }, use) => {
    await use(new InventoryPage(page));
  },

  cartPage: async ({ page }, use) => {
    await use(new CartPage(page));
  },

});

export { expect } from '@playwright/test'; 

