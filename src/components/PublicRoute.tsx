import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from 'context/AuthContext';

const PublicRoute: React.FC = () => {
  const { user } = useAuth();

  if (user.isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default PublicRoute;
