import { useState, useEffect } from 'react';
import AuthContext from './authContext';
import axios from 'axios';

export const AuthProvider = ({ children }) =>
{
    const [ user, setUser ] = useState(null);
    const getUser = () =>
    {
        var token = localStorage.getItem('token', null);
        if (token)
        {
            axios.get("http://localhost:9999/getUser", { headers: { "Authorization": token } })
                .then((res) =>
                {
                    console.log(res.data);
                })
                .catch((err) =>
                {
                    console.log("🚀 ~ file: EditorSection.js:35 ~ err", err);
                });
        }
        else
        {
            return null;
        }
    }
    useEffect(() =>
    {
        const currentUser = getUser()
        setUser(currentUser)
    }, []);

    return (
        <AuthContext.Provider value={ { user } }>{ children }</AuthContext.Provider>
    );
};
