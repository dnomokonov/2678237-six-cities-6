import {RootState} from '../index.ts';

export const selectAuthStatus = (state: RootState) => state.auth.authorizationStatus;
