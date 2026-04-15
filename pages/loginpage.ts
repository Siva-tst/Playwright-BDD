import { Page } from '@playwright/test';

export class LoginPage {
  constructor(private page: Page) {}

  async navigate() {
    await this.page.goto('https://rahulshettyacademy.com/loginpagePractise/');
  }

  async login(username: string, password: string) {
    await this.page.locator('#username').fill(username);
    await this.page.locator('#password').fill(password);
  }

  async clickLogin() {
    await this.page.locator('#signInBtn').click();
  }

  async isShopPageVisible() {
    await this.page.locator('.nav-link.btn.btn-primary').waitFor({ state: 'visible', timeout: 10000 });
    return await this.page.locator('.nav-link.btn.btn-primary').isVisible();
  }
}
