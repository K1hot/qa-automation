import { Page, Locator } from '@playwright/test'

export class CartPage {
    readonly page: Page;
    readonly productName: Locator;
    readonly removeButton: Locator;

    constructor(page: Page) {
        this.page = page;

        this.productName = 
            page.locator('.inventory_item_name');

        this.removeButton = 
            page.getByRole('button', { name: 'Remove'}); 
    }
    async removeProduct() {
        await this.removeButton.click();
    }
}
