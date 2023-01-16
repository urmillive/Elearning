import React from "react";
import EditorSection from "./Components/EditorSection";
import Header from "./Components/Header";
import Main from "./Components/Main";
import Login from "./Components/Login";
import Register from "./Components/Register";
import Learning from "./Components/Learning";
import About from "./Components/About";
import Contact from "./Components/Contact";
import Footer from "./Components/Footer";
import CourseSection from "./Components/CourseSection";
import CourseDetails from "./Components/CourseDetails";
import { Routes, Route } from "react-router-dom";
import PrivateRoutes from "./Components/PrivateRoutes"
// admin routes
import Dashboard from "./Components/Admin/Dashboard";
import AdminRoutes from "./Components/Admin/AdminRoutes";
const App = () =>
{
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" exact element={ <Main /> } />
        <Route path="/register" element={ <Register /> } />
        <Route path="/login" element={ <Login /> } />
        <Route path="/about" element={ <About /> } />
        <Route path="/contact" element={ <Contact /> } />
        <Route path="/learning" element={ <Learning /> } />
        <Route path="/course" element={ <CourseSection /> } />
        <Route path="/courseDetails" element={ <CourseDetails /> } />
        <Route element={ <PrivateRoutes /> }>
          <Route path="/editor" element={ <EditorSection /> } />
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
