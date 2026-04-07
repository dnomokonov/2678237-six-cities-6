import {ChangeEvent, FormEvent, Fragment, useState} from 'react';
import {DEFAULT_RATING, MIN_LENGTH} from '../../const.ts';
import {useAppDispatch} from '../../hooks';
import {fetchNewCommentAction} from '../../store/actions/apiActions.ts';
import toast from 'react-hot-toast';

interface ReviewFormProps {
  offerId: string;
}

const STARS_RATING: Record<string, number> = {
  'perfect': 5,
  'good': 4,
  'not bad': 3,
  'badly': 2,
  'terribly': 1,
};

const INITIAL_FORM_DATA = {
  rating: DEFAULT_RATING,
  review: '',
};

export function ReviewForm({offerId} : ReviewFormProps) {
  const [formData, setFormData] = useState(INITIAL_FORM_DATA);
  const [isSending, setIsSending] = useState(false);
  const dispatch = useAppDispatch();

  const isValidForm = formData.rating > DEFAULT_RATING && formData.review.length >= MIN_LENGTH;

  const handleRatingChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    setFormData({...formData, rating: value});
  };

  const handleReviewChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setFormData({...formData, review: value});
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSending(true);

    const commentData = {
      comment: formData.review,
      rating: formData.rating,
    };

    const result = await dispatch(fetchNewCommentAction({
      offerId,
      commentData,
    }));

    if (fetchNewCommentAction.fulfilled.match(result)) {
      setFormData(INITIAL_FORM_DATA);
    } else {
      const messageError = String(result.error.message);
      toast.error(messageError);
    }

    setIsSending(false);
  };

  return (
    <form className="reviews__form form" onSubmit={(evt) => void handleSubmit(evt)} method="post">
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        {Object.entries(STARS_RATING).map(([title, stars]) => (
          <Fragment key={stars}>
            <input
              className="form__rating-input visually-hidden"
              name="rating"
              id={`${stars}-stars`}
              type="radio"
              value={stars}
              onChange={handleRatingChange}
              checked={formData.rating === stars}
            />
            <label htmlFor={`${stars}-stars`} className="reviews__rating-label form__rating-label" title={title}>
              <svg className="form__star-image" width="37" height="33">
                <use xlinkHref="#icon-star"></use>
              </svg>
            </label>
          </Fragment>
        ))}
      </div>
      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        onChange={handleReviewChange}
        value={formData.review}
        placeholder="Tell how was your stay, what you like and what can be improved"
      />
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and
          describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled={!isValidForm || isSending}
        >
          {isSending ? 'Sending...' : 'Submit'}
        </button>
      </div>
    </form>
  );
}
