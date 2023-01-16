
import { createContext, useState } from 'react';
import Cookies from "js-cookie";

const AuthContext = createContext({
    isAuth: false,
    login: () => { },
    logout: () => { }
});

export default AuthContext;

export const AuthProvider = ({ children }) =>
{
    const [ isAuth, setIsAuth ] = useState(false);

    const login = () =>
    {
        setIsAuth(true);
    }

    const logout = () =>
    {
        setIsAuth(false);
        Cookies.remove('token');
    }

    return (
        <AuthContext.Provider value={ { isAuth, login, logout } }>
            { children }
        </AuthContext.Provider>
    );
}
