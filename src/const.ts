import {SortType} from './types/sort.ts';
import {Offers} from './types/offer.ts';
import {sortByPriceAsc, sortByPriceDesc, sortByRatingDesc} from './utils/sortUtils.ts';
import {User} from './types/user.ts';

export enum AppRoute {
  Root = '/',
  Login = '/login',
  Favorites = '/favorites',
  Offer = '/offer',
  NotFound = '/not-found',
}

export enum APIRoute {
  OFFERS = '/offers',
  LOGIN = '/login',
  LOGOUT = '/logout',
  FAVORITE = '/favorite',
}

export enum AuthorizationStatus {
  AUTH = 'AUTH',
  NO_AUTH = 'NO_AUTH',
  UNKNOWN = 'UNKNOWN',
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

export const regexForm = '^(?=.*[a-zA-Z])(?=.*\\d).+';

export const DEFAULT_USER: User = {
  name: '',
  avatarUrl: '',
  email: '',
  isPro: false,
  token: '',
};
