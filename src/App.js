import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import DashboardLayout from "./components/DashboardLayout"; 
import Login from "./pages/login";
import Signup from "./pages/signup";
import Home from "./pages/home";
import NotFound from "./pages/NotFound"
import Database1 from "./pages/Dashboard-Test"
import TaskCalendar from "./components/TaskCalendar1";
// Example page

function App() {
  return (
    <Router>
      <Routes>
        {/* Layout applies only to pages that need Navbar & Footer */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          </Route>
        
        {/* Layout for Dashboard and Calendar */}
        <Route path="/" element={<DashboardLayout />}>
          <Route path="dashboard" element={<Database1 />} />
          <Route path="calendar" element={<TaskCalendar />} />
        </Route>
        {/* Login & Signup pages don't need Layout */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="dashboard" element={<Database1 />} />
        <Route path="/calendar" element={<TaskCalendar />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
