// Импортируем базовые инструменты тестирования из библиотеки Playwright
import { test, expect } from '@playwright/test';

// Объявляем асинхронный тест. Из встроенного фикстурного объекта вытаскиваем { request } для работы с API
test('API login returns token', async ({ request }) => {

    // Отправляем асинхронный POST-запрос на эндпоинт авторизации и ждем ответ (await)
    const response = await request.post(
        'https://reqres.in/api/login',
        {
            // Добавляем заголовки, которые теперь требует сервер
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': 'free_user_3EfLqzFwqrMvqVztkGhToclf1B4' // <-- Сюда вставь скопированный ключ
             },
            // Передаем тело запроса (payload) в формате JSON с валидными кредами пользователя
            data: {
                email: 'eve.holt@reqres.in',
                password: 'cityslicka'
            }
        }
    );

    // Первая важная проверка: убеждаемся, что HTTP-статус ответа ровно 200 (ОК).
    // Если сервер упал (500) или данные не подошли (400/401), тест упадет уже здесь
    expect(response.status()).toBe(200);;

    // Дожидаемся, пока скачается тело ответа, и парсим его из формата JSON обратно в JS-объект
    const body = await response.json();

    // Выводим полученный объект в консоль терминала, чтобы визуально дебажить и видеть структуру ответа
    console.log(body);

    // Проверяем (Assertion), что в объекте ответа вообще существует свойство 'token'
    expect(body.token).toBeDefined();

    // Проверяем, что значение токена в ответе в точности совпадает со строкой, которую мы ожидаем
    expect(body.token).toEqual(
        'QpwL5tke4Pnpja7X4'
    );
});

test('API login fails without password', async ({ request }) => {

    const response = await request.post(
        'https://reqres.in/api/login',
        {
            // Добавляем заголовки, которые теперь требует сервер
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': 'free_user_3EfLqzFwqrMvqVztkGhToclf1B4' // <-- Сюда вставь скопированный ключ
             },
            // Передаем тело запроса (payload) в формате JSON с валидными кредами пользователя
            data: {
                email: 'eve.holt@reqres.in'
            }
        }
    );

    // Первая важная проверка: убеждаемся, что HTTP-статус ответа ровно 400 (NOT ОК).
    // Если сервер вернул (OK) тест упадет уже здесь
    expect(response.status()).toBe(400);

     // Дожидаемся, пока скачается тело ответа, и парсим его из формата JSON обратно в JS-объект
    const body = await response.json();

    // Выводим полученный объект в консоль терминала, чтобы визуально дебажить и видеть структуру ответа
    console.log(body);

    // Проверяем (Assertion), что в объекте ответа вообще существует свойство 'error'
    expect(body.error).toBeDefined();

    // Проверяем, что значение в ответе в точности совпадает со строкой, которую мы ожидаем
    expect(body.error).toEqual(
         'Missing password'
    );
});
 