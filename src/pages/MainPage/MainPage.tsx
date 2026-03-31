import {Link} from 'react-router-dom';
import {OffersList} from '../../components/OffersList/OffersList.tsx';
import {Offer} from '../../types/offer.ts';
import {useMemo, useState} from 'react';
import {Map} from '../../components/Map/Map.tsx';
import {AppRoute, CITIES, sortingMap} from '../../const.ts';
import {ListCity} from '../../components/ListCity/ListCity.tsx';
import {useDispatch, useSelector} from 'react-redux';
import {selectAllOffers, selectCurrentCity, selectCurrentSortOption} from '../../store/offersSelectors.ts';
import {editCity} from '../../store/offersSlice.ts';
import {SortDropdown} from '../../components/SortDropdown/SortDropdown.tsx';

export function MainPage() {
  const [activeOffer, setActiveOffer] = useState<Offer | null>(null);
  const dispatch = useDispatch();

  const currentCity = useSelector(selectCurrentCity);
  const currentSortOption = useSelector(selectCurrentSortOption);
  const offers = useSelector(selectAllOffers);

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
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <a className="header__logo-link header__logo-link--active">
                <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41"/>
              </a>
            </div>
            <nav className="header__nav">
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  <Link to='#' className="header__nav-link header__nav-link--profile">
                    <div className="header__avatar-wrapper user__avatar-wrapper">
                    </div>
                    <span className="header__user-name user__name">Oliver.conner@gmail.com</span>
                    <span className="header__favorite-count">3</span>
                  </Link>
                </li>
                <li className="header__nav-item">
                  <Link to={AppRoute.Root} className="header__nav-link">
                    <span className="header__signout">Sign out</span>
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

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
