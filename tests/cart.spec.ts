import { test, expect } from '@playwright/test';
import { login } from '../utils/login';

test('user can add product to cart', async ({ page }) => {
  await page.goto('https://www.saucedemo.com');

  await login(page, 'standard_user', 'secret_sauce');

  const addButton = page.locator('button:has-text("Add to cart")').first();
  
  await addButton.click();

  await expect(
    page.locator('button:has-text("Remove")').first()
  ).toBeVisible();

  await page.locator('.shopping_cart_link').click();
  await expect(page.locator('.inventory_item_name')).toBeVisible();

  await expect(page.locator('.shopping_cart_badge')
).toHaveText('1');
  });

  

