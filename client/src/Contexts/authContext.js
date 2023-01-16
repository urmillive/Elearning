
import { createContext, useState } from 'react';
import Cookies from "js-cookie";

const AuthContext = createContext({
    isAuth: false,
    isAdmin: false,
    login: () => { },
    logout: () => { }
});

export default AuthContext;

export const AuthProvider = ({ children }) =>
{
    const [ isAuth, setIsAuth ] = useState(false);
    const [ isAdmin, setIsAdmin ] = useState(false);

    const login = () =>
    {
        setIsAuth(true);
    }

    const admin = () =>
    {
        setIsAdmin(true);
    }

    const logout = () =>
    {
        setIsAuth(false);
        setIsAdmin(false);
        Cookies.remove('token');
        Cookies.remove('admin');
    }

    return (
        <AuthContext.Provider value={ { isAuth, isAdmin, login, admin, logout } }>
            { children }
        </AuthContext.Provider>
    );
}
