import { Outlet } from "react-router-dom";
import LngChange from "../lng-change";

const Layout = () => {
  return (
    <main>
      <LngChange />
      <Outlet />
    </main>
  );
};

export default Layout;
