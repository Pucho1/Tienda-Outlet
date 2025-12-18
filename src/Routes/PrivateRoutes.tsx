import { Navigate, Outlet } from 'react-router';
import { useAuthStore } from '../store/authZustandStore';

const PrivateRoutes = () => {
  const { isAuthenticated } = useAuthStore();
  

  return isAuthenticated
    ? <Outlet />
    : <Navigate to="/products-list" replace />;
};

export default PrivateRoutes;
