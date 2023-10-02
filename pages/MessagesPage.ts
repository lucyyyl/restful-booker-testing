import {Locator, Page} from '@playwright/test';
import { AdminPage } from './AdminPage';
import { messagesURL } from '../helpers/envVars';

export class MessagesPage extends AdminPage {
    readonly messageRow: Locator;
    readonly messageModal: Locator;
    readonly messageCloseButton: Locator;
    readonly messageDeleteButton: Locator;

    constructor(page: Page) {
        super(page);
        this.messageRow = page.getByTestId('message-row');
        this.messageModal = page.getByTestId('message-modal');
        this.messageCloseButton = page.getByTestId('close-button');
        this.messageDeleteButton = page.getByTestId('DeleteMessage1');
    }

    async goToMessagePage() {
        await this.page.goto(messagesURL);
    }
}