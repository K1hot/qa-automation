import { test } from '@playwright/test';

    test.describe('Hooks demo', () => {

        test.beforeAll(async () => {
            console.log('beforeALL');
        });

        test.beforeEach(async () => {
            console.log('beforeEach');
        })

        test.afterEach(async () => {
            console.log('afterEach');
        })

        test.afterAll(async () => {
            console.log('afterAll');
        })

        test('test 1', async () => {
            console.log('running test 1');
        })

        test('test 2', async () => {
            console.log('running test 2');
        });
    });

    