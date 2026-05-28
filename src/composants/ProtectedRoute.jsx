import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoute() {
  const token = localStorage.getItem("jwt_token");

  // Si pas de token, on redirige vers l'accueil/login
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Si tout est bon, on laisse passer vers la route enfant demandée
  return <Outlet />;
}

export default ProtectedRoute;