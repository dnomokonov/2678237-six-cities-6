import React from 'react';
import ReactDOM from 'react-dom/client';
import {RouterProvider} from 'react-router-dom';
import store from './store';
import {Provider} from 'react-redux';
import router from './routes/router.tsx';
import {checkAuthAction} from './store/actions/apiActions.ts';
import {Toaster} from 'react-hot-toast';

store.dispatch(checkAuthAction());

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}/>
      <Toaster/>
    </Provider>
  </React.StrictMode>
);
