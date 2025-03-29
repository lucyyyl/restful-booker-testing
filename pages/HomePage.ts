import { Locator, Page } from '@playwright/test';
import { mainPageURL } from '../helpers/envVars';

export class HomePage {
    readonly page: Page;
    readonly logo: Locator;
    readonly map: Locator;
    readonly letMeHackButton: Locator;
    readonly hotelRoom: Locator;
    readonly bookRoomButton: Locator;
    readonly calendar: Locator;
    readonly roomFirstNameField: Locator;
    readonly roomLastNameField: Locator;
    readonly roomEmailField: Locator;
    readonly roomPhoneField: Locator;
    readonly errorAlert: Locator;
    readonly roomBookButton: Locator;
    readonly roomCancelButton: Locator;
    readonly roomBookConfirmationModal: Locator;
    readonly contactName: Locator;
    readonly contactEmail: Locator;
    readonly contactPhone: Locator;
    readonly contactSubject: Locator;
    readonly contactDescription: Locator;
    readonly contactSubmitButton: Locator;
    readonly contactFormSuccess: Locator;

    constructor(page: Page) {
        this.page = page;
        this.logo = page.locator('.hotel-logoUrl');
        this.map = page.getByTestId('map');
        this.letMeHackButton = page.getByText('Let me hack!');
        this.hotelRoom = page.locator('.hotel-room-info');
        this.bookRoomButton = page.getByRole('button', { name: 'Book this room' });
        this.calendar = page.locator('.rbc-calendar');
        this.roomFirstNameField = page.getByLabel('Firstname');
        this.roomLastNameField = page.getByLabel('Lastname');
        this.roomEmailField = page.locator('input[name="email"]');
        this.roomPhoneField = page.locator('input[name="phone"]');
        this.errorAlert = page.locator('.alert-danger');
        this.roomBookButton = page.getByRole('button', { name: 'Book' });
        this.roomCancelButton = page.getByRole('button', { name: 'Cancel' });
        this.roomBookConfirmationModal = page.getByRole('dialog').filter({ has: page.locator('.confirmation-modal') });
        this.contactName = page.getByTestId('ContactName');
        this.contactEmail = page.getByTestId('ContactEmail');
        this.contactPhone = page.getByTestId('ContactPhone');
        this.contactSubject = page.getByTestId('ContactSubject');
        this.contactDescription = page.getByTestId('ContactDescription');
        this.contactSubmitButton = page.getByRole('button', { name: 'Submit' });
        this.contactFormSuccess = page.getByText('Thanks for getting in touch ');
    }

    async goToHomePage() {
        await this.page.goto(mainPageURL);
    }

    async scrollToBottom() {
        await this.page.keyboard.press('Meta+ArrowDown');
    }
}