import React from "react";
import Header from "./components/Header";
import MainPage from "./components/Main";
import Footer from "./components/Footer";
import Login from "./components/Login";
import Register from "./components/Register";
import Profile from "./components/Profile";
import "./App.css";

import { Routes, Route } from "react-router-dom";
const App = () =>
{
  return (
    <div className="App"> 
      <Header />
      <Routes>
        <Route path="/" element={ <MainPage /> } />
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
