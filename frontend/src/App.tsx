import { Routes, Route } from 'react-router-dom';
import Landing from './features/landing/Landing';
import Login from './features/auth/Login';
import ParentLogin from './features/parents/ParentLogin';
import TeacherDashboard from './features/teachers/TeacherDashboard';
import AdminDashboard from './features/admin/AdminDashboard';
import RegisterIncident from './features/teachers/RegisterIncident';
import ProtectedRoute from './core/components/ProtectedRoute';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/padres" element={<ParentLogin />} />
      <Route element={<ProtectedRoute roles={['TEACHER']} />}> 
        <Route path="/profesor" element={<TeacherDashboard />} />
        <Route path="/profesor/incidentes/nuevo" element={<RegisterIncident />} />
      </Route>
      <Route element={<ProtectedRoute roles={['ADMIN']} />}> 
        <Route path="/admin" element={<AdminDashboard />} />
      </Route>
    </Routes>
  );
}
