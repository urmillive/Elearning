
import { createContext, useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const AuthContext = createContext({
    isAuth: false,
    isAdmin: false,
    userLogin: () => { },
    logout: () => { },
    setIsAuth: () => { },
});

export default AuthContext;

export const AuthProvider = ({ children }) =>
{
    console.log('[AuthContext] Provider rendering...');
    const [ token, setToken ] = useState(null);
    const [ isAuth, setIsAuth ] = useState(false);
    const [ isAdmin, setIsAdmin ] = useState(false);

    const [ profile, setProfile ] = useState(null);
    const [ pathname, setPathname ] = useState("/");
    const [ loading, setLoading ] = useState(false);

    // Create the api instance once using useMemo to ensure it's stable
    // and picks up the baseURL from the environment.
    const api = useMemo(() => {
        const apiUrl = process.env.REACT_APP_API_URL;
        console.log('[AuthContext] useMemo for api. REACT_APP_API_URL:', apiUrl);
        if (!apiUrl) {
            console.error('[AuthContext] FATAL: REACT_APP_API_URL is not set. API calls will likely fail or go to the wrong host.');
        }
        const instance = axios.create({
            baseURL: apiUrl, // Use the captured apiUrl
            headers: {
                'Content-Type': 'application/json'
            }
        });

        // Use an interceptor to dynamically set the Authorization header
        instance.interceptors.request.use(
            (config) => {
                const currentToken = localStorage.getItem('token'); // Get the latest token
                if (currentToken) {
                    config.headers['Authorization'] = `Bearer ${currentToken}`;
                }
                return config;
            },
            (error) => {
                return Promise.reject(error);
            }
        );
        return instance;
    }, []); // Empty dependency array means this runs once on mount

    const location = useLocation();
    const navigation = useNavigate()

    const userLogin = (token) =>
    {
        localStorage.setItem('token', token);
        setToken(token);
    }

    const logout = () =>
    {
        setToken(null);
        setIsAdmin(false);
        setIsAuth(false);
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
    }

    useEffect(() =>
    {
        console.log('[AuthContext] Initial token loading effect running.');
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
            console.log('[AuthContext] Found token in localStorage:', storedToken);
            setLoading(true);
            setToken(storedToken);
        } else {
            console.log('[AuthContext] No token found in localStorage.');
            setToken(""); // Explicitly set to empty string if no token, to trigger the other useEffect
        }
    }, []);

    useEffect(() =>
    {
        console.log('[AuthContext] Token change effect running. Current token:', token);
        if (token === null) { // Initial state before localStorage is checked
            console.log('[AuthContext] Token is null, skipping profile fetch.');
            return;
        }

        if (token === "") // No token or logged out
        {
            console.log('[AuthContext] Token is empty string. Setting auth to false.');
            setIsAuth(false);
            setProfile(null);
            setIsAdmin(false); // Ensure isAdmin is also reset
            setLoading(false);
        } else // Has a token, attempt to fetch profile
        {
            console.log('[AuthContext] Token exists. Attempting to fetch profile...');
            setLoading(true); // Set loading before API call
            api.get(`/profile/`)
                .then((res) =>
                {
                    console.log('[AuthContext] /profile/ call successful:', res.data);
                    if (res.status === 200)
                    {
                        setIsAuth(true);
                        setProfile(res.data.user);
                        setIsAdmin(res.data.user.isAdmin);
                        setLoading(false); // Set loading false after state updates

                        // Redirection logic
                        console.log('[AuthContext] Navigating. Current location.pathname:', location.pathname, 'Saved pathname:', pathname, 'isAdmin:', res.data.user.isAdmin);
                        let pathToNavigate = location.pathname;
                        if (location.pathname === "/login" || location.pathname === "/register") { // Redirect if on login/register
                            pathToNavigate = res.data.user.isAdmin ? "/admin" : "/profile";
                        } else if (pathname !== "/" && (location.pathname === "/" || location.pathname === "")) {
                            // If trying to go to root but had a deeper path saved (e.g. after page refresh on protected route)
                            pathToNavigate = pathname;
                        }
                        // If already on a valid page and not login/register, might not need to navigate,
                        // or navigate to `location.pathname` if it's different from `pathToNavigate`
                      console.log('[AuthContext] Attempting to navigate to:', pathToNavigate);
                      if (location.pathname !== pathToNavigate) {
                          navigation(pathToNavigate);
                      }
                  } else
                  {
                        console.warn('[AuthContext] /profile/ call status not 200:', res.status);
                        logout(); // This will set token to null, then empty string, re-triggering this effect
                        setLoading(false);
                    }
                }).catch((err) =>
                {
                    console.error('[AuthContext] /profile/ call failed:', err.response || err.message || err);
                    logout(); // Logout on error
                    setLoading(false);
                });
        }
    }, [ token, api, navigation, location, pathname ]); // Added dependencies

    const contextValue = useMemo(() => ({
        api, loading, setLoading, token, isAuth, isAdmin, profile, setProfile, userLogin, setPathname, setIsAuth, logout
    }), [ api, loading, token, isAuth, isAdmin, profile ]);

    return (
        <AuthContext.Provider value={ contextValue }>
            { children }
        </AuthContext.Provider>
    );
}

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};
