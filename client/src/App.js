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
import CourseSection from "./Components/Course/CourseSection";
import CourseDetails from "./Components/Course/CourseDetails";
import Profile from "./Components/Profile";
import BlogList from "./Components/Blog/BlogList";
import Blog from "./Components/Blog/Blog";

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
import AuthContext from "./Contexts/authContext";
import Dashboard from "./Admin/Dashboard";
import { ThemeProvider } from "./Contexts/themeContext";


const App = () =>
{
  const { isAuth, isAdmin } = useContext(AuthContext);
  const [ themeMode, setThemeMode ] = useState("light");
  const darkTheme = () => {
    setThemeMode("dark");
  }
  const lightTheme = () => {
    setThemeMode("light");
  }

  useEffect(() => {
    document.querySelector('html').classList.remove('dark', 'light');
    document.querySelector('html').classList.add(themeMode);
  }, [ themeMode ]);

  return (
    <div class="flex flex-col min-h-screen">
      <ThemeProvider value={ { themeMode, darkTheme, lightTheme } }>
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
      </ThemeProvider>
    </div>
  );
};

export default App;
