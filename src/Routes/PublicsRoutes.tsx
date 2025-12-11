
import { Navigate, Outlet } from "react-router-dom";

import { useAuthStore } from "../store/authZustandStore";

const PublicRoute = () => {

  const isAuntenticated = useAuthStore((state) => state.isAuthenticated);

  return !isAuntenticated 
    ? <Outlet />
    : <Navigate to="/products-list" replace />;
};

export default PublicRoute;
