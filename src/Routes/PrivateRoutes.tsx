import { Navigate, Outlet } from 'react-router';
import { useAuthStore } from '../store/authZustandStore';

const PrivateRoutes = () => {
  const isAuntenticated = useAuthStore((state) => state.isAuthenticated);
  
  console.log('isAuntenticated', isAuntenticated);

  return isAuntenticated
    ? <Outlet />
    : <Navigate to="/products-list" replace />;
};

export default PrivateRoutes;
