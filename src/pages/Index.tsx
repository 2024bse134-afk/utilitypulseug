import { useAuth } from "@/contexts/AuthContext";
import { Navigate } from "react-router-dom";
import UtilitySelection from "./UtilitySelection";

export default function Index() {
  const { user, isAdmin, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  // Admin users go directly to admin dashboard
  if (isAdmin) {
    return <Navigate to="/admin" replace />;
  }

  return <UtilitySelection />;
}
