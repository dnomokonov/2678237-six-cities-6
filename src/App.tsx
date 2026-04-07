import {Outlet} from 'react-router-dom';
import {useAppSelector} from './hooks';
import {Loader} from './components/Loader/Loader.tsx';
import {selectIsLoadingData} from './store/offersSelectors.ts';

export default function App() {
  const isOffersDataLoading = useAppSelector(selectIsLoadingData);

  if (isOffersDataLoading) {
    return (
      <Loader />
    );
  }

  return (
    <Outlet />
  );
}
