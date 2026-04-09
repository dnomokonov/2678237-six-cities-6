import {MainPage} from './Page/MainPage';
import {test, expect} from '@playwright/test';

let mainPage : MainPage;

test.beforeEach(async ({page}) => {
  mainPage = new MainPage(page);
  await mainPage.navigate();
});

test('Количество предложений = количеству маркеров на карте', async ({page}) => {
  await page.waitForTimeout(5000);

  const offerCount = await mainPage.getCountOffers();
  const markersCount = await mainPage.getCountMarkers();

  expect(markersCount).toBe(offerCount);
});

test('Активный маркер при наведении на карточку', async ({page}) => {
  await page.waitForTimeout(5000);

  await mainPage.setHoverOfferCard(0);
  await page.waitForTimeout(500);

  const activeMarker = page.locator('.leaflet-marker-icon[src*="pin-active"]');
  const isActiveMarkerVisible = await activeMarker.isVisible();

  expect(isActiveMarkerVisible).toBeTruthy();
});
