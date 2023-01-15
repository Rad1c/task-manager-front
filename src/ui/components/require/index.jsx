import { useLocation, Navigate, Outlet } from "react-router-dom";

const RequireAuth = () => {
  const access = localStorage.getItem("access");

  return access ? <Outlet /> : <Navigate to="/login" />;
};

export default RequireAuth;
