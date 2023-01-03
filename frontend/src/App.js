import React from "react";
import EditorSection from "./Components/EditorSection";
import "./App.css";

import { Routes, Route } from "react-router-dom";
const App = () =>
{
  return (
    <div className="App"> 
      <Routes>
        <Route path="/editor" element={ <EditorSection /> } />
      </Routes>
    </div>
  );
};

export default App;
