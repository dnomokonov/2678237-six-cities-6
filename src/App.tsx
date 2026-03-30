import {Outlet} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {useEffect} from 'react';
import {setOffers} from './store/offersSlice.ts';
import {offers} from './mocks/offers.ts';

export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setOffers(offers));
  }, [dispatch]);

  return (
    <Outlet />
  );
}
