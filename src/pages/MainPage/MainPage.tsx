import {OffersList} from '../../components/OffersList/OffersList.tsx';
import {Offer} from '../../types/offer.ts';
import {useMemo, useState} from 'react';
import {Map} from '../../components/Map/Map.tsx';
import {CITIES, sortingMap} from '../../const.ts';
import {ListCity} from '../../components/ListCity/ListCity.tsx';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {selectAllOffers, selectCurrentCity, selectCurrentSortOption} from '../../store/selectors';
import {editCity} from '../../store/slices/offerSlice.ts';
import {SortDropdown} from '../../components/SortDropdown/SortDropdown.tsx';
import {fetchOffersAction} from '../../store/actions/apiActions.ts';
import store from '../../store';
import {Header} from '../../components/Header/Header.tsx';

store.dispatch(fetchOffersAction());

export function MainPage() {
  const [activeOffer, setActiveOffer] = useState<Offer | null>(null);
  const dispatch = useAppDispatch();

  const currentCity = useAppSelector(selectCurrentCity);
  const currentSortOption = useAppSelector(selectCurrentSortOption);
  const offers = useAppSelector(selectAllOffers);

  const [sortedOffers, cityForMap] = useMemo(() => {
    const filteredOffers = offers.filter((offer) => offer.city.name === currentCity);
    const sortOffers = sortingMap[currentSortOption](filteredOffers);
    const city = sortOffers.length > 0 ? sortOffers[0].city : null;

    return [sortOffers, city];
  }, [offers, currentCity, currentSortOption]);

  const handleCityChange = (city: string) => {
    dispatch(editCity(city));
  };

  const handleCardHover = (offer: Offer | null) => {
    setActiveOffer(offer);
  };

  return (
    <div className="page page--gray page--main">
      <Header />
      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <ListCity cities={CITIES} selectedCity={currentCity} onCityChange={handleCityChange} />
          </section>
        </div>
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">{sortedOffers.length} places to stay in {currentCity}</b>
              <SortDropdown />

              <OffersList offers={sortedOffers} onCardHover={handleCardHover}/>
            </section>
            <div className="cities__right-section">
              <section className="cities__map map">
                <Map city={cityForMap} offers={sortedOffers} selectedOffer={activeOffer} />
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
