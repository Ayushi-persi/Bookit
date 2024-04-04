import { Routes, Route } from 'react-router-dom';
import LandingPage from '../pages/LandingPage';
import AdminPage from '../pages/admin/AdminPage';
import PatientPage from '../pages/patient/PatientPage';
import DoctorPage from '../pages/doctor/DoctorPage';
import LoginPage from '../pages/auth/LoginPage';
import AdminRoute from './AdminRoute';
import DoctorRoute from './DoctorRoute';
import LogoutPage from '../pages/auth/LogoutPage';
import AddQualification from '../pages/doctor/AddQualification';
import ViewQualification from '../pages/doctor/ViewQualification';
import AddDoctor from '../pages/doctor/AddDoctor';
import ViewDoctors from '../pages/doctor/ViewDoctors';
import GetAvailability from '../pages/doctor/GetAvailability';
import GetSchedule from '../pages/doctor/GetSchedule';

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
      <Route
        path="/addQualification"
        element={
          <AdminRoute>
            <AddQualification />
          </AdminRoute>
        }
      />
      <Route
        path="/viewQualification"
        element={
          <AdminRoute>
            <ViewQualification />
          </AdminRoute>
        }
      />
      <Route
        path="/addDoctor"
        element={
          <AdminRoute>
            <AddDoctor />
          </AdminRoute>
        }
      />
      <Route
        path="/viewDoctors"
        element={
          <AdminRoute>
            <ViewDoctors />
          </AdminRoute>
        }
      />
      <Route
        path="/getSchedule"
        element={
          <DoctorRoute>
            <GetSchedule />
          </DoctorRoute>
        }
      />
      <Route
        path="/getAvailability"
        element={
          <DoctorRoute>
            <GetAvailability />
          </DoctorRoute>
        }
      />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/logout" element={<LogoutPage />} />
    </Routes>
  );
};

export default AppRouter;
