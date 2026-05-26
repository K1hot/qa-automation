import { Page, Locator } from '@playwright/test';

export class InventoryPage {
    readonly page: Page;
    readonly firstAddToCartButton: Locator;
    readonly cartBadge: Locator;
    readonly cartLink: Locator;
    readonly firstRemoveButton: Locator;

    constructor(page: Page) {
        this.page = page;
         
        this.firstAddToCartButton = 
        page.locator('button:has-text("Add to cart")').first();
        
        this.cartBadge =
        page.locator('.shopping_cart_badge');

        this.cartLink = page.locator('.shopping_cart_link');

        this.firstRemoveButton = page.locator('button:has-text("Remove")').first();
    }

    async addFirstProductToCart() {
        await this.firstAddToCartButton.click();
    }
    async openCart() {
        await this.cartLink.click();
    }
}

