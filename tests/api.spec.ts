import { test, expect, request } from '@playwright/test';
import { User } from '../types/User';
import { Post } from '../types/Post';

test.describe('Users API', () => {

  test( 'API returns user list', async ({ request }) => {
 
    const response = await request.get(
      'https://jsonplaceholder.typicode.com/users'
    );

    expect(response.status()).toBe(200);

    const body: User[] = await response.json();

    console.log(body);

    expect(body.length).toBeGreaterThan(0);
  });

  test('API returns single user', async ({ request }) => {
    const response = await request.get
    ('https://jsonplaceholder.typicode.com/users/1'
    );

    expect(response.status()).toBe(200);

    const body: User = await response.json();

    expect(body.id).toBe(1);
    expect(body.name).toBeTruthy();
    expect(body.email).toContain('@');
  });

  test('API returns 404 for non existing user', async ({ request }) => {

    const response = await request.get(
      'https://jsonplaceholder.typicode.com/users/999999'
    );

    expect(response.status()).toBe(404);
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

  test('API user has correct fields', async ({ request}) => {

      const response = await request.get(
          'https://jsonplaceholder.typicode.com/users/1'
      );

      expect(response.status()).toBe(200);

      const body = await response.json();

      expect(body.id).toBe(1);

      expect(body.name).toBeTruthy();

      expect(body.email).toContain('@');
  });

  test('API user contains company and address', async ({ request }) => {

    const responce = await request.get(
      'https://jsonplaceholder.typicode.com/users/1'
    );

    expect(responce.status()).toBe(200);

    const body: User = await responce.json();

    expect(body.address.city).toBeTruthy();

    expect(body.company.name).toBeTruthy();

    expect(body.phone).toBeTruthy();
  });

  test('API can patch user name', async ({ request }) => {

  const responce = await request.patch(
    'https://jsonplaceholder.typicode.com/users/1',
    {
      data: {
        name: 'George'
      }
    }
  );
  
  expect(responce.status()).toBe(200);

  const body = await responce.json();
  expect(body.name).toBe('George');
});


});

test.describe('User mutations', () => {

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

test('API can update user', async ({ request }) => {

  const response = await request.put(
    'https://jsonplaceholder.typicode.com/users/1',
    {
      data: {
        name: 'George',
        email: 'george@test.com'
      }
    }
  );

  expect(response.status()).toBe(200);

  const body = await response.json();

  expect(body.name).toBe('George');
  expect(body.email).toBe('george@test.com');
});

test('API can patch the user name', async ({ request }) => {

  const response = await request.patch(
    'https://jsonplaceholder.typicode.com/users/1',
    {
      data: {
      "name": 'Alex'
      }
    }
);

expect(response.status()).toBe(200);

const body = await response.json();

expect(body.name).toBe('Alex');
});

test('API can delete user', async ({ request }) => {
  const response = await request.delete(
    'https://jsonplaceholder.typicode.com/users/1'
  );

  expect(response.status()).toBe(200);
});

});

test.describe('Posts API', () => {
  
  test('API returns post', async ({ request}) =>{
  const response = await request.get(
    'https://jsonplaceholder.typicode.com/posts/1'
  );

  expect(response.status()).toBe(200);

  const body: Post = await response.json();

  expect(body.id).toBe(1);
  expect(body.title).toBeTruthy();
  expect(body.body).toBeTruthy();
});

});

test.describe('Comments API', () => {

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

});

test.describe('Request configuration', () => {

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

});






