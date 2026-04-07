import {SortType} from '../../types/sort.ts';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {OfferById, Offers} from '../../types/offer.ts';
import {Comments} from '../../types/comment.ts';

type OfferState = {
  currentCity: string;
  currentSortOption: SortType;
  allOffers: Offers;
  offerById: OfferById | null;
  commentsOffer: Comments;
  nearbyOffers: Offers;
  isDataLoading: boolean;
  isOfferLoading: boolean;
};

const initialState : OfferState = {
  currentCity: 'Amsterdam',
  currentSortOption: SortType.Popular,
  allOffers: [],
  offerById: null,
  commentsOffer: [],
  nearbyOffers: [],
  isDataLoading: false,
  isOfferLoading: false,
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
    setDataLoadingStatus(state, action : PayloadAction<boolean>) {
      state.isDataLoading = action.payload;
    },
    setSortOption(state, action : PayloadAction<SortType>) {
      state.currentSortOption = action.payload;
    },
    setOfferById(state, action : PayloadAction<OfferById>) {
      state.offerById = action.payload;
    },
    setOfferLoadingStatus(state, action : PayloadAction<boolean>) {
      state.isOfferLoading = action.payload;
    },
    resetOfferById(state) {
      state.offerById = null;
      state.commentsOffer = [];
      state.nearbyOffers = [];
    },
    setCommentsOffer(state, action : PayloadAction<Comments>) {
      state.commentsOffer = action.payload;
    },
    setNearbyOffers(state, action : PayloadAction<Offers>) {
      state.nearbyOffers = action.payload;
    }
  }
});

export const {
  editCity,
  setOffers,
  setDataLoadingStatus,
  setSortOption,
  setOfferById,
  setOfferLoadingStatus,
  resetOfferById,
  setCommentsOffer,
  setNearbyOffers,
} = offersSlice.actions;
export default offersSlice.reducer;
