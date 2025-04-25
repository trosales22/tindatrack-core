import { Route, Routes } from "react-router-dom";
import './App.css'
import Wrapper from 'components/Wrapper'
import LoginPage from "pages/Login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Homepage from "pages/Home";
import NotFound from "components/NotFound";
import BusinessDetailPage from "pages/BusinessDetail";
import ProtectedRoute from "components/ProtectedRoute";
import { ROLES } from "constants/roles";
import RegisterPage from "pages/Register";
import PublicRoute from "components/PublicRoute";

function App() {
  return (
    <Wrapper>
      <Routes>
        <Route element={<PublicRoute />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>

        <Route element={<ProtectedRoute allowedRoles={[ROLES.BUSINESS_ADMIN]} />}>
          <Route path="/" element={<Homepage />} />
          <Route path="/businesses/:id" element={<BusinessDetailPage />} />
        </Route>
        
        <Route path="*" element={<NotFound />} />
      </Routes>
      <ToastContainer />
    </Wrapper>
  )
}

export default App
