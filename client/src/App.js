import React from "react";
import EditorSection from "./Components/EditorSection";
import Header from "./Components/Header";
import Main from "./Components/Main";
import Login from "./Components/Login";
import Register from "./Components/Register";
import Learning from "./Components/Learning.js";
import About from "./Components/About.js";
import Contact from "./Components/Contact.js";
import Footer from "./Components/Footer";
import CourseSection from "./Components/CourseSection";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./Components/Admin/Dashboard";
import PrivateRoutes from "./Components/PrivateRoutes.js"

const App = () =>
{
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" exact element={ <Main /> } />
        <Route path="/register" element={ <Register /> } />
        <Route path="/login" exact element={ <Login /> } />
        <Route path="/about" element={ <About /> } />
        <Route path="/contact" element={ <Contact /> } />

        <Route element={ <PrivateRoutes /> }>
          <Route path="/dashboard" element={ <Dashboard /> } />
          <Route path="/learning" element={ <Learning /> } />
          <Route path="/editor" element={ <EditorSection /> } />
          <Route path="/course" element={ <CourseSection /> } />
        </Route>
      </Routes>
      <Footer />
    </>
  );
};

export default App;