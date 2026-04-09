import {test, expect} from '@playwright/test';
import {MainPage} from './Page/MainPage';
import {SortType} from '../src/types/sort';

let mainPage : MainPage;

test.beforeEach(async ({page}) => {
  mainPage = new MainPage(page);
  await mainPage.navigate();
});

test('Отображение основных элементов сортировки (тип и результат)', async () => {
  await expect(mainPage.currentSortType).toBeVisible();
  await expect(mainPage.placesFound).toBeVisible();
});

test('Сортировка по умолчанию', async () => {
  const currentType = await mainPage.getCurrentSortType();
  expect(currentType).toContain('Popular');
});

test('Открытие выпадающего списка сортировки', async () => {
  await mainPage.currentSortType.click();
  await expect(mainPage.sortOptionsList).toBeVisible();
});

test('Сортировка Price: low to high', async ({page}) => {
  await mainPage.setCurrentSortType(SortType.LowToHigh);
  await page.waitForTimeout(5000);

  const prices = await mainPage.getOfferPrices();
  for (let i = 0; i < prices.length - 1; i++) {
    expect(prices[i]).toBeLessThanOrEqual(prices[i + 1]);
  }
});

test('Сортировка Price: high to low', async ({page}) => {
  await mainPage.setCurrentSortType(SortType.HighToLow);
  await page.waitForTimeout(5000);

  const prices = await mainPage.getOfferPrices();
  for (let i = 0; i < prices.length - 1; i++) {
    expect(prices[i]).toBeGreaterThanOrEqual(prices[i + 1]);
  }
});

test('Сортировка Top rated first', async ({page}) => {
  await mainPage.setCurrentSortType(SortType.TopRated);
  await page.waitForTimeout(5000);

  const ratings = await mainPage.getOfferRatings();
  for (let i = 0; i < ratings.length - 1; i++) {
    expect(ratings[i]).toBeGreaterThanOrEqual(ratings[i + 1]);
  }
});

test('Количество предложений не изменяется после сортировки', async ({page}) => {
  await page.waitForTimeout(5000);

  const initCountOffers = await mainPage.getCountOffers();
  const values = Object.values(SortType);

  for (const value of values) {
    await mainPage.setCurrentSortType(value);
    await page.waitForTimeout(500);
    const countOffers = await mainPage.getCountOffers();
    expect(countOffers).toBe(initCountOffers);
  }
});
