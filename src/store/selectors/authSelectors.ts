import {RootState} from '../index.ts';

export const selectAuthStatus = (state: RootState) => state.auth.authorizationStatus;
export const selectUserData = (state: RootState) => state.auth.user;
export const selectFavoritesOffers = (state: RootState) => state.auth.favorites;
export const selectCountFavorites = (state: RootState) => state.auth.favorites.length;
