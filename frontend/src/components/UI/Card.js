import React from "react";
import { Card, Button } from 'react-bootstrap';

function CardX()
{
    return (
        <div className="max-w-sm rounded overflow-hidden shadow-lg">
            <img className="w-full" src="/images/i1.jpg" alt="Sunset in the mountains" />
            <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">Ultimate JavaScript Course</div>
                <p className="text-gray-700 text-base">
                    A JavaScript course with a focus on simplicity and modularity.
                </p>
            </div>
            <div className="px-6 pt-4 pb-2">
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#html</span>
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#css</span>
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#javascript</span>
            </div>
        </div>
    );
}

export default CardX;
