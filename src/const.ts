import {SortType} from './types/sort.ts';
import {Offers} from './types/offer.ts';
import {sortByPriceAsc, sortByPriceDesc, sortByRatingDesc} from './utils/sortUtils.ts';

export enum AppRoute {
  Root = '/',
  Login = '/login',
  Favorites = '/favorites',
  Offer = '/offer',
  NotFound = '/not-found',
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
}

export const MAX_RATING : number = 5;
export const DEFAULT_RATING : number = 0;
export const MIN_LENGTH : number = 50;

export const URL_MARKER_DEFAULT = 'public/img/pin.svg';
export const URL_MARKER_CURRENT = 'public/img/pin-active.svg';

export const CITIES = ['Paris', 'Cologne', 'Brussels', 'Amsterdam', 'Hamburg', 'Dusseldorf'];

export const sortingMap : Record<SortType, (offers: Offers) => Offers> = {
  [SortType.Popular]: (offers) => offers,
  [SortType.LowToHigh]: (offers) => sortByPriceAsc(offers),
  [SortType.HighToLow]: (offers) => sortByPriceDesc(offers),
  [SortType.TopRated]: (offers) => sortByRatingDesc(offers),
};

