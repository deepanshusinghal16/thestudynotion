import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from './pages/Home';
import Navbar from "./components/common/Navbar";
import OpenRoute from "./components/core/Auth/OpenRoute";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import UpdatePassword from "./pages/UpdatePassword";
import VerifyEmail from "./pages/VerifyEmail";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import Error from "./pages/Error";
function App() {
  return (
    <div className="w-screen min-h-screen bg-richblack-900 flex flex-col font-inter  ">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="signup" element={
          <OpenRoute>
            <Signup />
          </OpenRoute>
        }
        />
        <Route path="login" element={
          <OpenRoute>
            <Login />
          </OpenRoute>
        }
        />
        <Route path="forgot-password" element={
          <OpenRoute>
            <ForgotPassword />
          </OpenRoute>
        }
        />
        <Route path="update-password/:id" element={
          <OpenRoute>
            <UpdatePassword />
          </OpenRoute>
        }
        />
        <Route path="verify-email" element={
          <OpenRoute>
            <VerifyEmail />
          </OpenRoute>
        }
        />
        <Route path="about" element={
          <OpenRoute>
            <AboutUs />
          </OpenRoute>
        }
        />

        <Route path="contact" element={
          <OpenRoute>
            <ContactUs />
          </OpenRoute>
        }
        />

        <Route path="error" element={
          <OpenRoute>
            <Error />
          </OpenRoute>
        }
        />

      </Routes>
    </div>
  );
}

export default App;

