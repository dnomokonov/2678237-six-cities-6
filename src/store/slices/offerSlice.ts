import {SortType} from '../../types/sort.ts';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {OfferById, Offers} from '../../types/offer.ts';

type OfferState = {
  currentCity: string;
  currentSortOption: SortType;
  allOffers: Offers;
  offerById: OfferById | null;
  isOffersDataLoading: boolean;
};

const initialState : OfferState = {
  currentCity: 'Amsterdam',
  currentSortOption: SortType.Popular,
  allOffers: [],
  offerById: null,
  isOffersDataLoading: false,
};

const offersSlice = createSlice({
  name: 'offers',
  initialState,
  reducers: {
    editCity(state, action : PayloadAction<string>) {
      state.currentCity = action.payload;
    },
    setOffers(state, action : PayloadAction<Offers>) {
      state.allOffers = action.payload;
    },
    setOffersDataLoadingStatus(state, action : PayloadAction<boolean>) {
      state.isOffersDataLoading = action.payload;
    },
    setSortOption(state, action : PayloadAction<SortType>) {
      state.currentSortOption = action.payload;
    },
    setOfferById(state, action : PayloadAction<OfferById>) {
      state.offerById = action.payload;
    }
  },
});

export const {
  editCity,
  setOffers,
  setOffersDataLoadingStatus,
  setSortOption,
  setOfferById,
} = offersSlice.actions;
export default offersSlice.reducer;

