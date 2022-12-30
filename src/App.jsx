import Login from "./ui/Pages/login-page/";
import Register from "./ui/Pages/register-page/";
import Stories from "./ui/Pages/stories-page/";
import Error from "./ui/Pages/error-page";
import Story from "./ui/Pages/tasks-page";
import "./assets/css/fontawesome.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/stories/:storyId" element={<Story />} />
        <Route path="/stories" element={<Stories />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </Router>
  );
}

export default App;
