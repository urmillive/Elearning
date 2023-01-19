import { useContext } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import AuthContext from '../contexts/authContext';

const PrivateRoutes = () =>
{
    const { isAuth } = useContext(AuthContext);
    return (isAuth ? <Outlet /> : <Navigate to="/login" />);
}
export default PrivateRoutes;
