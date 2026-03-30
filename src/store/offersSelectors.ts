import {RootState} from './index.ts';

export const selectAllOffers = (state: RootState) => state.selectOffer.allOffers;
export const selectCurrentCity = (state: RootState) => state.selectOffer.currentCity;
