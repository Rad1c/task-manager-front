import { useLocation, Navigate, Outlet } from "react-router-dom";

const NonRequireAuth = () => {
  const access = localStorage.getItem("access");

  return !access ? <Outlet /> : <Navigate to="/" />;
};

export default NonRequireAuth;
