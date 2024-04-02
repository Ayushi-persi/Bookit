import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RouteProps, StateType } from '../utils/types';

const DoctorRoute = ({ children }: RouteProps) => {
  const token = useSelector((state: StateType) => state.authData.token);
  const role = useSelector((state: StateType) => state.authData.role);
  console.log(token, role);
  const isAdmin = token && (role === 'admin' || role === 'doctor');
  return isAdmin ? children : <Navigate to="/login" />;
};

export default DoctorRoute;
