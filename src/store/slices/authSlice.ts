import {AuthorizationStatus, DEFAULT_USER} from '../../const.ts';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {User} from '../../types/user.ts';
import {Offers} from '../../types/offer.ts';

type AuthState = {
  authorizationStatus: AuthorizationStatus;
  user: User;
  favorites: Offers;
};

const initialState : AuthState = {
  authorizationStatus: AuthorizationStatus.UNKNOWN,
  user: DEFAULT_USER,
  favorites: [],
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    requireAuth(state, action : PayloadAction<AuthorizationStatus>) {
      state.authorizationStatus = action.payload;
    },
    setUser(state, action : PayloadAction<User>) {
      state.user = action.payload;
    },
    setFavorite(state, action: PayloadAction<Offers>) {
      state.favorites = action.payload;
    }
  },
});

export const {requireAuth, setUser, setFavorite} = authSlice.actions;
export default authSlice.reducer;
