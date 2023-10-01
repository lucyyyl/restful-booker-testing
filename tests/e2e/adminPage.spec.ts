import { test, expect, BrowserContext, Page } from '@playwright/test';
import { AdminPage } from '../pages/AdminPage';
import { adminPassword, adminUsername } from '../helpers/envVars';

test.describe.configure({ mode: 'parallel' });
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
    })

    test('can login and logout', async () => {
        expect(adminPage.pageTitle).toBeVisible;
        await adminPage.userNameField.fill(adminUsername);
        await adminPage.passwordField.fill(adminPassword);
        await adminPage.submitCredentialsButton.click();
        expect(adminPage.logoutButton).toBeVisible;
        await adminPage.logoutButton.click();
        expect(adminPage.userNameField).toBeVisible;
    });
});




