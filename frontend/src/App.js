import React from "react";
import { Routes, Route } from "react-router-dom";
import EditorSection from "./Components/EditorSection";
import Header from "./Components/Header";
import Main from "./Components/Main";
import Login from "./Components/Login";
import Register from "./Components/Register";
import About from "./Components/About.js";
import Contact from "./Components/Contact.js";
import Footer from "./Components/Footer";
import CourseSection from "./Components/CourseSection";
import "./App.css";

const App = () =>
{
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={ <Main /> } />
        <Route path="/login" element={ <Login /> } />
        <Route path="/register" element={ <Register /> } />
        <Route path="/editor" element={ <EditorSection /> } />
        <Route path="/course" element={ <CourseSection /> } />
        <Route path="/about" element={ <About /> } />
        <Route path="/contact" element={ <Contact /> } />
        <Route path="/test" element={ <Contact /> } />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
