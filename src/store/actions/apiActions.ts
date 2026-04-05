import {createAsyncThunk} from '@reduxjs/toolkit';
import {AppDispatch, State} from '../../types/state.ts';
import {AxiosInstance} from 'axios';
import {Offers} from '../../types/offer.ts';
import {APIRoute, AuthorizationStatus, DEFAULT_USER} from '../../const.ts';
import {setOffers, setOffersDataLoadingStatus} from '../slices/offerSlice.ts';
import {requireAuth, setFavorite, setUser} from '../slices/authSlice.ts';
import {AuthData} from '../../types/auth.ts';
import {User} from '../../types/user.ts';
import {removeToken, saveToken} from '../../services/token.ts';

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

export const fetchFavoritesAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/fetchFavorites',
  async (_arg, {dispatch, extra: api}) => {
    const {data} = await api.get<Offers>(APIRoute.FAVORITE);
    dispatch(setFavorite(data));
  }
);

export const loginAction = createAsyncThunk<void, AuthData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/login',
  async ({login: email, password}, {dispatch, extra: api}) => {
    const {data} = await api.post<User>(APIRoute.LOGIN, {email, password});
    saveToken(data.token);
    dispatch(setUser(data));
    dispatch(requireAuth(AuthorizationStatus.AUTH));
    dispatch(fetchFavoritesAction());
  }
);

export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/logout',
  async (_arg, {dispatch, extra: api}) => {
    await api.delete(APIRoute.LOGOUT);
    removeToken();
    dispatch(requireAuth(AuthorizationStatus.NO_AUTH));
    dispatch(setUser(DEFAULT_USER));
  }
);
