import React, { useState, useEffect, useContext } from 'react';
import { Container, Row, Col, Accordion, Spinner } from "react-bootstrap";
import { useParams } from 'react-router-dom';
import AuthContext from '../../Contexts/authContext';
import './../CSS/CourseDetails.css'; // Import the new CSS file

// Helper function to get YouTube Video ID from URL
const getYouTubeID = (url) => {
    url = url.split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
    return (url[2] !== undefined) ? url[2].split(/[^0-9a-z_\-]/i)[0] : url[0];
}

const CourseDetails = () => {
    const { courseId } = useParams();
    const { api, loading, setLoading } = useContext(AuthContext);
    const [course, setCourse] = useState(null);

    useEffect(() => {
        if (courseId) {
            setLoading(true);
            api.get(`/courses/${courseId}`)
                .then(res => {
                    if (res.data && res.data.course) {
                        setCourse(res.data.course);
                    } else {
                        console.error("Course data not found in response:", res.data);
                        setCourse(null); // Or handle error appropriately
                    }
                })
                .catch(err => {
                    console.error("Error fetching course details:", err.response || err.message || err);
                    setCourse(null); // Or handle error appropriately
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    }, [courseId, api, setLoading]);

    if (loading || !course) {
        return (
            <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading course details...</span>
                </Spinner>
            </Container>
        );
    }

    // Assuming your course object has 'name', 'description', 'modules' (array), and 'price' (or similar)
    // The 'modules' array structure needs to be known to render the accordion dynamically.
    // For now, the accordion part remains static as an example.
    // You'll need to map through course.modules to generate Accordion.Item dynamically.

    return (
        <>
            <div className="course-hero-section"> {/* Applied custom class */}
                <Container> {/* Using standard Container for controlled width */}
                    <Row className="align-items-center">
                        <Col lg={7} md={12} className="course-hero-content mb-4 mb-lg-0">
                            <h1 className="course-title">{course.name}</h1>
                            <p className="course-short-description">
                                {course.description}
                            </p>
                            <div className="course-metadata">
                                {course.category && <span className="course-metadata-item"><strong>Category:</strong> {course.category}</span>}
                                {course.duration && <span className="course-metadata-item"><strong>Duration:</strong> {course.duration} units</span>}
                                {course.skillLevel && <span className="course-metadata-item"><strong>Level:</strong> {course.skillLevel}</span>}
                                {course.language && <span className="course-metadata-item"><strong>Language:</strong> {course.language}</span>}
                                {/* TODO: Add Instructor if available in course data */}
                                {/* {course.instructor && course.instructor.name && <span className="course-metadata-item"><strong>Instructor:</strong> {course.instructor.name}</span>} */}
                            </div>
                        </Col>
                        <Col lg={5} md={12}>
                            <div className="course-purchase-box">
                                <img src={course.imageUrl || '/images/i2.jpg'} className='course-image' alt={course.name} />
                                <div className="course-price-display">₹{course.price !== undefined ? course.price : 'N/A'}</div>
                                <button className='btn-buy-now'>Enroll Now</button> {/* Changed text */}
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>

            <Container className='my-5 course-content-section'> {/* Added class for accordion styling */}
                <Row>
                    <Col md={12}>
                        <h3 className="mb-4 text-center dark:text-white">Course Content</h3>
                        {course.modules && course.modules.length > 0 ? (
                            <Accordion defaultActiveKey="0">
                                {course.modules.map((module, index) => (
                                    <Accordion.Item eventKey={String(index)} key={module._id || `module-${index}`}>
                                        <Accordion.Header>{module.name || `Module ${index + 1}`}</Accordion.Header>
                                        <Accordion.Body>
                                            {module.description && <p className="mb-2 text-muted text-sm">{module.description}</p>}
                                            {module.lessons && module.lessons.length > 0 ? (
                                                <ul className="list-group list-group-flush">
                                                    {module.lessons.map((lesson, lessonIndex) => (
                                                        <li key={lesson._id || `lesson-${index}-${lessonIndex}`} className="list-group-item dark:bg-slate-700 dark:text-slate-300 px-0">
                                                            <h6 className="mb-1">{lesson.title || `Lesson ${lessonIndex + 1}`}</h6>
                                                            {lesson.durationMinutes && <small className="text-muted d-block mb-1">Duration: {lesson.durationMinutes} mins</small>}
                                                            {lesson.isFreePreview && <span className="badge bg-success mb-1">Free Preview</span>}
                                                            
                                                            {lesson.contentType === 'video' && lesson.content && ( // For YouTube or other external video URLs
                                                                <div className="embed-responsive embed-responsive-16by9 mt-2">
                                                                    <iframe
                                                                        className="embed-responsive-item"
                                                                        width="100%"
                                                                        height="315"
                                                                        src={lesson.content.includes('youtube.com') || lesson.content.includes('youtu.be') ? `https://www.youtube.com/embed/${getYouTubeID(lesson.content)}` : lesson.content}
                                                                        title={lesson.title}
                                                                        frameBorder="0"
                                                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                                        allowFullScreen
                                                                    ></iframe>
                                                                </div>
                                                            )}
                                                            {lesson.contentType === 'uploaded_video' && lesson.content && (
                                                                <div className="mt-2">
                                                                    <video width="100%" controls src={lesson.content}>
                                                                        Your browser does not support the video tag.
                                                                    </video>
                                                                </div>
                                                            )}
                                                            {lesson.contentType === 'text' && lesson.content && (
                                                                <div className="mt-2 lesson-text-content">
                                                                    <p style={{whiteSpace: 'pre-wrap'}}>{lesson.content}</p>
                                                                </div>
                                                            )}
                                                            {lesson.contentType === 'external_link' && lesson.content && (
                                                                <div className="mt-2">
                                                                    <a href={lesson.content} target="_blank" rel="noopener noreferrer" className="btn btn-outline-primary btn-sm">
                                                                        View Resource
                                                                    </a>
                                                                </div>
                                                            )}
                                                            {/* Add more contentType handlers here (e.g., file, quiz) */}
                                                        </li>
                                                    ))}
                                                </ul>
                                            ) : (
                                                <p className="text-muted">No lessons in this module yet.</p>
                                            )}
                                        </Accordion.Body>
                                    </Accordion.Item>
                                ))}
                            </Accordion>
                        ) : (
                            <p>No modules available for this course yet.</p>
                        )}
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default CourseDetails;

