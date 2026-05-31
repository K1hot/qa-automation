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
  const firstUser = body[0];

    expect(body).toHaveProperty('id');
    expect(body).toHaveProperty('name');
    expect(body).toHaveProperty('username');
    expect(body).toHaveProperty('email');
    expect(body.address.city).toBe('Gwenborough');

    expect(body.id).toBe(1);
    expect(body.email).toContain('@');
});

test('API returns users with required fields', async ({ request }) => {

  const response = await request.get(
    'https://jsonplaceholder.typicode.com/users'
  );

  expect(response.status()).toBe(200);

  const body = await response.json();

  expect(body.length).toBeGreaterThan(0);

  for (const user of body) {

    expect(user).toHaveProperty('id');
    expect(user).toHaveProperty('name');
    expect(user).toHaveProperty('email');

    expect(user.name).toBeTruthy();
    expect(user.email).toContain('@');
  }
});

test('API user fields have correct types', async ({ request }) => {

  const response = await request.get(
    'https://jsonplaceholder.typicode.com/users/1'
  );

  expect(response.status()).toBe(200);

  const body = await response.json();

  expect(typeof body.id).toBe('number');

  expect(typeof body.name).toBe('string');

  expect(typeof body.email).toBe('string');
}); 

test('API filters comments by post id', async ({ request }) => {

    const response = await request.get(
    'https://jsonplaceholder.typicode.com/comments',
    {
      params: {
        postId: 1
      }
    }
  );

  expect(response.status()).toBe(200);

  const body = await response.json();

  expect(body.length).toBeGreaterThan(0);

  for (const comment of body) {
    expect(comment.postId).toBe(1);
  }
});