import { Navigate } from "react-router-dom";
import FullPageLoader from "../components/ui/FullPageLoader";
import { useAuth } from "../context/UserContext";

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return <FullPageLoader />;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
