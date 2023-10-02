import { test, expect } from '@playwright/test';
import { HomePage } from '../../pages/HomePage';

test.describe.configure({ mode: 'parallel' });
test.describe('Home Page', () => {
    let homePage: HomePage;
    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page);
        await homePage.goToHomePage();
        const hackButton = await homePage.letMeHackButton.isVisible();
        if (hackButton) {
            await homePage.letMeHackButton.click();
        }
    })

    test('has logo @E2E', async () => {
        await expect(homePage.logo).toBeVisible();
    });

});

