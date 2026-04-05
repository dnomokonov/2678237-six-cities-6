import {Outlet} from 'react-router-dom';
import {useAppSelector} from './hooks';
import {Loader} from './components/Loader/Loader.tsx';
import {selectAuthStatus, selectIsLoadingData} from './store/selectors';
import {Toaster} from 'react-hot-toast';
import {AuthorizationStatus} from './const.ts';

export default function App() {
  const authStatus = useAppSelector(selectAuthStatus);
  const isOffersDataLoading = useAppSelector(selectIsLoadingData);

  if (authStatus === AuthorizationStatus.UNKNOWN || isOffersDataLoading) {
    return (
      <Loader />
    );
  }

  return (
    <>
      <Outlet />
      <Toaster />
    </>
  );
}
