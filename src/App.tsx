import {Outlet} from 'react-router-dom';
import {Offers} from './types/offer.ts';

type AppProps = {
  offers: Offers;
}

export default function App({offers}: AppProps) {
  return (
    <Outlet context={offers}/>
  );
}
