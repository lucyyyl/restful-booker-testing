import { test, expect, BrowserContext } from '@playwright/test';
import { HomePage } from '../../pages/HomePage';
import { MessagesPage } from '../../pages/MessagesPage';
import { adminPassword, adminUsername } from '../../helpers/envVars'

test.describe.configure({ mode: 'parallel' });
test.describe('Messages', () => {
    let homePage: HomePage,
        homePageContext: BrowserContext,
        messagesPage: MessagesPage,
        messagesPageContext: BrowserContext;

    test.beforeEach(async ({ browser }) => {
        homePageContext = await browser.newContext();
        homePage = new HomePage(await homePageContext.newPage());
        await homePage.goToHomePage();
        const homePageHackButton = await homePage.letMeHackButton.isVisible();
        if (homePageHackButton) {
            await homePage.letMeHackButton.click();
        }
    })

    test('contact form shows error when blank form submitted @E2E', async () => {
        await expect(homePage.contactName).toBeVisible();
        await expect(homePage.contactEmail).toBeVisible();
        await expect(homePage.contactPhone).toBeVisible();
        await expect(homePage.contactSubject).toBeVisible();
        await expect(homePage.contactDescription).toBeVisible();
        await expect(homePage.contactSubmitButton).toBeVisible();

        await homePage.contactSubmitButton.click();
        await expect(homePage.errorAlert).toBeVisible();
    });

    test('contact form shows success message when form submitted, can see message in admin page @E2E', async ({ browser }) => {
        messagesPageContext = await browser.newContext();
        messagesPage = new MessagesPage(await messagesPageContext.newPage());
        await messagesPage.goToMessagePage();
        const adminPageHackButton = await messagesPage.letMeHackButton.isVisible();
        if (adminPageHackButton) {
            await messagesPage.letMeHackButton.click();
        }

        // log in to admin
        await expect(messagesPage.pageTitle).toBeVisible();
        await messagesPage.userNameField.fill(adminUsername);
        await messagesPage.passwordField.fill(adminPassword);
        await messagesPage.submitCredentialsButton.click();
        await expect(messagesPage.logoutButton).toBeVisible();
        await expect(messagesPage.page.locator('.messages')).toBeVisible();
        const originalMessagesCount = await messagesPage.messageRow.count();
        const newMessagesCount = originalMessagesCount + 1;

        // check contact form elements are there
        await expect(homePage.contactName).toBeVisible();
        await expect(homePage.contactEmail).toBeVisible();
        await expect(homePage.contactPhone).toBeVisible();
        await expect(homePage.contactSubject).toBeVisible();
        await expect(homePage.contactDescription).toBeVisible();
        await expect(homePage.contactSubmitButton).toBeVisible();

        // fill in contact form
        await homePage.contactName.fill('Jane');
        await homePage.contactEmail.fill('jane@email.com');
        await homePage.contactPhone.fill('01189998819991197253');
        await homePage.contactSubject.fill('Message');
        await homePage.contactDescription.fill('This is a message about an enquiry.');

        await homePage.contactSubmitButton.click();
        await expect(homePage.contactFormSuccess).toBeVisible();

        // confirm message has been submitted and delete message
        await messagesPage.goToMessagePage();
        await expect(messagesPage.messageRow).toHaveCount(newMessagesCount); 
        await messagesPage.messageRow.last().click(); 
        await expect(messagesPage.messageModal).toBeVisible();
        await messagesPage.messageCloseButton.click();
        await messagesPage.messageDeleteButton.last().click(); 
        await expect(messagesPage.messageRow).toHaveCount(originalMessagesCount); 
    });

});

