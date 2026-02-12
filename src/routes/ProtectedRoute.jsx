import { Navigate } from 'react-router-dom';
import { authService } from '../utils/authService';

export const ProtectedRoute = ({ children }) => {
  const isAuthenticated = authService.isAuthenticated();

  if (!isAuthenticated) {
    return <Navigate to="/signin" replace />;
  }

  return children;
};
