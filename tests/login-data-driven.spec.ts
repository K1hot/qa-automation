import { test, expect } from "@playwright/test";

const invalidUsers = [
  {
    name: 'invalid credentials',
    username: 'wrong_user',
    password: 'wrong_password',
    error: 'Username and password do not match any user in this service'
  },
  {
    name: 'empty username',
    username: '',
    password: 'secret_sauce',
    error: 'Username is required'
  },
  {
    name: 'empty password',
    username: 'standard_user',
    password: '',
    error: 'Password is required'
  }
];  

invalidUsers.forEach((user) => {

    test(`login fails for ${user.username}`, async ({ page }) => {

        await page.goto('https://www.saucedemo.com');
 
        await page.fill('#user-name', user.username);
        await page.fill('#password', user.password);

        await page.click('#login-button');

        await expect(
            page.locator('[data-test="error"]')
        ).toContainText(user.error);

    });
    
});