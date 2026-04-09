import {Locator, Page} from '@playwright/test';

export class MainPage {
  private readonly page: Page;

  public readonly placesFound: Locator;
  public readonly currentSortType: Locator;
  public readonly sortOptionsList: Locator;

  public readonly offerCards: Locator;
  public readonly offerPrices: Locator;
  public readonly offerRatings: Locator;

  public readonly leafletMarker: Locator;

  constructor(page: Page) {
    this.page = page;

    this.placesFound = this.page.getByTestId('places-found');
    this.currentSortType = this.page.getByTestId('current-sort-type');
    this.sortOptionsList = this.page.getByTestId('sort-options-list');

    this.offerCards = this.page.locator('.cities__card');
    this.offerPrices = this.page.getByTestId('card-price-value');
    this.offerRatings = this.page.getByTestId('place-card-rating');

    this.leafletMarker = this.page.locator('.leaflet-marker-icon');
  }

  async navigate() {
    await this.page.goto('/')
  }

  async getCurrentSortType() {
    const text = await this.currentSortType.textContent();
    return text?.trim() || '';
  }

  async setCurrentSortType(option: string) {
    await this.currentSortType.click();
    await this.page.locator('.places__option ', {hasText: option}).click();
  }

  async getOfferPrices(): Promise<number[]> {
    const elements = await this.offerPrices.all();
    const prices: number[] = [];

    for (const element of elements) {
      const text = await element.textContent();
      const price = text?.replace(/[€\s]/g, '');
      if (price) {
        prices.push(parseFloat(price));
      }
    }

    return prices;
  }

  async getOfferRatings(): Promise<number[]> {
    const elements = await this.offerRatings.all();
    const ratings: number[] = [];

    for (const element of elements) {
      const text = await element.textContent();
      if (text) {
        ratings.push(parseFloat(text));
      }
    }

    return ratings;
  }

  async getCountOffers(): Promise<number> {
    const cards = await this.offerCards.all();
    return cards.length;
  }

  async getCountMarkers(): Promise<number> {
    const markers = await this.leafletMarker.all();
    return markers.length;
  }

  async setHoverOfferCard(index: number = 0) {
    await this.offerCards.nth(index).hover();
  }
}
