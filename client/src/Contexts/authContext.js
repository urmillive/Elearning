
import { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom';
const AuthContext = createContext({
    isAuth: false,
    isAdmin: false,
    userLogin: () => { },
    adminLogin: () => { },
    logout: () => { }
});

export default AuthContext;

export const AuthProvider = ({ children }) =>
{
    const [ isAuth, setIsAuth ] = useState(false);
    const [ isAdmin, setIsAdmin ] = useState(false);
    const [ user, setUser ] = useState({});

    useEffect(() =>
    {
        const authorization = localStorage.getItem('token');
        axios.post("http://localhost:9999/getUser", {}, {
            headers: { 'Authorization': authorization }
        }).then((res) =>
        {
            if (res.data.status === true)
            {
                setUser({...user, ...res.data.user});
                setIsAdmin(res.data.user.isAdmin);
                setIsAuth(true);
                // console.log("================");
                // console.log(isAdmin)
                // console.log(isAuth);
                // console.log(res.data.user)
            } else
            {
                console.log("helo")
                // <Navigate to="/login" />
            }
        }).catch((err) =>
        {
            console.log(err);
        });
    }, []);


    const userLogin = () =>
    {
        setIsAuth(true);
    }

    // const adminLogin = () =>
    // {
    //     setIsAdmin(true);
    // }

    const logout = () =>
    {
        setIsAuth(false);
        setIsAdmin(false);
        localStorage.removeItem('token');
    }

    return (
        <AuthContext.Provider value={ { isAuth, isAdmin, user, logout } }>
            { children }
        </AuthContext.Provider>
    );

}
