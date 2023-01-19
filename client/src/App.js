import React, { useContext } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// pages
import Header from "./pages/Header";
import Footer from "./pages/Footer";
import Contact from "./pages/Contact";
import About from "./pages/About";

// user components
import Main from "./components/Main";
import Login from "./components/Login";
import Register from "./components/Register";
import Learning from "./components/Learning";
import CourseSection from "./components/CourseSection";
import CourseDetails from "./components/CourseDetails";
import EditorSection from "./components/EditorSection";
import Profile from "./components/Profile";
// admin components
import Dashboard from "./components/Admin/Dashboard";

// routes
import PrivateRoutes from "./routes/PrivateRoutes"
import AdminRoutes from "./routes/AdminRoutes";
import AuthContext from "./contexts/authContext";

const App = () =>
{
  const { isAuth } = useContext(AuthContext);
  console.log(isAuth)
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
          <Route path="/admin/dashboard" element={ <Dashboard /> } />
        </Route>
      </Routes>
      <Footer />
    </>
  );
};

export default App;
