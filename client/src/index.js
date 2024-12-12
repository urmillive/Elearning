import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap';
import { AuthProvider } from './Contexts/authContext';
import { BrowserRouter as Router } from "react-router-dom";
import { ThemeProvider } from './Contexts/themeContext';

const root = createRoot(document.getElementById('root'));
root.render(
  <Router>
    <AuthProvider>
      <ThemeProvider>
        <App />
      </ThemeProvider>
      <App />
    </AuthProvider>
  </Router>
);
