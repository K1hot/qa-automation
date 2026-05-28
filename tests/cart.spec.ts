import { test, expect } from '../fixtures/baseTest';

test('user can add product to cart', async ({
  authenticatedPage,
  inventoryPage,
  cartPage
}) => {

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
 
  test('user can remove product from cart', async ({
  authenticatedPage,
  inventoryPage,
  cartPage
}) => {

  await inventoryPage.addFirstProductToCart();

  await inventoryPage.openCart();

  await cartPage.removeProduct();

  await expect(
    cartPage.productName
  ).toHaveCount(0);
  }
)

 