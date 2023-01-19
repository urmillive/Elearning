import React, { useState, useEffect } from "react";
import axios from "axios";
import CourseCard from "./CourseCard";

const Courses = () =>
{
    const [ courses, setCourses ] = useState([]);

    useEffect(() =>
    {
        const fetchData = async () =>
        {
            const res = await axios.get("/courses");
            setCourses(res.data);
        };
        fetchData();
    }, []);

    return (
        <div>
            <h2>Courses</h2>
            <div className="courses-container">
                { courses.map((course) => (
                    <CourseCard key={ course._id } course={ course } />
                )) }
            </div>
        </div>
    );
};

export default Courses;
