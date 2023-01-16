import { useContext, useEffect } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import AuthContext from '../Contexts/authContext';
import Cookies from 'js-cookie';

const PrivateRoutes = () =>
{
    const { isAuth, login } = useContext(AuthContext);

    useEffect(() =>
    {
        const token = Cookies.get('token');
        if (token)
        {
            login();
        }
    }, []);
    return (isAuth ? <Outlet /> : <Navigate to="/login" />);
}
export default PrivateRoutes;
