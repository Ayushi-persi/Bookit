import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RouteProps, StateType } from '../utils/types';

const AdminRoute = ({ children }: RouteProps) => {
  const token = useSelector((state: StateType) => state.authData.token);
  const role = useSelector((state: StateType) => state.authData.role);
  const isAdmin = token && role === 'admin';
  return isAdmin ? children : <Navigate to="/login" />;
};

export default AdminRoute;
