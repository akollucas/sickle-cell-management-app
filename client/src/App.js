import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/common/ProtectedRoute';
import Navbar from './components/common/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import Dashboard from './components/dashboard/Dashboard';
import CrisisForm from './components/crisis/CrisisForm';
import MedicationList from './components/medication/MedicationList';
import WaterTracker from './components/nutrition/WaterTracker';
import AppointmentScheduler from './components/appointments/AppointmentScheduler';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <Toaster position="top-right" />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/crisis" element={<ProtectedRoute><CrisisForm /></ProtectedRoute>} />
            <Route path="/medications" element={<ProtectedRoute><MedicationList /></ProtectedRoute>} />
            <Route path="/nutrition" element={<ProtectedRoute><WaterTracker /></ProtectedRoute>} />
            <Route path="/appointments" element={<ProtectedRoute><AppointmentScheduler /></ProtectedRoute>} />
          </Routes>
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;