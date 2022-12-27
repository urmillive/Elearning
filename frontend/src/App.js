import React from "react";
import Header from "./components/Header";
import MainPage from "./components/Main";
import Footer from "./components/Footer";
import Login from "./components/Login";
import Register from "./components/Register";
import Profile from "./components/Profile";
import Editor from "./components/editor/editor";
import "./App.css";

import { Routes, Route } from "react-router-dom";
const App = () =>
{
  return (
    <div className="App"> 
      <Header />
      <Routes>
        <Route path="/" element={ <MainPage /> } />
        <Route path="/editor" element={ <Editor /> } />
        <Route path="/register" element={ <Register /> } />
        <Route path="/login" element={ <Login /> } />
        <Route path="/profile" element={ <Profile /> } />
        <Route path="/test" element={ <Profile /> } />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
