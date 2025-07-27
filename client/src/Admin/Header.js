import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom'; // Link might not be needed if only Logout is shown
import { Container, Navbar, Nav } from 'react-bootstrap';
import AuthContext from '../Contexts/authContext';
import { FaSun, FaMoon } from 'react-icons/fa';
import useTheme from '../Contexts/themeContext';
import './css/AdminHeader.css'; // Import the new CSS

const AdminHeader = () => {
    // For AdminHeader, we assume isAdmin and isAuth are true, otherwise AdminRoutes would redirect.
    // So, only Logout button is relevant from auth actions.
    const { logout } = useContext(AuthContext);
    const { themeMode, lightTheme, darkTheme } = useTheme();
    const onThemeToggleButton = () => themeMode === 'light' ? darkTheme() : lightTheme();

    return (
        <Navbar
            className={`admin-app-header shadow-sm ${themeMode === 'light' ? "bg-light" : "bg-slate-900"}`}
            variant={themeMode === 'light' ? 'light' : 'dark'}
            expand="lg"
            sticky="top"
        >
            <Container fluid className="px-lg-3"> {/* Use fluid container with padding */}
                <Navbar.Brand as={NavLink} to="/admin/" className="me-lg-3">Admin Panel</Navbar.Brand>
                <Navbar.Toggle aria-controls="admin-navbar-nav" />
                <Navbar.Collapse id="admin-navbar-nav">
                    <Nav className="me-auto">
                        <NavLink className="nav-link nav-item" to="/admin/" end>Dashboard</NavLink> {/* 'end' prop for exact match on root */}
                        <NavLink className="nav-link nav-item" to="/admin/users">Users</NavLink>
                        <NavLink className="nav-link nav-item" to="/admin/blogs">Blogs</NavLink>
                        <NavLink className="nav-link nav-item" to="/admin/courses">Courses</NavLink>
                        {/* Add other admin links here */}
                    </Nav>
                    <Nav className="ms-auto d-flex align-items-center flex-row"> {/* Right-aligned items */}
                        <button
                            className="admin-theme-toggle-btn mx-2"
                            onClick={onThemeToggleButton}
                            aria-label="Toggle theme"
                        >
                            {themeMode === 'light' ? <FaSun size="1.1em" /> : <FaMoon size="1.1em" />}
                        </button>
                        <button className="btn-admin-logout nav-item mx-1" onClick={logout}>
                            Logout
                        </button>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
	)
}

export default AdminHeader

