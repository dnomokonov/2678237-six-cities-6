import {AuthorizationStatus} from '../const.ts';
import {Navigate} from 'react-router-dom';
import {useSelector} from 'react-redux';
import {selectAuthStatus} from '../store/offersSelectors.ts';

type PrivateRouteProps = {
  children: JSX.Element;
}

function PrivateRoute(props: PrivateRouteProps) : JSX.Element {
  const authStatus = useSelector(selectAuthStatus);
  const {children} = props;

  return (
    authStatus === AuthorizationStatus.AUTH
      ? children
      : <Navigate to={'/login'}/>
  );
}

export default PrivateRoute;
