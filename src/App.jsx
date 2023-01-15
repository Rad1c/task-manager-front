import Login from "./ui/Pages/login-page/";
import Register from "./ui/Pages/register-page/";
import Stories from "./ui/Pages/stories-page/";
import Error from "./ui/Pages/error-page";
import Story from "./ui/Pages/tasks-page";
import "./assets/css/fontawesome.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./ui/components/layout";
import RequireAuth from "./ui/components/require";
import NonRequireAuth from "./ui/components/non-require";

function App() {
  return (
    <Routes>
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
        <Route path="*" element={<Error />} />
      </Route>
    </Routes>
  );
}

export default App;
