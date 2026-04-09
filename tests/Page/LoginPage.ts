import {Locator, Page} from '@playwright/test';

export class LoginPage {
  private readonly page: Page;

  public readonly titleForm: Locator;
  public readonly loginInput: Locator;
  public readonly passwordInput: Locator;
  public readonly submitButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.titleForm = this.page.getByTestId('form-header');
    this.loginInput = this.page.getByTestId('login-input');
    this.passwordInput = this.page.getByTestId('password-input');
    this.submitButton = this.page.getByTestId('submit-button');
  }

  async navigate() {
    await this.page.goto('/login');
  }

  async login(login: string, password: string) {
    await this.loginInput.fill(login);
    await this.passwordInput.fill(password);
    await this.submitButton.click();
  }
}
