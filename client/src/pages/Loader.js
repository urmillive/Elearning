import React from 'react';
import { BallTriangle } from "react-loader-spinner";
import "./css/Loader.css";

const Loader = () =>
{
    return (
        <>
            <div className="loader">
                <BallTriangle
                    radius="4px"
                    color="#8b39bb"
                    ariaLabel="loading-indicator"
                />
            </div>
        </>
    )
}

export default Loader;



            // <div className="spinner-grow inline-block w-8 h-8 bg-current rounded-full opacity-0 text-purple-500" role="status">
            //     <span className="visually-hidden">Loading...</span>
            // </div>
