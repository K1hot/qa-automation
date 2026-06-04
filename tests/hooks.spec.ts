import { test } from '@playwright/test';

    test.describe('Hooks demo', () => {

        test.beforeAll(async () => {
            console.log('beforeAll');
        });

        test.beforeEach(async () => {
            console.log('beforeEach');
        })

        test.afterEach(async ({}, testInfo) => {
            console.log(`afterEach for ${testInfo.title}`);
        })

        test.afterAll(async () => {
            console.log('AFTER ALL HOOK');
        })

        test('test 1', async () => {
            console.log('running test 1');
        })

        test('test 2', async () => {
            console.log('running test 2');
        });
    });

