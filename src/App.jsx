import Login from "./ui/Pages/login-page/";
import Register from "./ui/Pages/register-page/";
import Stories from "./ui/Pages/stories-page/";
import Error from "./ui/Pages/error-page";
import Story from "./ui/Pages/tasks-page";
import "./assets/css/fontawesome.css";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Layout from "./ui/components/layout";
import RequireAuth from "./ui/components/require";
import NonRequireAuth from "./ui/components/non-require";
import useLoginStore from "./store/loginStore";
import { NotificationContainer } from "@lanaco/lnc-react-ui";
import { AnimatePresence } from "framer-motion";

function App() {
  const { isUserLoggedIn } = useLoginStore();
  const location = useLocation();
  return (
    <div>
      <AnimatePresence mode="wait">
        <Routes key={location.pathname} location={location}>
          <Route path="/" element={<Layout />}>
            {/*private*/}
            <Route element={<RequireAuth />}>
              <Route path="" element={<Stories />} />
              <Route path="story/:id" element={<Story />} />
            </Route>

            {/* public */}
            <Route element={<NonRequireAuth />}>
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
            </Route>

            {/* catch all */}
            <Route path="/not-found" element={<Error />} />
            <Route path="*" element={<Error />} />
          </Route>
        </Routes>
        <NotificationContainer />
      </AnimatePresence>
    </div>
  );
}

export default App;
