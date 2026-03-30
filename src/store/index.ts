import {configureStore} from '@reduxjs/toolkit';
import offersReducer from './offersSlice.ts';

const store = configureStore({
  reducer: {
    selectOffer: offersReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
