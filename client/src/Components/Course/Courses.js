import React, { useState, useEffect, useContext } from "react"; // Added useContext
// import axios from "axios"; // Will use api from context
import AuthContext from "../../Contexts/authContext";
import CourseSection from "./CourseSection"; // Changed from CourseCard to CourseSection

const Courses = () =>
{
    const { api, setLoading, loading } = useContext(AuthContext); // Added setLoading and loading from context
    const [ courses, setCourses ] = useState([]);

    useEffect(() =>
    {
        const fetchData = async () =>
        {
            setLoading(true); // Set loading true before fetch
            try {
                const res = await api.get("/courses");
                if (res.data && res.data.courses) {
                    setCourses(res.data.courses);
                } else {
                    setCourses([]);
                    console.log("No courses found or unexpected response structure:", res.data);
                }
            } catch (error) {
                console.error("Error fetching courses:", error.response || error.message || error);
                setCourses([]);
            } finally {
                setLoading(false); // Set loading false after fetch attempt
            }
        };
        fetchData();
    }, [api, setLoading]); // Added api and setLoading to dependency array

    if (loading && courses.length === 0) { // Show loading if loading and no courses yet
        return (
            <div className="container my-5 text-center dark:text-white">
                <p>Loading courses...</p>
                {/* You can add a spinner here if you have one */}
            </div>
        );
    }

    return (
        <div className="container my-5 dark:bg-slate-900 flex-grow"> {/* Added flex-grow for layout */}
            <h2 className="text-center mb-5 display-4 dark:text-white">Our Courses</h2> {/* Enhanced title */}
            {courses.length === 0 ? (
                <p className="text-center dark:text-slate-300">No courses available at the moment. Please check back later!</p>
            ) : (
                <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4"> {/* Bootstrap grid */}
                    { courses.map((course) => (
                        <div className="col d-flex align-items-stretch" key={course._id}> {/* Ensure cards in a row are same height */}
                           <CourseSection
                                // Pass individual props as CourseSection currently expects them.
                                // It's better to refactor CourseSection to take a single 'course' object prop.
                                courseId={course._id} // For the "Buy Now" or "Details" link
                                image={course.imageUrl || "/images/i1.jpg"} // Use course.imageUrl or a default
                                courseTitle={course.name}
                                courseDesc={course.description}
                                coursePrice={course.price?.toString()} // Ensure price is a string
                            />
                        </div>
                    )) }
                </div>
            )}
        </div>
    );
};

export default Courses;
