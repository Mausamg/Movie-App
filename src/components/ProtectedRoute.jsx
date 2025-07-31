"use client";

import { Navigate, useLocation } from "react-router";
import { useAuth } from "../context/useAuth";

/**
 * Protected route component that redirects to login if user is not authenticated
 * @param {Object} props
 * @param {React.ReactNode} props.children - Child components to render when authenticated
 */
export default function ProtectedRoute({ children }) {
  const { user, isLoading } = useAuth();
  const location = useLocation();

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-900">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Render children if authenticated
  return <>{children}</>;
}
