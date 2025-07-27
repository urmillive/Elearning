import React, { useEffect, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import AuthContext from '../Contexts/authContext';
import Loader from '../pages/Loader'; // Assuming you have a Loader component
import swal from 'sweetalert'; // Import sweetalert

const GoogleAuthCallback = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { userLogin, setIsAuth, setIsAdmin, setProfile } = useContext(AuthContext); // Assuming these setters are available or userLogin handles it

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get('token');
    const authFailed = params.get('google_auth_failed');

    if (authFailed === 'true') {
      console.error("Google authentication failed (redirected from server).");
      // Optionally use swal to show a more user-friendly error
      swal("Login Failed", "Google authentication failed. Please try again or use local login.", "error");
      navigate('/login', { replace: true });
      return;
    }

    if (token) {
      console.log("GoogleAuthCallback: Token received, calling userLogin.");
      userLogin(token);
      // After userLogin, AuthContext will fetch profile and its useEffect should handle
      // redirection to /profile or /admin.
      // However, to ensure we navigate away from this callback page:
      console.log("GoogleAuthCallback: Navigating to / to let AuthContext take over.");
      navigate('/', { replace: true }); // Navigate to home, AuthContext will redirect further
    } else {
      console.error("GoogleAuthCallback: No token received.");
      swal("Login Error", "No authentication token received from Google callback.", "error");
      navigate('/login?error=no_token_from_google', { replace: true });
    }
    // Removed setIsAuth, setIsAdmin, setProfile from dependencies as userLogin should handle state.
  }, [location, navigate, userLogin]);

  // Display a loader while processing
  return <Loader />;
};

export default GoogleAuthCallback;