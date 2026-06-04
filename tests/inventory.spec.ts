// 1. Импортируем базовые инструменты для создания тестов (test) и проверок (expect)

import { test, expect } from '@playwright/test';

// 2. ГЛАВНАЯ МАГИЯ: Говорим Playwright, что для ВСЕХ тестов в этом файле
// нужно взять сохраненные куки и сессию из нашего JSON-файла.
// Браузер откроется уже в состоянии "авторизован", вводить логин и пароль не придется.

test.use({
  storageState: 'playwright/.auth/user.json'
});

// 3. Объявляем обычный асинхронный тест с понятным названием

test('authorized user can open inventory page', async ({ page }) => {
  
  // 4. Переходим СРАЗУ на защищенную страницу каталога товаров (inventory.html).
    // Благодаря 'storageState' сверху, сайт не выкинет нас на форму логина, а пустит внутрь

    await page.goto(
      'https://www.saucedemo.com/inventory.html'
    )

    // 5. Проверка (Assertion): Находим элемент с классом '.title' (заголовок страницы)
    // и убеждаемся, что внутри него написан текст 'Products'.
    // Если текст совпадает — тест успешно пройден!

    await expect(
      page.locator('.title')
    ).toHaveText('Products');
});

