import {createAsyncThunk} from '@reduxjs/toolkit';
import {AppDispatch, State} from '../types/state.ts';
import {AxiosInstance} from 'axios';
import {Offers} from '../types/offer.ts';
import {APIRoute} from '../const.ts';
import {setOffers, setOffersDataLoadingStatus} from './offersSlice.ts';

export const fetchOffersAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchOffers',
  async (_arg, {dispatch, extra: api}) => {
    dispatch(setOffersDataLoadingStatus(true));
    const {data} = await api.get<Offers>(APIRoute.OFFERS);
    dispatch(setOffersDataLoadingStatus(false));
    dispatch(setOffers(data));
  }
);
