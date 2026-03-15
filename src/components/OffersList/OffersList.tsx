import {Offer} from '../../types/offer.ts';
import {OfferCard} from '../OfferCard/OfferCard.tsx';

type ListOffersProps = {
  offers: Offer[];
  onCardHover?: (offer: Offer | null) => void;
}

export function OffersList({offers, onCardHover}: ListOffersProps) {
  return (
    <div className="cities__places-list places__list tabs__content">
      {offers.map((offer) => (
        <OfferCard
          offer={offer}
          onCardHover={onCardHover}
          key={offer.id}
        />
      ))}
    </div>
  );
}
