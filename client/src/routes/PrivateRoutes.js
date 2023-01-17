import { useContext, useEffect } from 'react';
import { Outlet, Navigate, useNavigate, useLocation } from 'react-router-dom';
import AuthContext from '../contexts/authContext';

const PrivateRoutes = () =>
{
    const { isAuth, login } = useContext(AuthContext);
    const navigation = useNavigate()
    const location = useLocation()

    useEffect(() =>
    {
        //send req to server each time from here and get data on context
        // TODO:

        login(navigation, location);
    }, [ login ]);
    return (isAuth ? <Outlet /> : <Navigate to="/login" />);
}
export default PrivateRoutes;
