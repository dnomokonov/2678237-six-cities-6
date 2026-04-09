import {LoginPage} from './Page/LoginPage';
import {test, expect} from '@playwright/test';

let loginPage : LoginPage;

test.beforeEach(async ({page}) => {
  loginPage = new LoginPage(page);
  await loginPage.navigate();
});

test('Корректное отображение формы авторизации', async () => {
  await expect(loginPage.titleForm).toBeVisible();
  await expect(loginPage.loginInput).toBeVisible();
  await expect(loginPage.passwordInput).toBeVisible();
  await expect(loginPage.submitButton).toBeVisible();
});

test('Авторизация пользователя', async ({page}) => {
  await loginPage.login('test@gmail.com', 'test1234');
  await page.waitForTimeout(10000);
  await expect(page).toHaveURL('/');
});

test('Некорректный ввод логина', async () => {
  await loginPage.login('test', 'test123');
  const isValid = await loginPage.loginInput.evaluate((el : HTMLInputElement) => el.validity.valid);
  expect(isValid).toBeFalsy();
});

test('Некорректный ввод пароля (без цифр)', async () => {
  await loginPage.login('test@gmail.com', 'test');
  const isValid = await loginPage.passwordInput.evaluate((el: HTMLInputElement) => el.validity.valid);
  expect(isValid).toBeFalsy();
});

test('Отправка пустой формы', async ({page}) => {
  await loginPage.submitButton.click();
  await page.waitForTimeout(10000);
  expect(page.url()).toContain('/login');
});
