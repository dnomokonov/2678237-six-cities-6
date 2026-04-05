import {AuthorizationStatus} from '../const.ts';
import {Navigate} from 'react-router-dom';
import {useAppSelector} from '../hooks';
import {selectAuthStatus} from '../store/selectors';

type PrivateRouteProps = {
  children: JSX.Element;
}

function PrivateRoute(props: PrivateRouteProps) : JSX.Element {
  const authStatus = useAppSelector(selectAuthStatus);
  const {children} = props;

  return (
    authStatus === AuthorizationStatus.AUTH
      ? children
      : <Navigate to={'/login'}/>
  );
}

export default PrivateRoute;
