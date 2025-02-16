import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import DashboardLayout from "./components/DashboardLayout"; 
import Login from "./pages/login";
import Signup from "./pages/signup";
import Home from "./pages/home";
import Database1 from "./pages/Dashboard-Test";
import TaskCalendar from "./components/TaskCalendar1";
import PrivateRoute from "./components/PrivateRoute";
import NotFound from "./pages/NotFound"; // Ensure this exists

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
        </Route>

        {/* Authentication Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protected Routes for Dashboard */}
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<DashboardLayout />}>
            <Route path="dashboard" element={<Database1 />} />
            <Route path="calendar" element={<TaskCalendar />} />
          </Route>
        </Route>

        {/* Catch-All Route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
