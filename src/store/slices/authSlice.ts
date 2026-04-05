import {AuthorizationStatus, DEFAULT_USER} from '../../const.ts';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {User} from '../../types/user.ts';

type AuthState = {
  authorizationStatus: AuthorizationStatus;
  user: User;
};

const initialState : AuthState = {
  authorizationStatus: AuthorizationStatus.UNKNOWN,
  user: DEFAULT_USER,
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
    }
  },
});

export const {requireAuth, setUser} = authSlice.actions;
export default authSlice.reducer;
