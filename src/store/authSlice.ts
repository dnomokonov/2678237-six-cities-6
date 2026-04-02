import {AuthorizationStatus} from '../const.ts';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

type AuthState = {
  authorizationStatus: AuthorizationStatus;
};

const initialState : AuthState = {
  authorizationStatus: AuthorizationStatus.UNKNOWN,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    requireAuth(state, action : PayloadAction<AuthorizationStatus>) {
      state.authorizationStatus = action.payload;
    }
  },
});

export const {requireAuth} = authSlice.actions;
export default authSlice.reducer;
