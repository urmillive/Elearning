import { useContext, useEffect } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import AuthContext from '../../Contexts/authContext';
import Cookies from 'js-cookie';

const AdminRoutes = () =>
{
    const { isAdmin, admin } = useContext(AuthContext);

    useEffect(() =>
    {
        const adminCookie = Cookies.get('admin');

        if (adminCookie)
        {
            admin();
        }
    }, []);

    if (isAdmin)
    {
        return <Outlet />;
    } else
    {
        return <Navigate to="/login" />;
    }
}
export default AdminRoutes;
