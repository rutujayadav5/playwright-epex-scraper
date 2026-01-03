import { Page, Locator, expect } from '@playwright/test';

export class EpexMarketPage {
  readonly page: Page;
  readonly acceptCookiesBtn: Locator;
  readonly table: Locator;

  constructor(page: Page) {
    this.page = page;
    this.acceptCookiesBtn = page.locator('button:has-text("Accept")');
    this.table = page.locator('.table-container');
  }

  async navigate(url: string) {
    await this.page.goto(url, { waitUntil: 'domcontentloaded' });
  }

  async acceptCookiesIfPresent() {
    if (await this.acceptCookiesBtn.isVisible({ timeout: 5_000 })) {
      await this.acceptCookiesBtn.click();
    }
  }

  async waitForHumanVerification() {
    console.log('⏸️ Complete the "Are you human" verification manually...');
    await this.table.waitFor({ timeout: 60_000 });
    await expect(this.table).toBeVisible();
  }

  async scrapeMarketData() {
    const rows = this.table.locator('tbody tr');
    const rowCount = await rows.count();

    const data: {
      low: string;
      high: string;
      last: string;
      weightAvg: string;
    }[] = [];

    for (let i = 0; i < rowCount; i++) {
      const cells = await rows.nth(i).locator('td').allTextContents();

      data.push({
        low: cells[0],
        high: cells[1],
        last: cells[2],
        weightAvg: cells[3],
      });
    }

    return data;
  }
}
