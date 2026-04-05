import {createAsyncThunk} from '@reduxjs/toolkit';
import {AppDispatch, State} from '../../types/state.ts';
import {AxiosInstance} from 'axios';
import {Offers} from '../../types/offer.ts';
import {APIRoute, AuthorizationStatus} from '../../const.ts';
import {setOffers, setOffersDataLoadingStatus} from '../slices/offerSlice.ts';
import {requireAuth} from '../slices/authSlice.ts';
import {AuthData} from '../../types/auth.ts';
import {User} from '../../types/user.ts';
import {saveToken} from '../../services/token.ts';

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

export const checkAuthAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/checkAuth',
  async (_arg, {dispatch, extra: api}) => {
    try {
      await api.get(APIRoute.LOGIN);
      dispatch(requireAuth(AuthorizationStatus.AUTH));
    } catch {
      dispatch(requireAuth(AuthorizationStatus.NO_AUTH));
    }
  }
);

export const loginAction = createAsyncThunk<void, AuthData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/login',
  async ({login: email, password}, {dispatch, extra: api}) => {
    const {data: {token}} = await api.post<User>(APIRoute.LOGIN, {email, password});
    saveToken(token);
    dispatch(requireAuth(AuthorizationStatus.AUTH));
  }
);

