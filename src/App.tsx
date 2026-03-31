import {Outlet} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {useEffect, useState} from 'react';
import {setOffers} from './store/offersSlice.ts';
import {offers} from './mocks/offers.ts';

export default function App() {
  const dispatch = useDispatch();
  const [isUploadData, setUploadData] = useState(false);

  useEffect(() => {
    dispatch(setOffers(offers));
    setUploadData(true);
  }, [dispatch]);

  if (!isUploadData) {
    return null;
  }

  return (
    <Outlet />
  );
}
