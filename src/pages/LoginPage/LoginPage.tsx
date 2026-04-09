import {HeaderLogin} from '../../components/Header/HeaderLogin.tsx';
import {LoginForm} from '../../components/LoginForm/LoginForm.tsx';

export function LoginPage() {
  return (
    <div className="page page--gray page--login">
      <HeaderLogin />
      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title" data-testid="form-header">Sign in</h1>
            <LoginForm />
          </section>
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <a className="locations__item-link" href="#">
                <span>Amsterdam</span>
              </a>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
