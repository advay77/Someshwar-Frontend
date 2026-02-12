import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // Import useAuth hook

const ProtectedRoute = () => {
  const { isAdmin, loading } = useAuth(); // Destructure isAdmin and loading from useAuth

  if (loading) {
    return <div>Loading authentication...</div>; // Or a spinner
  }

  if (!isAdmin) {
    // Redirect to login, but save the current location they were trying to go to
    return <Navigate to="/admin/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;