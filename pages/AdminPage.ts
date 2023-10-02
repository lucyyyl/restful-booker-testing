import {Locator, Page} from '@playwright/test';

export class AdminPage {
    readonly page: Page;
    readonly userNameField: Locator;
    readonly passwordField: Locator;
    readonly letMeHackButton: Locator;
    readonly submitCredentialsButton: Locator;
    readonly logoutButton: Locator;
    readonly pageTitle: Locator;
    readonly roomNameField: Locator;
    readonly roomTypeDropdown: Locator;
    readonly roomAccessibilityDropdown: Locator;
    readonly roomPriceField: Locator;
    readonly wifiCheckbox: Locator;
    readonly tvCheckbox: Locator;
    readonly safeCheckbox: Locator;
    readonly createRoomButton: Locator;
    readonly deleteRoomButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.userNameField = page.getByTestId('username');
        this.passwordField = page.getByTestId('password');
        this.letMeHackButton = page.getByText('Let me hack!');
        this.submitCredentialsButton = page.getByTestId('submit');
        this.logoutButton = page.getByTestId('logout-button');
        this.pageTitle = page.getByTestId('booking-management-title');
        this.roomNameField = page.getByTestId('roomName');
        this.roomTypeDropdown = page.getByTestId('room-type-dropdown');
        this.roomAccessibilityDropdown = page.getByTestId('room-accessible-dropdown');
        this.roomPriceField = page.getByTestId('room-price');
        this.wifiCheckbox = page.getByLabel('WiFi');
        this.tvCheckbox = page.getByLabel('TV');
        this.safeCheckbox = page.getByLabel('Safe');
        this.createRoomButton = page.getByTestId('create-room-button');
        this.deleteRoomButton = page.getByTestId('delete-room-button');
    }

    async goToAdminPage() {
        await this.page.goto('http://localhost:8080/#/admin');
    }
}