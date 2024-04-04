import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RouteProps, StateType } from '../utils/types';

const AdminRoute = ({ children }: RouteProps) => {
  const token = useSelector((state: StateType) => state.authData.token);
  const role = useSelector((state: StateType) => state.authData.role);
  const isDoctor = token && role === 'admin';
  return isDoctor ? children : <Navigate to="/login" />;
};

export default AdminRoute;

// import { Navigate } from 'react-router-dom';
// import { connect } from 'react-redux';
// import { RouteProps, StateType } from '../utils/types';
// import { ReactNode } from 'react';

// const AdminRoute = ({ children, isAuth }: RouteProps): ReactNode => {
//   console.log(isAuth);
//   return isAuth ? children : <Navigate to="/login" />;
// };

// const mapStateToProps = (state: StateType) => ({
//   isAuth: Boolean(state.authData.token && state.authData.role === 'admin'),
// });

// const AdminRouteConnect = connect(mapStateToProps)(AdminRoute);

// export default AdminRouteConnect;
