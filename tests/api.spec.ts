import { test, expect, request } from '@playwright/test';

test( 'API returns user list', async ({ request }) => {

    
    const  response = await request.get(
        'https://jsonplaceholder.typicode.com/users'
    );;

    expect(response.status()).toBe(200);

    const body = await response.json();

    console.log(body);

    expect(body.length).toBeGreaterThan(0);
});

test('API user has correct fields', async ({ request}) => {

    const response = await request.get(
        'https://jsonplaceholder.typicode.com/users/1'
    );

    expect(response.status()).toBe(200);

    const body = await response.json();

    expect(body.id).toBe(1);

    expect(body.name).toBe('Leanne Graham');

    expect(body.email).toContain('@');
});

test ('API can create new user', async ({ request}) =>  {

    const response = await request.post(
        'https://jsonplaceholder.typicode.com/users',
        {
            data: {
                name: 'George',
                job: 'QA Automation Engineer'
            }
        }
    );
    expect(response.status()).toBe(201);

    const body = await response.json();

    console.log(body);
    expect(body.name).toBe('George');

    expect(body.job).toBe(
        'QA Automation Engineer'
    );
});

test('API request contains headers', async ({ request }) => {

    const response = await request.get(
        'https://jsonplaceholder.typicode.com/users',
        {
            headers: {
                Authorization: 'Bearer fake-token',
                Accept: 'application/json'
            }
        }
    );

    expect(response.status()).toBe(200);
});   

test('API returns 404 for non existing user', async ({ request }) => {

  const response = await request.get(
    'https://jsonplaceholder.typicode.com/users/999999'
  );

  expect(response.status()).toBe(404);
});

test('API returns single user', async ({ request }) => {
  const response = await request.get
  ('https://jsonplaceholder.typicode.com/users/1'
  );

  expect(response.status()).toBe(200);

  const body = await response.json();

  expect(body.id).toBe(1);
  expect(body.name).toBe('Bret');
  expect(body.email).toBe('Sincere@april.biz');
});