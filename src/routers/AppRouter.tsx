import { Routes, Route } from 'react-router-dom';
import LandingPage from '../pages/LandingPage';
import AdminPage from '../pages/admin/AdminPage';
import PatientPage from '../pages/patient/PatientPage';
import DoctorPage from '../pages/doctor/DoctorPage';
import LoginPage from '../pages/auth/LoginPage';
import AdminRoute from './AdminRoute';
import DoctorRoute from './DoctorRoute';
import LogoutPage from '../pages/auth/LogoutPage';

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route
        path="/admin"
        element={
          <AdminRoute>
            <AdminPage />
          </AdminRoute>
        }
      />
      <Route path="/patient" element={<PatientPage />} />
      <Route
        path="/doctor"
        element={
          <DoctorRoute>
            <DoctorPage />
          </DoctorRoute>
        }
      />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/logout" element={<LogoutPage />} />
    </Routes>
  );
};

export default AppRouter;
