import { test, expect } from '@playwright/test';
import { authAPIURL } from '../helpers/envVars';
import { authLoginPostRequest } from '../helpers/APIBuilders';

test.describe.configure({ mode: 'parallel' });
test.describe('Auth API', () => {

    test('should login and logout with valid credentials @API', async ({ request }) => {
        const loginResponse = await authLoginPostRequest(request);

        expect((loginResponse).status()).toEqual(200);
        const headers = (loginResponse).headers();
        const cookies = headers['set-cookie']
        const cookie = cookies.split('=')[1].split(';')[0];

        const logoutResponse = await request.post(`${authAPIURL}logout`, {
            data: {
                "token": cookie
            }
        })
        expect(logoutResponse.status()).toEqual(200);
    });
  
    test('should not log in with invalid credentials @API', async ({ request }) => {
        const loginResponse = await authLoginPostRequest(request, 'xxxx', 'zzzz');
        expect((loginResponse).status()).toEqual(403);
    });

});
