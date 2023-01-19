import React, { useContext } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// pages
import Header from "./pages/Header";
import Footer from "./pages/Footer";
import Contact from "./pages/Contact";
import About from "./pages/About";
import EditorSection from "./pages/EditorSection";

// user components
import Main from "./pages/Main";
import Login from "./components/Login";
import Register from "./components/Register";
import Learning from "./components/Blog/Learning";
import CourseSection from "./components/Course/CourseSection";
import CourseDetails from "./components/Course/CourseDetails";
import Profile from "./components/Profile";
// admin components
import Dashboard from "./Admin/Dashboard";
import AdminCourses from "./Admin/AdminCourses";
import AdminHeader from "./Admin/AdminHeader";
import AdminBlogs from "./Admin/AdminBlogs";

// routes
import PrivateRoutes from "./routes/PrivateRoutes"
import AdminRoutes from "./routes/AdminRoutes";
import AuthContext from "./contexts/authContext";

const App = () =>
{
  const { isAuth, isAdmin } = useContext(AuthContext);
  console.log(isAdmin);
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" exact element={ <Main /> } />
        <Route path="/about" element={ <About /> } />
        <Route path="/contact" element={ <Contact /> } />
        <Route path="/register" element={ <Register /> } />
        { !isAuth &&
          <Route path="/login" render={ (arg) => { console.log(arg) } } element={ <Login /> } />
          // :
          // <Navigate to="/" />
        }
        <Route path="/" element={ <PrivateRoutes /> }>
          <Route path="/profile" element={ <Profile /> } />
          <Route path="/editor" element={ <EditorSection /> } />
          <Route path="/courseDetails" element={ <CourseDetails /> } />
          <Route path="/learning" element={ <Learning /> } />
          <Route path="/courses" element={ <CourseSection /> } />
        </Route>
        <Route path="/admin" element={ <AdminRoutes /> }>
          <Route path="/admin" element={ <Dashboard /> } />
          <Route path="/admin/courses" element={ <AdminCourses /> } />
          <Route path="/admin/blogs" element={ <AdminBlogs /> } />
        </Route>
      </Routes>
      <Footer />
    </>
  );
};

export default App;
