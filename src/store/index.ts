import {configureStore} from '@reduxjs/toolkit';
import offersReducer from './offersSlice.ts';
import authReducer from './authSlice.ts';
import {createApi} from '../services/api.ts';

const api = createApi();

const store = configureStore({
  reducer: {
    offers: offersReducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api
      }
    })
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
