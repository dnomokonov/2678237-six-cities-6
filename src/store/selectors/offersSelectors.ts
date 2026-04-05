import {RootState} from '../index.ts';

export const selectAllOffers = (state: RootState) => state.offers.allOffers;
export const selectCurrentCity = (state: RootState) => state.offers.currentCity;
export const selectCurrentSortOption = (state: RootState) => state.offers.currentSortOption;
export const selectIsLoadingData = (state: RootState) => state.offers.isOffersDataLoading;
