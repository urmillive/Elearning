
import { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';

const AuthContext = createContext({
    isAuth: false,
    isAdmin: false,
    user: {},
    userLogin: () => { },
    adminLogin: () => { },
    logout: () => { },
    setIsAuth: () => { },
});

export default AuthContext;

export const AuthProvider = ({ children }) =>
{
    const [ isAuth, setIsAuth ] = useState(false);
    const [ isAdmin, setIsAdmin ] = useState(false);
    const [ user, setUser ] = useState({});
    const location = useLocation();
    const navigation = useNavigate()

    const userLogin = (token) =>
    {
        localStorage.setItem('token', token);
        setIsAuth(true);
    }

    const logout = () =>
    {
        setIsAdmin(false);
        setIsAuth(false);
        localStorage.removeItem('token');
        delete axios.defaults.headers.common[ 'Authorization' ];
    }

    useEffect(() =>
    {
        const token = localStorage.getItem('token');
        if (!token)
        {
            setIsAuth(false);
            setUser({});
        } else
        {
            axios
                .get("http://localhost:9999/getUser", {
                    headers: {
                        Authorization: token,
                        "Content-Type": "application/json",
                    },
                })
                .then((res) =>
                {
                    if (res.data.status === true)
                    {
                        setIsAuth(true);
                        setUser(res.data.user);
                        setIsAdmin(res.data.user.isAdmin);
                        // console.log(location.pathname);
                        let path = location.pathname
                        if (location.pathname === "/login") path = "/"
                        if (res.data.user.isAdmin && location.pathname === "/login") path = "/admin"
                        navigation(path)
                    } else
                    {
                        logout();
                    }
                }).catch((err) =>
                {
                    console.log(err);
                });

        }
    }, [ isAuth ]);

    return (
        <AuthContext.Provider value={ { isAuth, isAdmin, user, userLogin, setIsAuth, logout } }>
            { children }
        </AuthContext.Provider>
    );

}
