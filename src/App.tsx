import { Route, Routes } from "react-router-dom";
import './App.css'
import Wrapper from 'components/Wrapper'
import LoginPage from "pages/Login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Homepage from "pages/Home";

function App() {
  return (
    <Wrapper>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<Homepage />} />
      </Routes>

      <ToastContainer />
    </Wrapper>
  )
}

export default App
