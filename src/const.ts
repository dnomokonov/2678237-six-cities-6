export enum AppRoute {
  Root = '/',
  Login = '/login',
  Favorites = '/favorites',
  Offer = '/offer',
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
