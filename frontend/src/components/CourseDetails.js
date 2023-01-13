import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const CourseDetail = () =>
{
    const [ course, setCourse ] = useState({});
    const { id } = useParams();

    useEffect(() =>
    {
        const fetchData = async () =>
        {
            const res = await axios.get(`/courses/${ id }`);
            setCourse(res.data);
        };
        fetchData();
    }, [ id ]);

    return (
        <div>
            <h2>{ course.name }</h2>
            <p>{ course.description }</p>
            <p>Price: { course.price }</p>
            <p>Instructor: { course.instructor.name }</p>
        </div>
    );
};

export default CourseDetail;
