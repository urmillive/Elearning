import React from 'react'
import { Container, Row, Col } from "react-bootstrap";
import { Link } from 'react-router-dom';
const Dashboard = () =>
{
    return (
        <>
            <Container>
                <Row>
                    <Col md="4">
                        <Link to="/admin/users" class="no-underline block my-5 max-w-sm p-6 bg-yellow-300 border border-gray-200 rounded-lg shadow hover:bg-yellow-400 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                            <h5 class="text-4xl text-left font-bold tracking-tight text-gray-900 dark:text-white inline">Total Users
                                <p class="inline mx-5 text-3xl text-gray-700 dark:text-gray-400">5</p>
                            </h5>
                        </Link>
                    </Col>
                    <Col md="4">
                        <Link to="/admin/blogs" class="no-underline block my-5 max-w-sm p-6 bg-blue-300 border border-gray-200 rounded-lg shadow hover:bg-blue-400 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                            <h5 class="text-4xl text-left font-bold tracking-tight text-gray-900 dark:text-white inline">Total Blogs
                                <p class="inline mx-5 text-3xl text-gray-700 dark:text-gray-400">5</p>
                            </h5>
                        </Link>
                    </Col>
                    <Col md="4">
                        <Link to="/admin/courses" class="no-underline block my-5 max-w-sm p-6 bg-red-300 border border-gray-200 rounded-lg shadow hover:bg-red-400 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                            <h5 class="text-4xl text-left font-bold tracking-tight text-gray-900 dark:text-white inline">Total Courses
                                <p class="inline mx-5 text-3xl text-gray-700 dark:text-gray-400">1</p>
                            </h5>
                        </Link>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default Dashboard

