
import { createContext, useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const AuthContext = createContext({
    isAuth: false,
    isAdmin: false,
    userLogin: () => { },
    adminLogin: () => { },
    logout: () => { },
    setIsAuth: () => { },
});

export default AuthContext;

export const AuthProvider = ({ children }) =>
{
    const [ token, setToken ] = useState(null);
    const [ isAuth, setIsAuth ] = useState(false);
    const [ isAdmin, setIsAdmin ] = useState(false);
    const [ profile, setProfile ] = useState(null);
    const [ pathname, setPathname ] = useState("/");
    const [ loading, setLoading ] = useState(false);

    const api = axios.create({
        baseURL: process.env.REACT_APP_API_URL,
        headers: {
            'Authorization': `Bearer ${ token }`,
            'Content-Type': 'application/json'
        }
    });

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
        delete axios.defaults.headers.common[ 'Authorization' ];
    }

    useEffect(() =>
    {
        if (localStorage.getItem('token', null) !== null)
        {
            setLoading(true);
        }
        setToken(localStorage.getItem('token', ""));
    }, []);

    useEffect(() =>
    {
        if (token !== null)
        {
            if (token === "")
            {
                setIsAuth(false);
                setProfile(null);
                setLoading(false);
            } else
            {
                api.get(`/profile/`)
                    .then((res) =>
                    {
                        if (res.status === 200)
                        {

                            setIsAuth(true);
                            setProfile(res.data.user);
                            setIsAdmin(res.data.user.isAdmin);
                            let path = location.pathname
                            if (location.pathname === "/login") path = pathname;
                            if (res.data.user.isAdmin && location.pathname === "/login" && pathname === "/") path = "/admin";
                            navigation(path);
                        } else
                        {
                            logout();
                        }
                        setLoading(false);
                    }).catch((err) =>
                    {
                        console.log(err);
                        setLoading(false);
                    });
            }
        }
    }, [ token ]);

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
