import { useContext } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import AuthContext from '../contexts/authContext';

const AdminRoutes = () =>
{
    const { isAdmin } = useContext(AuthContext);
    return (isAdmin ? <Outlet /> : <Navigate to="/login" />);
}
export default AdminRoutes;
