import { Navigate, Outlet, NavigateProps, useLocation } from 'react-router-dom';

export interface ProtectedRouteProps {
  isAllowed: boolean;
  redirectTo?: NavigateProps['to'];
}

const ProtectedRoute = ({ isAllowed, redirectTo = '/' }: ProtectedRouteProps) => {
  const location = useLocation();

  if (!isAllowed) return <Navigate to={redirectTo} state={{ from: location }} replace />;

  return <Outlet />;
};

export default ProtectedRoute;
