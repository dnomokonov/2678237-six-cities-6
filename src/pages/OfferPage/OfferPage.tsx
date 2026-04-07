import {ReviewForm} from '../../components/ReviewForm/ReviewForm.tsx';
import {useNavigate, useParams} from 'react-router-dom';
import {ReviewsList} from '../../components/ReviewsList/ReviewsList.tsx';
import {Map} from '../../components/Map/Map.tsx';
import {OffersList} from '../../components/OffersList/OffersList.tsx';
import {useEffect, useState} from 'react';
import {Offer} from '../../types/offer.ts';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {
  isAuthUser,
  selectCommentsOffer,
  selectIsOfferLoading, selectNearbyOffers,
  selectOfferById
} from '../../store/selectors';
import {Header} from '../../components/Header/Header.tsx';
import {fetchCommentsAction, fetchNearbyOffersAction, fetchOfferByIdAction} from '../../store/actions/apiActions.ts';
import {resetOfferById} from '../../store/slices/offerSlice.ts';
import {Loader} from '../../components/Loader/Loader.tsx';
import {AppRoute} from '../../const.ts';
import {getRatingPercent} from '../../utils/utils.ts';

export function OfferPage() {
  const [activeOffer, setActiveOffer] = useState<Offer | null>(null);
  const isAuthenticated = useAppSelector(isAuthUser);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { id } = useParams();

  const currentOffer = useAppSelector(selectOfferById);
  const commentsOffer = useAppSelector(selectCommentsOffer);
  const nearbyOffer = useAppSelector(selectNearbyOffers);

  const isLoading = useAppSelector(selectIsOfferLoading);

  useEffect(() => {
    if (id) {
      dispatch(fetchOfferByIdAction(id))
        .unwrap()
        .catch(() => {
          navigate(AppRoute.NotFound);
        });

      dispatch(fetchCommentsAction(id));
      dispatch(fetchNearbyOffersAction(id));
    }

    return () => {
      dispatch(resetOfferById());
    };
  }, [id, dispatch, navigate]);

  if (isLoading || !currentOffer) {
    return <Loader/>;
  }

  const ratingPercent = getRatingPercent(currentOffer.rating);
  const host = currentOffer.host;
  const cityForMap = nearbyOffer.length > 0 ? nearbyOffer[0].city : null;

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
              {currentOffer.images.map((image) => (
                <div key={image} className="offer__image-wrapper">
                  <img className="offer__image" src={image} alt="Photo studio"/>
                </div>
              ))}
            </div>
          </div>
          <div className="offer__container container">
            <div className="offer__wrapper">
              {currentOffer.isPremium && (
                <div className="offer__mark">
                  <span>Premium</span>
                </div>
              )}
              <div className="offer__name-wrapper">
                <h1 className="offer__name">
                  {currentOffer.title}
                </h1>
                <button
                  className={
                    `offer__bookmark-button
                    ${currentOffer.isFavorite && 'offer__bookmark-button--active'}
                    button`
                  }
                  type="button"
                >
                  <svg className="offer__bookmark-icon" width="31" height="33">
                    <use xlinkHref="#icon-bookmark"></use>
                  </svg>
                  <span className="visually-hidden">To bookmarks</span>
                </button>
              </div>
              <div className="offer__rating rating">
                <div className="offer__stars rating__stars">
                  <span style={{width: ratingPercent}}></span>
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
                  {currentOffer.goods.map((item) => (
                    <li key={item} className="offer__inside-item">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="offer__host">
                <h2 className="offer__host-title">Meet the host</h2>
                <div className="offer__host-user user">
                  <div className="offer__avatar-wrapper offer__avatar-wrapper--pro user__avatar-wrapper">
                    <img className="offer__avatar user__avatar" src={host.avatarUrl} width="74" height="74"
                      alt="Host avatar"
                    />
                  </div>
                  <span className="offer__user-name">
                    {host.name}
                  </span>
                  {host.isPro && (
                    <span className="offer__user-status">Pro</span>
                  )}
                </div>
                <div className="offer__description">
                  <p className="offer__text">
                    {currentOffer.description}
                  </p>
                </div>
              </div>
              <section className="offer__reviews reviews">
                <ReviewsList reviews={commentsOffer} />
                {isAuthenticated && (
                  <ReviewForm offerId={id!}/>
                )}
              </section>
            </div>
          </div>
          <section className="offer__map map">
            <Map city={cityForMap} offers={nearbyOffer} selectedOffer={activeOffer} />
          </section>
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <OffersList
              offers={nearbyOffer}
              variant='near'
              onCardHover={handleCardHover}
            />
          </section>
        </div>
      </main>
    </div>
  );
}
