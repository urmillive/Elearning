import React from "react";
// import { Card, Button } from 'react-bootstrap';

function CardX({ image = "/images/i1.jpg", courseTitle = "Ultimate JavaScript Course", courseDesc = "A JavaScript course with a focus on simplicity and modularity.", coursePrice = "150" })
{
    return (
        <div className="max-w-sm rounded overflow-hidden shadow-lg">
            <img className="w-full" src={ image } alt="Sunset in the mountains" />
            <div className="px-6 py-2">
                <div className="font-bold text-center text-xl mb-2">{ courseTitle }</div>
                <p className="text-gray-700 text-base text-center">
                    { courseDesc }
                </p>
                <div className="px-6 pt-1 pg-2">
                    <span className="inline bg-gray-200 rounded-full px-3 py-2 text-md font-semibold text-gray-700 mb-2 text-left">₹{ coursePrice }</span>
                    <p className="inline float-right font-bold text-gray-500 text-md">Team E-learning</p>
                </div>
            </div>
            <div className="text-center my-3">
                <button type="button" className="display-block text-white bg-slate-900 hover:bg-slate-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-md px-20 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    <svg aria-hidden="true" class="w-5 h-5 mr-2 -ml-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"></path></svg>
                    Buy now
                </button>
            </div>
        </div>
    );
}

export default CardX;
