import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Create from "./pages/Create";
import Saved from "./pages/Saved";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { useCookies } from "react-cookie";
function App() {
  const [cookies, setCookies] = useCookies(["access_token"]);
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        {cookies.access_token && (
          <>
            <Route path="/create" element={<Create />} />
            <Route path="/saved" element={<Saved />} />{" "}
          </>
        )}

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
  );
}

export default App;
