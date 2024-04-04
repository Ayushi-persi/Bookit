import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RouteProps, StateType } from '../utils/types';

const DoctorRoute = ({ children }: RouteProps) => {
  const token = useSelector((state: StateType) => state.authData.token);
  const role = useSelector((state: StateType) => state.authData.role);
  console.log(token, role);
  const isDoctor = token && (role === 'doctor' || role === 'admin');
  return isDoctor ? children : <Navigate to="/login" />;
};

export default DoctorRoute;

// import { Navigate } from 'react-router-dom';
// import { connect } from 'react-redux';
// import { RouteProps, StateType } from '../utils/types';
// import { ReactNode } from 'react';

// const DoctorRoute = ({ children, isAuth }: RouteProps): ReactNode => {
//   console.log(isAuth);
//   return isAuth ? children : <Navigate to="/login" />;
// };

// const mapStateToProps = (state: StateType) => ({
//   isAuth: Boolean(
//     state.authData.token &&
//       (state.authData.role === 'admin' || state.authData.role === 'doctor'),
//   ),
// });

// const DoctorRouteConnect = connect(mapStateToProps)(DoctorRoute);

// export default DoctorRouteConnect;
