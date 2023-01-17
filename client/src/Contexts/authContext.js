
import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext({
    isAuth: false,
    isAdmin: false,
    login: () => { },
    admin: () => { },
    logout: () => { }
});

export default AuthContext;

export const AuthProvider = ({ children }) =>
{
    const [ isAuth, setIsAuth ] = useState(false);
    const [ isAdmin, setIsAdmin ] = useState(false);

    useEffect(() =>
    {
        axios.post('http://localhost:9999/getUser').then(
            res =>
            {
                setIsAuth(true);
                setIsAdmin(res.data.user.isAdmin);
            }
        )
    }, [ isAuth ]);


    const login = (navigation, location) =>
    {
        setIsAuth(true);
        navigation(location?.pathname)
    }

    const admin = () =>
    {
        setIsAdmin(true);
    }

    const logout = () =>
    {
        setIsAuth(false);
        setIsAdmin(false);
        localStorage.removeItem('token');
    }

    return (
        <AuthContext.Provider value={ { isAuth, isAdmin, login, admin, logout } }>
            { children }
        </AuthContext.Provider>
    );

}
