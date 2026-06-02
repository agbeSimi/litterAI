import React from 'react';
import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const ProtectedProfRoute = ({ children }) => {
  const token = localStorage.getItem('token');

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  try {
    const decodedToken = jwtDecode(token);
    const userRoles = decodedToken.roles || [];

    // Si c'est un prof, on affiche directement la page (children)
    if (userRoles.includes('USER_ROLE_PROFESSEUR')) {
      return children;
    }
  } catch (error) {
    // Si le token est expiré ou corrompu
    localStorage.removeItem('token');
    return <Navigate to="/login" replace />;
  }

  // Si le try s'est exécuté mais que le rôle n'y était pas, on arrive ici
  return (
    <div style={{ textAlign: 'center', marginTop: '50px', fontFamily: 'sans-serif' }}>
      <h1 style={{ color: '#dc3545' }}>Accès refusé</h1>
      <p>Cette page est strictement réservée aux enseignants.</p>
    </div>
  );
};

export default ProtectedProfRoute;