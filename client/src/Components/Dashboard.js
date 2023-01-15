import React, { useEffect } from "react";

import { useNavigate } from "react-router-dom";
const Dashboard = () =>
{
    const navigate = useNavigate();
    useEffect(() =>
    {
        const token = localStorage.getItem('token');
        // if (token)
        // {
        //     const user = jwt.decode(token);
        //     if (!user)
        //     {
        //         localStorage.removeItem('token');
        //         navigate('/login');
        //     } else
        //     {
        //         alert("success");
        //     }
        // }
    }, []);

    return (
        <>Dashboard</>
    )
}

export default Dashboard
