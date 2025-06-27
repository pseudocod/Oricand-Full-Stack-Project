import { Navigate } from "react-router-dom";
import { useAuth } from "../context/UserContext";
import FullPageLoader from "../components/ui/FullPageLoader";

export default function AdminRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return <FullPageLoader />;
  }
  if (!user || user.role !== "ROLE_ADMIN") {
    return <Navigate to="/" />;
  }

  return children;
}
