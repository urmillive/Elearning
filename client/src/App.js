import React, { useContext } from "react";
import { Routes, Route } from "react-router-dom";

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
import CourseSection from "./components/Course/CourseSection";
import CourseDetails from "./components/Course/CourseDetails";
import Profile from "./components/Profile";
import BlogList from "./components/Blog/BlogList";
import Blog from "./components/Blog/Blog";


// admin components
import Dashboard from "./Admin/Dashboard";
import AdminCourses from "./Admin/AdminCourses";
import AdminHeader from "./Admin/AdminHeader";
import AdminBlogs from "./Admin/AdminBlogs";
import AdminFooter from "./Admin/AdminFooter";

// routes
import PrivateRoutes from "./routes/PrivateRoutes"
import AdminRoutes from "./routes/AdminRoutes";
import AuthContext from "./contexts/authContext";

const App = () =>
{
  const { isAuth, isAdmin } = useContext(AuthContext);
  return (
    <>
      { !isAdmin ? <Header /> : <AdminHeader /> }
      <Routes>
        <Route path="/" exact element={ <Main /> } />
        <Route path="/about" element={ <About /> } />
        <Route path="/contact" element={ <Contact /> } />
        <Route path="/register" element={ <Register /> } />
        { !isAuth &&
          <Route path="/login" render={ (arg) => { console.log(arg) } } element={ <Login /> } />
        }
        <Route path="/" element={ <PrivateRoutes /> }>
          <Route path="/profile" element={ <Profile /> } />
          <Route path="/editor" element={ <EditorSection /> } />
          <Route path="/courseDetails" element={ <CourseDetails /> } />
          <Route path="/blog" element={ <BlogList /> } />
          <Route path="/blog/:id" component={ <Blog /> } />
          <Route path="/courses" element={ <CourseSection /> } />
        </Route>
        <Route path="/admin" element={ <AdminRoutes /> }>
          <Route path="/admin" element={ <Dashboard /> } />
          <Route path="/admin/courses" element={ <AdminCourses /> } />
          <Route path="/admin/blogs" element={ <AdminBlogs /> } />
        </Route>
      </Routes>
      { !isAdmin ? <Footer /> : <AdminFooter /> }
    </>
  );
};

export default App;
