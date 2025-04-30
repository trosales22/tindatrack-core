import { Route, Routes } from "react-router-dom";
import './App.css'
import Wrapper from 'components/Wrapper'
import LoginPage from "pages/Login";
import Homepage from "pages/Home";
import NotFound from "components/NotFound";
import BusinessDetailPage from "pages/BusinessDetail";
import ProtectedRoute from "components/ProtectedRoute";
import { ROLES } from "constants/roles";
import RegisterPage from "pages/Register";
import SummaryReportPage from "pages/SummaryReport";
import SettingsPage from "pages/Settings";
import Toast from "components/ui/Toast";
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <Wrapper>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route element={<ProtectedRoute allowedRoles={[ROLES.BUSINESS_ADMIN]} />}>
          <Route path="/" element={<Homepage />} />
          <Route path="/businesses/:id" element={<BusinessDetailPage />} />
          <Route path="/summary-report" element={<SummaryReportPage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Route>
        
        <Route path="*" element={<NotFound />} />
      </Routes>

      <Toast />
      <Toaster />
    </Wrapper>
  )
}

export default App
