import {Locator, Page} from '@playwright/test';

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
    readonly roomErrorAlert: Locator;
    readonly roomBookButton: Locator;
    readonly roomBookConfirmation: Locator;
    readonly contactName: Locator;
    readonly contactEmail: Locator;
    readonly contactPhone: Locator;
    readonly contactSubject: Locator;
    readonly contactDescription: Locator; 
    readonly contactSubmitButton: Locator;
    readonly contactFormErrorAlert: Locator;
    readonly contactFormSuccess: Locator;


    constructor(page: Page) {
        this.page = page;
        this.logo = page.getByTestId('hotel-logo');
        this.map = page.getByTestId('map');
        this.letMeHackButton = page.getByText('Let me hack!');
        this.hotelRoom = page.getByTestId('hotel-room-row');
        this.bookRoomButton = page.getByTestId('book-room-button');
        this.calendar = page.getByTestId('roomBooking-calendar');
        this.roomFirstNameField = page.getByTestId('roomBooking-firstNameField');
        this.roomLastNameField = page.getByTestId('roomBooking-lastNameField');
        this.roomEmailField = page.getByTestId('roomBooking-emailField');
        this.roomPhoneField = page.getByTestId('roomBooking-phoneField');
        this.roomErrorAlert = page.getByTestId('roomBooking-errorAlert');
        this.roomBookButton = page.getByTestId('roomBooking-bookRoomButton');
        this.roomBookConfirmation = page.getByTestId('booking-success-confirmation');
        this.contactName = page.getByTestId('ContactName');
        this.contactEmail = page.getByTestId('ContactEmail');
        this.contactPhone = page.getByTestId('ContactPhone');
        this.contactSubject = page.getByTestId('ContactSubject');
        this.contactDescription = page.getByTestId('ContactDescription');
        this.contactSubmitButton = page.getByTestId('ContactSubmitButton');
        this.contactFormErrorAlert = page.getByTestId('contactForm-errorAlert');
        this.contactFormSuccess = page.getByTestId('ContactSuccess');
    }

    async goToHomePage() {
        await this.page.goto('http://localhost:8080')
    }

    async scrollToBottom() {
        await this.page.keyboard.press('Meta+ArrowDown');
    }
}