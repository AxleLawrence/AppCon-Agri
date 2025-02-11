import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Login from "./pages/login";
import Signup from "./pages/signup";
import Home from "./pages/home";
import Dashboard from "./pages/Dashboard"; // Example page

function App() {
  return (
    <Router>
      <Routes>
        {/* Layout applies only to pages that need Navbar & Footer */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          
        </Route>

        {/* Login & Signup pages don't need Layout */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
