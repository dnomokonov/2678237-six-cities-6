import {Link} from 'react-router-dom';
import {AppRoute, AuthorizationStatus} from '../../const.ts';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {selectAuthStatus, selectCountFavorites, selectUserData} from '../../store/selectors';
import {logoutAction} from '../../store/actions/apiActions.ts';
import {useSelector} from 'react-redux';

export function Header(): JSX.Element {
  const authStatus = useAppSelector(selectAuthStatus);
  const isAuth = authStatus === AuthorizationStatus.AUTH;

  const dispatch = useAppDispatch();
  const {email} = useAppSelector(selectUserData);
  const countFavorites = useSelector(selectCountFavorites);

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Link
              to={AppRoute.Root}
              className="header__logo-link"
            >
              <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41"/>
            </Link>
          </div>
          <nav className="header__nav">
            <ul className="header__nav-list">
              {isAuth ? (
                <>
                  <li className="header__nav-item user">
                    <a className="header__nav-link header__nav-link--profile" href="#">
                      <div className="header__avatar-wrapper user__avatar-wrapper">
                      </div>
                      <span className="header__user-name user__name">{email}</span>
                      <span className="header__favorite-count">{countFavorites}</span>
                    </a>
                  </li>
                  <li className="header__nav-item">
                    <Link
                      to={AppRoute.Root}
                      onClick={(evt) => {
                        evt.preventDefault();
                        dispatch(logoutAction());
                      }}
                      className="header__nav-link"
                    >
                      <span className="header__signout">Sign out</span>
                    </Link>
                  </li>
                </>
              ) : (
                <li className="header__nav-item user">
                  <Link
                    to={AppRoute.Login}
                    className="header__nav-link header__nav-link--profile"
                  >
                    <div className="header__avatar-wrapper user__avatar-wrapper">
                    </div>
                    <span className="header__login">Sign in</span>
                  </Link>
                </li>
              )}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}
