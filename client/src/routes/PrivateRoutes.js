import { useContext } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import AuthContext from '../contexts/authContext';

const PrivateRoutes = () =>
{
    const { isAuth } = useContext(AuthContext);
    // console.log(isAuth);
    return (isAuth ? <Outlet /> : <Navigate to="/login" />);
}
export default PrivateRoutes;




// <>
//     <Outlet />;
// </>
// const { setIsLoggedIn } = useContext(AuthContext);
