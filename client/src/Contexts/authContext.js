
import { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import api from "../api/api";

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

    return (
        <AuthContext.Provider value={ { loading, setLoading, token, isAuth, isAdmin, profile, setProfile, userLogin, setPathname, setIsAuth, logout } }>
            { children }
        </AuthContext.Provider>
    );
}
