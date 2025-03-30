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

    });

    test('has hotel room and booking form errors when incorrect data submitted @E2E', async () => {
        await expect(homePage.hotelRoom).toBeVisible(); // need to account for when more than 1 room 
        await expect(homePage.bookRoomButton).toBeVisible();
        await homePage.bookRoomButton.click();

        // confirm room form elements are visible
        await expect(homePage.calendar).toBeVisible();
        await expect(homePage.roomFirstNameField).toBeVisible();
        await expect(homePage.roomLastNameField).toBeVisible();
        await expect(homePage.roomEmailField).toBeVisible();
        await expect(homePage.roomPhoneField).toBeVisible();
        await expect(homePage.roomBookButton).toBeVisible();

        // fill in room form
        await homePage.roomFirstNameField.fill('Smith');
        await homePage.roomLastNameField.fill('Smith');
        await homePage.roomEmailField.fill('jane@email.com');
        await homePage.roomPhoneField.fill('01189998819991197253')
        await homePage.roomBookButton.click()

        // confirm error is shown
        await expect(homePage.errorAlert).toBeVisible();
    });

    test('can add room and delete room @E2E', async () => {
        // log in to admin
        await expect(adminPage.pageTitle).toBeVisible();
        await adminPage.userNameField.fill(adminUsername);
        await adminPage.passwordField.fill(adminPassword);
        await adminPage.submitCredentialsButton.click();
        await expect(adminPage.logoutButton).toBeVisible();

        // add a room
        const originalRoomCount = await adminPage.page.getByTestId('roomlisting').count();
        const newRoomCount = originalRoomCount + 1;
        const roomElements = await adminPage.page.locator("[id^='roomName']").all();
        const lastRoomNumber = await adminPage.page.locator("[id^='roomName']").nth(roomElements.length - 2).textContent();
        const newRoomNumber = +lastRoomNumber! + 1;

        await adminPage.roomNameField.fill(newRoomNumber.toString()); 
        await adminPage.roomTypeDropdown.selectOption('Double');
        await adminPage.roomAccessibilityDropdown.selectOption('true');
        await adminPage.roomPriceField.fill('150');
        await adminPage.wifiCheckbox.check();
        await adminPage.tvCheckbox.check();
        await adminPage.safeCheckbox.check();
        await adminPage.createRoomButton.click();

        // confirm room visible on home page
        await homePage.goToHomePage();
        await expect(homePage.logo).toBeVisible();
        await expect(homePage.hotelRoom).toHaveCount(newRoomCount);

        // delete room on admin page
        await adminPage.goToAdminPage();
        await expect(adminPage.deleteRoomButton).toHaveCount(newRoomCount);
        await adminPage.deleteRoomButton.last().click();
        await expect(adminPage.deleteRoomButton).toHaveCount(originalRoomCount);
    });

});

