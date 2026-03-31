import {RootState} from './index.ts';

export const selectAllOffers = (state: RootState) => state.selectOffer.allOffers;
export const selectCurrentCity = (state: RootState) => state.selectOffer.currentCity;
export const selectCurrentSortOption = (state: RootState) => state.selectOffer.currentSortOption;
