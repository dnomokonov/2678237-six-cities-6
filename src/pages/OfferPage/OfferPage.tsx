import {ReviewForm} from '../../components/ReviewForm/ReviewForm.tsx';
import {useNavigate, useParams} from 'react-router-dom';
import {ReviewsList} from '../../components/ReviewsList/ReviewsList.tsx';
import {REVIEWS_MOCK} from '../../mocks/reviews.ts';
import {Map} from '../../components/Map/Map.tsx';
import {OffersList} from '../../components/OffersList/OffersList.tsx';
import {useEffect, useState} from 'react';
import {Offer} from '../../types/offer.ts';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {selectAllOffers, selectIsOfferLoading, selectOfferById} from '../../store/selectors';
import {Header} from '../../components/Header/Header.tsx';
import {fetchOfferByIdAction} from '../../store/actions/apiActions.ts';
import {resetOfferById} from '../../store/slices/offerSlice.ts';
import {Loader} from '../../components/Loader/Loader.tsx';
import {AppRoute} from '../../const.ts';

export function OfferPage() {
  const [activeOffer, setActiveOffer] = useState<Offer | null>(null);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { id } = useParams();
  const offers = useAppSelector(selectAllOffers);
  const currentOffer = useAppSelector(selectOfferById);
  const isLoading = useAppSelector(selectIsOfferLoading);

  useEffect(() => {
    if (id) {
      dispatch(fetchOfferByIdAction(id))
        .unwrap()
        .catch(() => {
          navigate(AppRoute.NotFound);
        });
    }

    return () => {
      dispatch(resetOfferById());
    };
  }, [id, dispatch, navigate]);

  if (isLoading || !currentOffer) {
    return <Loader/>;
  }

  const filteredOffers = offers.filter((offer: Offer) => offer.id !== id);
  const cityForMap = filteredOffers.length > 0 ? filteredOffers[0].city : null;

  const handleCardHover = (offer: Offer | null) => {
    setActiveOffer(offer);
  };

  return (
    <div className="page">
      <Header />
      <main className="page__main page__main--offer">
        <section className="offer">
          <div className="offer__gallery-container container">
            <div className="offer__gallery">
              <div className="offer__image-wrapper">
                <img className="offer__image" src="img/room.jpg" alt="Photo studio"/>
              </div>
              <div className="offer__image-wrapper">
                <img className="offer__image" src="img/apartment-01.jpg" alt="Photo studio"/>
              </div>
              <div className="offer__image-wrapper">
                <img className="offer__image" src="img/apartment-02.jpg" alt="Photo studio"/>
              </div>
              <div className="offer__image-wrapper">
                <img className="offer__image" src="img/apartment-03.jpg" alt="Photo studio"/>
              </div>
              <div className="offer__image-wrapper">
                <img className="offer__image" src="img/studio-01.jpg" alt="Photo studio"/>
              </div>
              <div className="offer__image-wrapper">
                <img className="offer__image" src="img/apartment-01.jpg" alt="Photo studio"/>
              </div>
            </div>
          </div>
          <div className="offer__container container">
            <div className="offer__wrapper">
              <div className="offer__mark">
                <span>Premium</span>
              </div>
              <div className="offer__name-wrapper">
                <h1 className="offer__name">
                  {currentOffer.title}
                </h1>
                <button className="offer__bookmark-button button" type="button">
                  <svg className="offer__bookmark-icon" width="31" height="33">
                    <use xlinkHref="#icon-bookmark"></use>
                  </svg>
                  <span className="visually-hidden">To bookmarks</span>
                </button>
              </div>
              <div className="offer__rating rating">
                <div className="offer__stars rating__stars">
                  <span style={{width: '80%'}}></span>
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="offer__rating-value rating__value">{currentOffer.rating}</span>
              </div>
              <ul className="offer__features">
                <li className="offer__feature offer__feature--entire">
                  {currentOffer.type}
                </li>
                <li className="offer__feature offer__feature--bedrooms">
                  {currentOffer.bedrooms} Bedrooms
                </li>
                <li className="offer__feature offer__feature--adults">
                    Max {currentOffer.maxAdults} adults
                </li>
              </ul>
              <div className="offer__price">
                <b className="offer__price-value">&euro;{currentOffer.price}</b>
                <span className="offer__price-text">&nbsp;night</span>
              </div>
              <div className="offer__inside">
                <h2 className="offer__inside-title">What&apos;s inside</h2>
                <ul className="offer__inside-list">
                  <li className="offer__inside-item">
                      Wi-Fi
                  </li>
                  <li className="offer__inside-item">
                      Washing machine
                  </li>
                  <li className="offer__inside-item">
                      Towels
                  </li>
                  <li className="offer__inside-item">
                      Heating
                  </li>
                  <li className="offer__inside-item">
                      Coffee machine
                  </li>
                  <li className="offer__inside-item">
                      Baby seat
                  </li>
                  <li className="offer__inside-item">
                      Kitchen
                  </li>
                  <li className="offer__inside-item">
                      Dishwasher
                  </li>
                  <li className="offer__inside-item">
                      Cabel TV
                  </li>
                  <li className="offer__inside-item">
                      Fridge
                  </li>
                </ul>
              </div>
              <div className="offer__host">
                <h2 className="offer__host-title">Meet the host</h2>
                <div className="offer__host-user user">
                  <div className="offer__avatar-wrapper offer__avatar-wrapper--pro user__avatar-wrapper">
                    <img className="offer__avatar user__avatar" src="img/avatar-angelina.jpg" width="74" height="74"
                      alt="Host avatar"
                    />
                  </div>
                  <span className="offer__user-name">
                    Angelina
                  </span>
                  <span className="offer__user-status">
                    Pro
                  </span>
                </div>
                <div className="offer__description">
                  <p className="offer__text">
                      A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The
                      building is green and from 18th century.
                  </p>
                  <p className="offer__text">
                      An independent House, strategically located between Rembrand Square and National Opera, but where
                      the bustle of the city comes to rest in this alley flowery and colorful.
                  </p>
                </div>
              </div>
              <section className="offer__reviews reviews">
                <ReviewsList reviews={REVIEWS_MOCK} />
                <ReviewForm />
              </section>
            </div>
          </div>
          <section className="offer__map map">
            <Map city={cityForMap} offers={filteredOffers} selectedOffer={activeOffer} />
          </section>
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <OffersList
              offers={filteredOffers}
              variant='near'
              onCardHover={handleCardHover}
            />
          </section>
        </div>
      </main>
    </div>
  );
}
