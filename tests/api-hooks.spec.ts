import { test, expect, request } from '@playwright/test';
import { User } from '../types/User';

test.describe('Users API with hooks', () => {

    let user: User;

    test.beforeAll(async ({ request }) => {

        const responce = await request.get(
            'https://jsonplaceholder.typicode.com/users/1'
        );

        expect(responce.status()).toBe(200);

        user = await responce.json();
    });
    
    test('user has email', async () => {

        expect(user.email).toContain('@');
    
    });

    test('user has company', async () => {
        expect(user.company.name).toBeTruthy();
    
    });

    test('user has city', async () => {
        expect(user.address.city).toBeTruthy();
    });

});



