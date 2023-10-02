import { test, expect, BrowserContext } from '@playwright/test';
import { HomePage } from '../../pages/HomePage';
import { AdminPage } from '../../pages/AdminPage';
import { adminPassword, adminUsername } from '../../helpers/envVars';

test.describe('Rooms', () => {
    let homePage: HomePage,
    homePageContext: BrowserContext,
    adminPage: AdminPage, 
    adminPageContext: BrowserContext;

    test.beforeEach(async ({ browser }) => {
        homePageContext = await browser.newContext();
        homePage = new HomePage(await homePageContext.newPage());
        await homePage.goToHomePage();
        const homePageHackButton = await homePage.letMeHackButton.isVisible();
        if (homePageHackButton) {
            await homePage.letMeHackButton.click();
        }

        adminPageContext = await browser.newContext();
        adminPage = new AdminPage(await adminPageContext.newPage());
        await adminPage.goToAdminPage();
        const adminPageHackButton = await adminPage.letMeHackButton.isVisible();
        if (adminPageHackButton) {
            await adminPage.letMeHackButton.click();
        }

    })

    test('has hotel room and booking form errors when incorrect data submitted @E2E', async () => {
        expect(homePage.hotelRoom).toBeVisible;
        await expect(homePage.hotelRoom).toHaveCount(1);
        expect(homePage.bookRoomButton).toBeVisible;
        await homePage.bookRoomButton.click();

        expect(homePage.calendar).toBeVisible;
        expect(homePage.roomFirstNameField).toBeVisible;
        expect(homePage.roomLastNameField).toBeVisible;
        expect(homePage.roomEmailField).toBeVisible;
        expect(homePage.roomPhoneField).toBeVisible;
        expect(homePage.roomBookButton).toBeVisible;

        await homePage.roomFirstNameField.fill('Smith');
        await homePage.roomLastNameField.fill('Smith');
        await homePage.roomEmailField.fill('jane@email.com');
        await homePage.roomPhoneField.fill('01189998819991197253')
        await homePage.roomBookButton.click();
        expect(homePage.roomErrorAlert).toBeVisible;
    });

    test('can add room and delete room @E2E', async () => {
        expect(adminPage.pageTitle).toBeVisible;
        await adminPage.userNameField.fill(adminUsername);
        await adminPage.passwordField.fill(adminPassword);
        await adminPage.submitCredentialsButton.click();
        expect(adminPage.logoutButton).toBeVisible;

        await adminPage.roomNameField.fill('102');
        await adminPage.roomTypeDropdown.selectOption('Double');
        await adminPage.roomAccessibilityDropdown.selectOption('true');
        await adminPage.roomPriceField.fill('150');
        await adminPage.wifiCheckbox.check();
        await adminPage.tvCheckbox.check();
        await adminPage.safeCheckbox.check();
        await adminPage.createRoomButton.click();

        await homePage.goToHomePage();
        expect(homePage.logo).toBeVisible;
        expect(homePage.hotelRoom).toBeVisible;
        await expect(homePage.hotelRoom).toHaveCount(2);

        await adminPage.goToAdminPage();
        expect(adminPage.deleteRoomButton).toBeVisible;
        await adminPage.deleteRoomButton.nth(1).click();
        await expect(adminPage.deleteRoomButton).toHaveCount(1);
    });

});

