// 1. Импортируем инструменты тестирования. Переименовываем 'test' в 'setup',
// чтобы в отчётах этот шаг красиво группировался как подготовительный (глобальный сетап)

import { test as setup, expect } from '@playwright/test';

// Объявляем асинхронный сетап-блок с именем 'authenticate'.
// Из встроенного объекта Playwright мы вытаскиваем (деструктурируем) { page } — 
// это изолированная вкладка виртуального браузера, с которой мы и будем работать.

setup('authenticate', async ({ page }) => {

     await setup.step('Open login page', async () => {

    // 2. Открываем стартовую страницу Sauce Demo для ввода учётных данных
    
    await page.goto('https://www.saucedemo.com');

     });

    // 3. Находим поле логина и вводим имя пользователя 'standard_user'

    await setup.step('Fill login credentials', async () => {

         
         await page.locator('[data-test="username"]')
            .fill('standard_user');
    // 4. Находим поле пароля и вводим 'secret_sauce'

         await page.locator('[data-test="password"]')
            .fill('secret_sauce');

     });

    // 5. Кликаем по кнопке Login для отправки формы

    await setup.step('Click login button', async () => {

         await page.locator('[data-test="login-button"]')
            .click();

    });

    // 6. ПРОВЕРКА 1: Ждём, пока браузер сменит адрес на страницу каталога.
    // Это гарантирует, что нас в принципе пропустило дальше формы логина
    await setup.step('Verify successful login', async () => {

        await expect(page).toHaveURL(
         'https://www.saucedemo.com/inventory.html'
        );

    // 7. ПРОВЕРКА 2 (Важный доп. шаг): Убеждаемся, что на странице появился заголовок '.title'
    // с текстом 'Products'. Это заставляет Playwright дождаться отрисовки интерфейса каталога
        await expect(
            page.locator('.title')
        ).toHaveText('Products');

     });
    // 8. КРИТИЧЕСКИЙ СТОП-КРАН: Делаем паузу на 3 секунды (3000 мс).
    // Это нужно, чтобы скрипты Sauce Demo гарантированно успели записать сессионную куку 
    // в память браузера после редиректа, перед тем как мы её скопируем
    await page.waitForTimeout(3000);

    // 9. СОХРАНЕНИЕ СЕССИИ: Обращаемся к контексту браузера, достаём «созревшие» куки 
    // и локальное хранилище и сохраняем этот слепок в файл 'user.json' внутри скрытой папки.
    
    await setup.step('Save authentication state', async () => {
        await page.context().storageState({
            path: 'playwright/.auth/user.json'
        });
    });
    });