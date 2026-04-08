import {Link} from 'react-router-dom';
import {OffersByCity} from '../../types/offer.ts';
import {FavoritesList} from '../../components/FavoritesList/FavoritesList.tsx';
import {selectAllOffers} from '../../store/selectors';
import {Header} from '../../components/Header/Header.tsx';
import {useAppSelector} from '../../hooks';

export function FavoritesPage() {
  const offers = useAppSelector(selectAllOffers);
  const favoriteOffers = offers.filter((offer) => offer.isFavorite);

  const offersByCity = favoriteOffers.reduce<OffersByCity>((acc, offer) => {
    const cityName = offer.city.name;

    if (!acc[cityName]) {
      acc[cityName] = [];
    }

    acc[cityName].push(offer);
    return acc;
  }, {});

  return (
    <div className="page">
      <Header />
      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <FavoritesList offersByCity={offersByCity} />
          </section>
        </div>
      </main>
      <footer className="footer container">
        <Link to='/' className="footer__logo-link">
          <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width="64" height="33"/>
        </Link>
      </footer>
    </div>
  );
}
