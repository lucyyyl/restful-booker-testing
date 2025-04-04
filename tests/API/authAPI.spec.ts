import { test, expect } from '@playwright/test';
import { authLoginPostRequest, authLogoutRequest } from '../../helpers/APIBuilders';

test.describe.configure({ mode: 'parallel' });
test.describe('Auth API', () => {

    test('should login and logout with valid credentials @API', async ({ request }) => {
        const loginResponse = await authLoginPostRequest(request);

        expect((loginResponse).status(), 'Login POST request has 200 status code').toEqual(200);
        const headers = (loginResponse).headers();
        const cookies = headers['set-cookie']
        const cookie = cookies.split('=')[1].split(';')[0];

        const logoutResponse = await authLogoutRequest(request, cookie);
        expect(logoutResponse.status(), 'Logout POST request has 200 status code').toEqual(200);
    });

    test('should not log in with invalid credentials @API', async ({ request }) => {
        const loginResponse = await authLoginPostRequest(request, 'xxxx', 'zzzz');
        expect((loginResponse).status(), 'Login POST request has 403 error code').toEqual(403);
    });

});
