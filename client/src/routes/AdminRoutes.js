import { useContext, useEffect } from 'react';
import { Outlet, Navigate, useLocation } from 'react-router-dom';
import AuthContext from '../Contexts/authContext';

const AdminRoutes = () =>
{
    const location = useLocation();
    const { setPathname, isAdmin } = useContext(AuthContext);
    useEffect(() =>
    {
        setPathname(location.pathname);
    }, []);
    return (isAdmin ? <Outlet /> : <Navigate to="/login" />);
}
export default AdminRoutes;
