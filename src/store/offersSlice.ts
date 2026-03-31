import {Offers} from '../types/offer.ts';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {SortType} from '../types/sort.ts';

type OfferState = {
  currentCity: string;
  currentSortOption: SortType;
  allOffers: Offers;
};

const offersSlice = createSlice({
  name: 'offers',
  initialState: { currentCity: 'Amsterdam', currentSortOption: SortType.Popular, allOffers: [] } as OfferState,
  reducers: {
    editCity(state, action : PayloadAction<string>) {
      state.currentCity = action.payload;
    },
    setOffers(state, action : PayloadAction<Offers>) {
      state.allOffers = action.payload;
    },
    setSortOption(state, action : PayloadAction<SortType>) {
      state.currentSortOption = action.payload;
    }
  }
});

export const {editCity, setOffers, setSortOption} = offersSlice.actions;
export default offersSlice.reducer;

