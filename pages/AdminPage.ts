import { Locator, Page } from '@playwright/test';
import { adminURL } from '../helpers/envVars';

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
        this.submitCredentialsButton = page.getByRole('button', { name: 'Login' });
        this.logoutButton = page.getByText('Logout');
        this.pageTitle = page.getByText('B&B Booking Management');
        this.roomNameField = page.getByTestId('roomName');
        this.roomTypeDropdown = page.locator('#type');
        this.roomAccessibilityDropdown = page.locator('#accessible');
        this.roomPriceField = page.locator('#roomPrice');
        this.wifiCheckbox = page.getByLabel('WiFi');
        this.tvCheckbox = page.getByLabel('TV');
        this.safeCheckbox = page.getByLabel('Safe');
        this.createRoomButton = page.getByRole('button', { name: 'Create' });
        this.deleteRoomButton = page.locator('.roomDelete');
    }

    async goToAdminPage() {
        await this.page.goto(adminURL);
    }
}