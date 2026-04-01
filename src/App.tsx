import {Outlet} from 'react-router-dom';
import {useAppSelector} from './hooks';
import {Loader} from './components/Loader/Loader.tsx';

export default function App() {
  const isOffersDataLoading = useAppSelector((state) => state.selectOffer.isOffersDataLoading);

  if (isOffersDataLoading) {
    return (
      <Loader />
    );
  }

  return (
    <Outlet />
  );
}
