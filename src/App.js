import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from './pages/Home';
import Navbar from "./components/common/Navbar";
import OpenRoute from "./components/core/Auth/OpenRoute";
import ProtectedRoute from './components/core/Auth/ProtectedRoute';
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import UpdatePassword from "./pages/UpdatePassword";
import VerifyEmail from "./pages/VerifyEmail";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import Error from "./pages/Error";
import MyProfile from "./components/core/Dashboard/MyProfile";
import Dashboard from "./pages/Dashboard";
import Settings from "./components/core/Dashboard/Setting/Settings";
import EnrolledCourses from "./components/core/Dashboard/EnrolledCourses";
import Cart from "./components/core/Dashboard/Cart";
import { ACCOUNT_TYPE } from './utils/constants';
import { useSelector } from "react-redux";
import AddCourse from "./components/core/Dashboard/AddCourse";
import MyCourses from "./components/core/Dashboard/MyCourses";
import EditCourse from "./components/core/Dashboard/EditCourse/EditCourse";
import Catalog from "./pages/Catalog";
import CourseDetails from "./pages/CourseDetails";
import ViewCourse from "./pages/ViewCourse";
import VideoDetails from "./components/core/ViewCourse/VideoDetails";

function App() {

  const { user } = useSelector((state) => state.profile)
  return (
    <div className=" w-screen min-h-screen bg-richblack-900 flex flex-col font-inter scroll-smooth  overflow-hidden">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="catalog/:catalogName" element={<Catalog />} />
        <Route path="courses/:courseId" element={<CourseDetails />} />
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

        <Route path="*" element={
          <Error />
        }
        />

        <Route element={<ProtectedRoute><Dashboard /></ProtectedRoute>}>

          <Route path="/dashboard/*" element={<Error />} />
          <Route path="/dashboard/my-profile" element={<MyProfile />} />
          <Route path="/dashboard/settings" element={<Settings />} />
          {
            user?.accountType === ACCOUNT_TYPE.STUDENT && (
              <>
                <Route path="/dashboard/enrolled-courses" element={<EnrolledCourses />} />
                <Route path="/dashboard/cart" element={<Cart />} />
              </>
            )
          }

          {
            user?.accountType === ACCOUNT_TYPE.INSTRUCTOR && (
              <>
                <Route path="/dashboard/add-course" element={<AddCourse />} />
                <Route path="/dashboard/my-courses" element={<MyCourses />} />
                <Route path="/dashboard/edit-course/:courseId" element={<EditCourse />} />
              </>
            )
          }
        </Route>

        <Route element={<ProtectedRoute><ViewCourse /></ProtectedRoute>}>
          {
            user?.accountType === ACCOUNT_TYPE.STUDENT && (
              <>
                <Route path="view-course/:courseId/section/:sectionId/sub-section/:subSectionId"
                  element={<VideoDetails />}
                />
              </>
            )
          }
        </Route>

      </Routes>
    </div>
  );
}

export default App;

