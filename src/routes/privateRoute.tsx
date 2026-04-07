import {Navigate} from 'react-router-dom';
import {useAppSelector} from '../hooks';
import {isAuthUser} from '../store/selectors';

type PrivateRouteProps = {
  children: JSX.Element;
}

function PrivateRoute(props: PrivateRouteProps) : JSX.Element {
  const isAuth = useAppSelector(isAuthUser);
  const {children} = props;

  return (
    isAuth
      ? children
      : <Navigate to={'/login'}/>
  );
}

export default PrivateRoute;
