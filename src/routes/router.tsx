import {createBrowserRouter} from 'react-router-dom';
import App from '../App.tsx';
import {MainPage} from '../pages/MainPage/MainPage.tsx';
import {LoginPage} from '../pages/LoginPage/LoginPage.tsx';
import {OfferPage} from '../pages/OfferPage/OfferPage.tsx';
import {NotFoundPage} from '../pages/NotFoundPage/NotFoundPage.tsx';
import PrivateRoute from './privateRoute.tsx';
import {AppRoute, AuthorizationStatus} from '../const.ts';
import {FavoritesPage} from '../pages/FavoritesPage/FavoritesPage.tsx';
import {Offers} from '../types/offer.ts';

const getRouter = (offers: Offers) => createBrowserRouter([
  {
    path: AppRoute.Root,
    element: <App offers={offers}/>,
    errorElement: <NotFoundPage/>,
    children: [
      {
        index: true,
        element: <MainPage />
      },
      {
        path: `${AppRoute.Offer}/:id`,
        element: <OfferPage/>
      },
      {
        path: AppRoute.Favorites,
        element:
          <PrivateRoute authStatus={AuthorizationStatus.Auth}>
            <FavoritesPage/>
          </PrivateRoute>
      }
    ]
  },
  {
    path: AppRoute.Login,
    element: <LoginPage/>
  },
]);

export default getRouter;
