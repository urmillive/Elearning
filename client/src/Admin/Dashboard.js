import React, { useState, useEffect, useContext } from 'react';
import { Container, Row, Col, Spinner } from "react-bootstrap";
import { Link } from 'react-router-dom';
import AuthContext from '../Contexts/authContext';
import { FaUsers, FaBlog, FaChalkboardTeacher } from 'react-icons/fa'; // Icons for quick links
import './css/AdminDashboard.css';

const Dashboard = () => {
    const { profile } = useContext(AuthContext); // Get admin's profile for welcome message

    const adminName = profile ? profile.firstName : "Admin";

    const quickLinks = [
        { title: "Manage Users", icon: <FaUsers size="3em" />, link: "/admin/users", colorClass: "users" },
        { title: "Manage Blogs", icon: <FaBlog size="3em" />, link: "/admin/blogs", colorClass: "blogs" },
        { title: "Manage Courses", icon: <FaChalkboardTeacher size="3em" />, link: "/admin/courses", colorClass: "courses" },
    ];

    return (
        <div className="admin-dashboard-page dark:bg-slate-900">
            <Container>
                <div className="dashboard-welcome-message text-center mb-5">
                    <h1 className="display-4 dark:text-white">Welcome, {adminName}!</h1>
                    <p className="lead dark:text-slate-300">Manage your platform efficiently.</p>
                </div>

                <Row xs={1} md={2} lg={3} className="g-4 justify-content-center quick-links-grid">
                    {quickLinks.map((item, index) => (
                        <Col key={index} className="d-flex justify-content-center">
                            <Link to={item.link} className="quick-link-card-anchor">
                                <div className={`quick-link-card ${item.colorClass}`}>
                                    <div className="quick-link-icon">{item.icon}</div>
                                    <div className="quick-link-text">{item.title}</div>
                                </div>
                            </Link>
                        </Col>
                    ))}
                </Row>
                {/* Future sections can be added here */}
            </Container>
        </div>
    );
};

export default Dashboard;

