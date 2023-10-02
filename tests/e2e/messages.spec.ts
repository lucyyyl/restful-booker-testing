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
        expect(homePage.contactName).toBeVisible;
        expect(homePage.contactEmail).toBeVisible;
        expect(homePage.contactPhone).toBeVisible;
        expect(homePage.contactSubject).toBeVisible;
        expect(homePage.contactDescription).toBeVisible;
        expect(homePage.contactSubmitButton).toBeVisible;

        await homePage.contactSubmitButton.click();
        expect(homePage.contactFormErrorAlert).toBeVisible;
    });

    test('contact form shows success message when form submitted, can see message in admin page @E2E', async ({ browser }) => {
        messagesPageContext = await browser.newContext();
        messagesPage = new MessagesPage(await messagesPageContext.newPage());
        await messagesPage.goToMessagePage();
        const adminPageHackButton = await messagesPage.letMeHackButton.isVisible();
        if (adminPageHackButton) {
            await messagesPage.letMeHackButton.click();
        }
        expect(messagesPage.pageTitle).toBeVisible;
        await messagesPage.userNameField.fill(adminUsername);
        await messagesPage.passwordField.fill(adminPassword);
        await messagesPage.submitCredentialsButton.click();
        expect(messagesPage.logoutButton).toBeVisible;
        
        expect(homePage.contactName).toBeVisible;
        expect(homePage.contactEmail).toBeVisible;
        expect(homePage.contactPhone).toBeVisible;
        expect(homePage.contactSubject).toBeVisible;
        expect(homePage.contactDescription).toBeVisible;
        expect(homePage.contactSubmitButton).toBeVisible;

        await homePage.contactName.fill('Jane');
        await homePage.contactEmail.fill('jane@email.com');
        await homePage.contactPhone.fill('01189998819991197253');
        await homePage.contactSubject.fill('Message');
        await homePage.contactDescription.fill('This is a message about an enquiry.');

        await homePage.contactSubmitButton.click();
        expect(homePage.contactFormSuccess).toBeVisible;

        messagesPage.goToMessagePage();
        expect(messagesPage.messageRow).toHaveCount(2);
        await messagesPage.messageRow.nth(1).click();
        expect(messagesPage.messageModal).toBeVisible;
        await messagesPage.messageCloseButton.click();
        await messagesPage.messageDeleteButton.click();
        expect(messagesPage.messageRow.nth(1)).not.toBeVisible;
    });

});

