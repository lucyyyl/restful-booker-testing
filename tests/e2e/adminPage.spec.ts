import { test, expect, BrowserContext } from '@playwright/test';
import { AdminPage } from '../../pages/AdminPage';
import { adminPassword, adminUsername } from '../../helpers/envVars';

test.describe('Admin Page', () => {
    let adminPageContext: BrowserContext,
        adminPage: AdminPage;

    test.beforeEach(async ({ browser }) => {

        adminPageContext = await browser.newContext();
        adminPage = new AdminPage(await adminPageContext.newPage());
        await adminPage.goToAdminPage();
        const adminPageHackButton = await adminPage.letMeHackButton.isVisible();
        if (adminPageHackButton) {
            await adminPage.letMeHackButton.click();
        }
    });

    test('can login and logout @E2E', async ({}) => {
        await expect(adminPage.pageTitle).toBeVisible();
        await adminPage.userNameField.fill(adminUsername);
        await adminPage.passwordField.fill(adminPassword);
        await adminPage.submitCredentialsButton.click();
        await expect(adminPage.logoutButton, 'Logout button is visible').toBeVisible();
        await adminPage.logoutButton.click();
        await expect(adminPage.userNameField, 'login username field is visible').toBeVisible();
    });
});




