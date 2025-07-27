import React, { useState, useContext, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

// pages
import Header from "./pages/Header";
import Footer from "./pages/Footer";
import Main from "./pages/Main";
import Contact from "./pages/Contact";
import About from "./pages/About";
import EditorSection from "./pages/EditorSection";

// user components
import Login from "./Components/Login";
import Register from "./Components/Register";
import CourseSection from "./Components/Course/CourseSection"; // This is the single card display
import Courses from "./Components/Course/Courses"; // This is the course list display
import CourseDetails from "./Components/Course/CourseDetails";
import GoogleAuthCallback from "./Components/GoogleAuthCallback"; // Import Google Auth Callback
import Profile from "./Components/Profile";
import BlogList from "./Components/Blog/BlogList";
import Blog from "./Components/Blog/Blog";

// admin components
import AdminUserList from "./Admin/User"; // Changed AdminUser to AdminUserList to match export
import AdminCourses from "./Admin/Courses/CourseList";
import CourseForm from "./Admin/Courses/CourseForm";
import AdminHeader from "./Admin/Header";
import AdminBlogs from "./Admin/Blog";
import AdminFooter from "./Admin/Footer";
import BlogForm from "./Admin/Blog/BlogForm";

// routes
import PrivateRoutes from "./routes/PrivateRoutes"
import AdminRoutes from "./routes/AdminRoutes";

// contexts
import AuthContext from "./Contexts/authContext";
import Dashboard from "./Admin/Dashboard";
import UserDashboard from "./Components/Dashboard/Dashboard";
import CertificateGenerator from "./Components/Certificate/CertificateGenerator";
import { ThemeProvider } from "./Contexts/themeContext";


const App = () => {
  const { isAuth, isAdmin } = useContext(AuthContext);

  // Initialize themeMode from localStorage or default to 'light'
  const [themeMode, setThemeMode] = useState(() => {
    const storedTheme = localStorage.getItem('themeMode');
    return storedTheme || 'light';
  });

  const darkTheme = () => {
    setThemeMode("dark");
  };
  const lightTheme = () => {
    setThemeMode("light");
  };

  useEffect(() => {
    const htmlElement = document.querySelector('html');
    htmlElement.classList.remove('dark', 'light');
    htmlElement.classList.add(themeMode);
    // Save theme preference to localStorage
    localStorage.setItem('themeMode', themeMode);
  }, [themeMode]);

  return (
    <div className="flex flex-col min-h-screen dark:bg-slate-900">
      <ThemeProvider value={ { themeMode, darkTheme, lightTheme } }>
      { !isAdmin ? <Header /> : <AdminHeader /> }
      <Routes>
        <Route path="/" element={ <Main /> } />
        <Route path="/about" element={ <About /> } />
        <Route path="/contact" element={ <Contact /> } />
        <Route path="/register" element={ <Register /> } />
        <Route path="/login" element={ <Login /> } />
        <Route path="/auth/google/success" element={ <GoogleAuthCallback />} /> {/* Google OAuth Success Callback */}
        <Route path="/dashboard" element={ <UserDashboard />} />
        <Route path="/certificate/:courseId" element={ <CertificateGenerator />} />
        <Route path="/*" element={ <Main /> }></Route>
        <Route path="/" element={ <PrivateRoutes /> }>
          <Route path="/profile" element={ <Profile /> } />
          <Route path="/editor" element={ <EditorSection /> } />
          {/* <Route path="/courseDetails" element={ <CourseDetails /> } /> {/* This can be removed or repurposed if not used */}
          <Route path="/courses/:courseId" element={ <CourseDetails /> } /> {/* New route for specific course details */}
          <Route path="/blogs" element={ <BlogList /> } />
          <Route path="/blog/:id" element={ <Blog /> } />
          <Route path="/courses" element={ <Courses /> } /> {/* This is the course list page */}
        </Route>
        <Route path="/admin" element={ <AdminRoutes /> }>
          <Route path="/admin/" element={ <Dashboard /> } />
          <Route path="/admin/users" element={ <AdminUserList /> } /> {/* Changed AdminUser to AdminUserList */}
          <Route path="/admin/blogs" element={ <AdminBlogs /> } />
          <Route path="/admin/blogs/:id" element={ <BlogForm /> } />
          <Route path="/admin/courses" element={ <AdminCourses /> } />
          <Route path="/admin/courses/new" element={ <CourseForm /> } />
          <Route path="/admin/courses/edit/:courseId" element={ <CourseForm /> } />
        </Route>
      </Routes>
      { !isAdmin ? <Footer /> : <AdminFooter /> }
      </ThemeProvider>
    </div>
  );
};

export default App;
