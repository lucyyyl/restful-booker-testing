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
        await expect(homePage.hotelRoom, 'There is at least 1 room available to book').not.toHaveCount(0);
        const roomCount = await homePage.hotelRoom.count();
        await expect(homePage.bookRoomButton, `There should be ${roomCount} book room buttons`).toHaveCount(roomCount);
        await homePage.bookRoomButton.first().click();

        // confirm room form elements are visible
        await expect(homePage.calendar, 'Room booking calendar is visible').toBeVisible();
        await expect(homePage.roomFirstNameField, 'Room booking form first name field is visible').toBeVisible();
        await expect(homePage.roomLastNameField, 'Room booking form last name field is visible').toBeVisible();
        await expect(homePage.roomEmailField, 'Room booking form email field is visible').toBeVisible();
        await expect(homePage.roomPhoneField, 'Room booking form phone number field is visible').toBeVisible();
        await expect(homePage.roomBookButton, 'Room booking form book room button is visible').toBeVisible();

        // fill in room form
        await homePage.roomFirstNameField.fill('Smith');
        await homePage.roomLastNameField.fill('Smith');
        await homePage.roomEmailField.fill('jane@email.com');
        await homePage.roomPhoneField.fill('01189998819991197253')
        await homePage.roomBookButton.click()

        // confirm error is shown
        await expect(homePage.errorAlert, 'Room booking form error is shown').toBeVisible();
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

