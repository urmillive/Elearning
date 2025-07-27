import React from 'react';
import { Link } from "react-router-dom";
import '../CSS/CourseCard.css'; // Import the new CSS file

// Added courseId to props
const CourseSection = ({ courseId, image = "/images/i1.jpg", courseTitle = "Ultimate JavaScript Course", courseDesc = "A JavaScript course with a focus on simplicity and modularity.", coursePrice = "150" }) => {
    
    // Fallback for description to prevent rendering issues if it's too short or undefined
    const displayDesc = courseDesc && courseDesc.length > 10 ? courseDesc.slice(0, 100) + (courseDesc.length > 100 ? "..." : "") : "No description available.";

    return (
        <div className="course-card h-100"> {/* Use custom class, h-100 for grid alignment */}
            <img
                className="card-img-top"
                src={image || "/images/i1.jpg"} // Fallback for image
                alt={courseTitle}
                style={{ height: '200px', objectFit: 'cover' }}
            />
            <div className="card-body d-flex flex-column"> {/* p-3 is now in .card-body CSS */}
                <h5 className="card-title">{courseTitle}</h5> {/* Styling via .course-card .card-title */}
                <p className="card-text flex-grow-1"> {/* Styling via .course-card .card-text */}
                    {displayDesc}
                </p>
                <div className="mt-auto"> {/* Push price and button to bottom */}
                    <div className="d-flex justify-content-between align-items-center mb-2">
                        <span className="course-price"> {/* Use custom class for price */}
                            ₹{coursePrice !== undefined && coursePrice !== null ? coursePrice : 'N/A'}
                        </span>
                    </div>
                    <Link
                        to={courseId ? `/courses/${courseId}` : '#'}
                        className={`btn-view-details w-100 ${!courseId ? 'disabled' : ''}`} // Use custom class
                    >
                        View Details
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default CourseSection;
