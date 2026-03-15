import {OffersByCity} from '../../types/offer.ts';
import {FavoriteOfferCard} from '../FavoriteOfferCard/FavoriteOfferCard.tsx';

type FavoritesListProps = {
  offersByCity: OffersByCity;
}

export function FavoritesList({offersByCity}: FavoritesListProps) {
  return (
    <ul className="favorites__list">
      {Object.entries(offersByCity).map(([name, offers]) => (
        <li className="favorites__locations-items" key={name}>
          <div className="favorites__locations locations locations--current">
            <div className="locations__item">
              <a className="locations__item-link" href="#">
                <span>{name}</span>
              </a>
            </div>
          </div>
          <div className="favorites__places">
            {offers.map((offer) => (
              <FavoriteOfferCard offer={offer} key={offer.id} />
            ))}
          </div>
        </li>
      ))}
    </ul>
  );
}
