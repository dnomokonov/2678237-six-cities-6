import {FormEvent, useRef} from 'react';
import {useAppDispatch} from '../../hooks';
import {loginAction} from '../../store/actions/apiActions.ts';
import {useNavigate} from 'react-router-dom';
import {AppRoute, regexForm} from '../../const.ts';
import toast from 'react-hot-toast';

export function LoginForm() {
  const loginRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (loginRef.current !== null && passwordRef.current !== null) {
      const result = await dispatch(loginAction({
        login: loginRef.current.value,
        password: passwordRef.current.value
      }));

      if (loginAction.fulfilled.match(result)) {
        toast.success('Login successful');
        navigate(AppRoute.Root);
      }
    }
  };

  return (
    <form
      className="login__form form"
      action=""
      onSubmit={(evt) => void handleSubmit(evt)}
      method="post"
    >
      <div className="login__input-wrapper form__input-wrapper">
        <label className="visually-hidden">E-mail</label>
        <input
          ref={loginRef}
          className="login__input form__input"
          type="email" name="email"
          placeholder="Email"
          data-testid="login-input"
          required
        />
      </div>
      <div className="login__input-wrapper form__input-wrapper">
        <label className="visually-hidden">Password</label>
        <input
          ref={passwordRef}
          pattern={regexForm}
          className="login__input form__input"
          type="password"
          name="password"
          placeholder="Password"
          data-testid="password-input"
          required
        />
      </div>
      <button
        className="login__submit form__submit button"
        type="submit"
        data-testid="submit-button"
      >
        Sign in
      </button>
    </form>
  );
}

