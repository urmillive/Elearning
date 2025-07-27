import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Button, Card, Spinner } from 'react-bootstrap';
import AuthContext from '../../Contexts/authContext';
import swal from 'sweetalert';

const CourseList = () => {
    const { api, loading, setLoading } = useContext(AuthContext);
    const [courses, setCourses] = useState([]);

    const fetchCourses = async () => {
        setLoading(true);
        try {
            const response = await api.get('/admin/courses');
            if (response.data && response.data.courses) {
                setCourses(response.data.courses);
            }
        } catch (error) {
            console.error("Error fetching courses:", error.response || error.message || error);
            swal("Error", "Could not fetch courses.", "error");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCourses();
    }, []);

    const handleDeleteCourse = async (courseId) => {
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this course!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
        .then(async (willDelete) => {
            if (willDelete) {
                setLoading(true);
                try {
                    await api.delete(`/admin/courses/${courseId}`);
                    swal("Poof! The course has been deleted!", {
                        icon: "success",
                    });
                    fetchCourses(); // Refresh the list
                } catch (error) {
                    console.error("Error deleting course:", error.response || error.message || error);
                    swal("Error", "Could not delete the course.", "error");
                } finally {
                    setLoading(false);
                }
            }
        });
    };

    if (loading && courses.length === 0) {
        return (
            <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            </Container>
        );
    }

    return (
        <div className="dark:bg-slate-900 py-5 flex-grow">
            <Container>
                <Row className="mb-4 align-items-center">
                    <Col>
                        <h2 className="text-slate-900 dark:text-white">Manage Courses</h2>
                    </Col>
                    <Col className="text-end">
                        <Button as={Link} to="/admin/courses/new" variant="primary" className="bg-green-500 hover:bg-green-600 text-white">
                            Add New Course
                        </Button>
                    </Col>
                </Row>
                {courses.length === 0 && !loading ? (
                    <p className="text-slate-700 dark:text-slate-300">No courses found. Add one!</p>
                ) : (
                    <Row xs={1} md={2} lg={3} className="g-4">
                        {courses.map((course) => (
                            <Col key={course._id}>
                                <Card className="h-100 dark:bg-slate-800 dark:text-white">
                                    <Card.Body>
                                        <Card.Title>{course.name}</Card.Title>
                                        <Card.Text style={{ minHeight: '60px', overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical' }}>
                                            {course.description}
                                        </Card.Text>
                                        <p className="mb-1"><small>Duration: {course.duration} units</small></p>
                                        {/* Add more details like price, category if available */}
                                    </Card.Body>
                                    <Card.Footer className="dark:border-slate-700">
                                        <Button variant="outline-info" size="sm" as={Link} to={`/admin/courses/edit/${course._id}`} className="me-2 dark:text-sky-400 dark:border-sky-400 hover:dark:bg-sky-400 hover:dark:text-slate-900">
                                            Edit
                                        </Button>
                                        <Button variant="outline-danger" size="sm" onClick={() => handleDeleteCourse(course._id)} className="dark:text-red-400 dark:border-red-400 hover:dark:bg-red-400 hover:dark:text-slate-900">
                                            Delete
                                        </Button>
                                    </Card.Footer>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                )}
            </Container>
        </div>
    );
};

export default CourseList;