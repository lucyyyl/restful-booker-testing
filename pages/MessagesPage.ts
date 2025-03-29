import { Locator, Page } from '@playwright/test';
import { AdminPage } from './AdminPage';
import { messagesURL } from '../helpers/envVars';

export class MessagesPage extends AdminPage {
    readonly messageRow: Locator;
    readonly messageModal: Locator;
    readonly messageCloseButton: Locator;
    readonly messageDeleteButton: Locator;

    constructor(page: Page) {
        super(page);
        this.messageRow = page.locator('.row.detail');
        this.messageModal = page.locator('.message-modal');
        this.messageCloseButton = page.getByRole('button', { name: 'Close' });
        this.messageDeleteButton = page.getByTestId(/.*DeleteMessage.*/);
    }

    async goToMessagePage() {
        await this.page.goto(messagesURL);
    }
}