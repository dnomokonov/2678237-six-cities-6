import {Offer} from '../types/offer.ts';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

type OfferState = {
  currentCity: string;
  allOffers: Offer[];
};

const offersSlice = createSlice({
  name: 'offers',
  initialState: { currentCity: 'Amsterdam', allOffers: [] } as OfferState,
  reducers: {
    editCity(state, action : PayloadAction<string>) {
      state.currentCity = action.payload;
    },
    setOffers(state, action : PayloadAction<Offer[]>) {
      state.allOffers = action.payload;
    }
  }
});

export const {editCity, setOffers} = offersSlice.actions;
export default offersSlice.reducer;

