import {RootState} from '../index.ts';
import {AuthorizationStatus} from '../../const.ts';

export const selectAuthStatus = (state: RootState) => state.auth.authorizationStatus;
export const selectUserData = (state: RootState) => state.auth.user;
export const selectFavoritesOffers = (state: RootState) => state.auth.favorites;
export const selectCountFavorites = (state: RootState) => state.auth.favorites.length;

export const isAuthUser = (state: RootState) => {
  const authStatus = state.auth.authorizationStatus;
  return authStatus === AuthorizationStatus.AUTH;
};
