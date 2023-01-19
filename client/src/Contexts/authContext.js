
import { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom';

const AuthContext = createContext({
    isLoggedIn: false,
    isAdmin: false,
    user: {},
    userLogin: () => { },
    adminLogin: () => { },
    logout: () => { }
});

export default AuthContext;

export const AuthProvider = ({ children }) =>
{
    const [ user, setUser ] = useState({});
    const [ isAdmin, setIsAdmin ] = useState(false);
    const [ isLoggedIn, setIsLoggedIn ] = useState(false);

    const userLogin = (token) =>
    {
        localStorage.setItem('token', token);
        setIsLoggedIn(true);
    }

    const logout = () =>
    {
        setIsAdmin(false);
        setIsLoggedIn(false);
        localStorage.removeItem('token');
        delete axios.defaults.headers.common[ 'Authorization' ];
    }

    useEffect(() =>
    {
        const token = localStorage.getItem('token');
        if (!token)
        {
            setIsLoggedIn(false);
            setUser({});
        }
        axios.get("http://localhost:9999/getUser", {
            headers: { Authorization: token }
        }).then((res) =>
        {
            if (res.data.status === true)
            {
                setIsLoggedIn(true);
                setUser(res.data.user);
                setIsAdmin(res.data.user.isAdmin);
            } else
            {
                logout();
            }
        }).catch((err) =>
        {
            console.log(err);
        });
    }, [ isLoggedIn ]);

    return (
        <AuthContext.Provider value={ { userLogin, isLoggedIn, isAdmin, user, logout } }>
            { children }
        </AuthContext.Provider>
    );

}
