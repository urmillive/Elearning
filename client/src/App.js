import React, { useContext } from "react";
import { Routes, Route } from "react-router-dom";

// pages
import Header from "./pages/Header";
import Footer from "./pages/Footer";
import Main from "./pages/Main";
import Contact from "./pages/Contact";
import About from "./pages/About";
import EditorSection from "./pages/EditorSection";

// user components
import Login from "./components/Login";
import Register from "./components/Register";
import CourseSection from "./components/Course/CourseSection";
import CourseDetails from "./components/Course/CourseDetails";
import Profile from "./components/Profile";
import BlogList from "./components/Blog/BlogList";
import Blog from "./components/Blog/Blog";

// admin components
import AdminUser from "./Admin/User";
import AdminCourses from "./Admin/Courses";
import AdminHeader from "./Admin/Header";
import AdminBlogs from "./Admin/Blog";
import AdminFooter from "./Admin/Footer";
import BlogForm from "./Admin/Blog/BlogForm";

// routes
import PrivateRoutes from "./routes/PrivateRoutes"
import AdminRoutes from "./routes/AdminRoutes";

// contexts
import AuthContext from "./contexts/authContext";
import Dashboard from "./Admin/Dashboard";


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
        <Route path="/*" element={ <Main /> }></Route>
        <Route path="/" element={ <PrivateRoutes /> }>
          <Route path="/profile" element={ <Profile /> } />
          <Route path="/editor" element={ <EditorSection /> } />
          <Route path="/courseDetails" element={ <CourseDetails /> } />
          <Route path="/blogs" element={ <BlogList /> } />
          <Route path="/blog/:id" element={ <Blog /> } />
          <Route path="/courses" element={ <CourseSection /> } />
        </Route>
        <Route path="/admin" element={ <AdminRoutes /> }>
          <Route path="/admin/" element={ <Dashboard /> } />
          <Route path="/admin/users" element={ <AdminUser /> } />
          <Route path="/admin/blogs" element={ <AdminBlogs /> } />
          <Route path="/admin/blogs/:id" element={ <BlogForm /> } />
          <Route path="/admin/courses" element={ <AdminCourses /> } />
        </Route>
      </Routes>
      { !isAdmin ? <Footer /> : <AdminFooter /> }
    </>
  );
};

export default App;
