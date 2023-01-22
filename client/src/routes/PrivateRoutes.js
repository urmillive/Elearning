import { useContext } from 'react';
import { Outlet, Navigate, useLocation } from 'react-router-dom';
import AuthContext from '../contexts/authContext';
import { useEffect } from 'react';

const PrivateRoutes = () =>
{
    const location = useLocation();
    const { setPathname, isAuth } = useContext(AuthContext);
    useEffect(() =>
    {
        setPathname(location.pathname);
    }, []);
    return (isAuth ? <Outlet /> : <Navigate to="/login" />);
}
export default PrivateRoutes;
