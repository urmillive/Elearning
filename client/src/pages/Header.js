import React, { useContext } from 'react';
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link, NavLink } from 'react-router-dom';
import AuthContext from '../Contexts/authContext';
import { FaSun, FaMoon } from 'react-icons/fa';
import useTheme from '../Contexts/themeContext';
import "./css/Header.css";

const Header = () => {
	const { isAuth, isAdmin, logout } = useContext(AuthContext);
	const { themeMode, lightTheme, darkTheme } = useTheme();
	const onThemeToggleButton = () => themeMode === 'light' ? darkTheme() : lightTheme();
	return (
		<Navbar
			className={`app-header shadow-sm ${themeMode === 'light' ? "bg-light" : "bg-slate-900"}`}
			variant={themeMode === 'light' ? 'light' : 'dark'}
			expand="lg"
			sticky="top" // Make navbar sticky
		>
			<Container fluid className="px-lg-4"> {/* Added more horizontal padding on larger screens */}
				<Navbar.Brand as={Link} to="/" className="me-lg-4"> {/* Link brand to home */}
					<img
						src={ themeMode === 'light' ? "/images/logo-dark.png" : "/images/logo-white.png" }
						alt="E-Learning logo"
						className="h-10" // Slightly reduced height, adjust as needed
					/>
				</Navbar.Brand>
				<Navbar.Toggle aria-controls="navbarScroll" />
				<Navbar.Collapse id="navbarScroll">
					{/* Centered navigation links */}
					<Nav className="mx-auto my-2 my-lg-0" navbarScroll>
						{!isAuth && <NavLink to="/" className="nav-link nav-item px-lg-3">Home</NavLink>}
						<NavLink to="/blogs" className="nav-link nav-item px-lg-3">Blogs</NavLink>
						<NavLink to="/courses" className="nav-link nav-item px-lg-3">Courses</NavLink>
						<NavLink to="/editor" className="nav-link nav-item px-lg-3">Playground</NavLink>
						<NavLink to="/about" className="nav-link nav-item px-lg-3">About</NavLink>
						<NavLink to="/contact" className="nav-link nav-item px-lg-3">Contact</NavLink>
					</Nav>
					{/* Right-aligned items: theme toggle and auth buttons */}
					<Nav className="ms-auto d-flex align-items-center flex-row">
						<button
							className={`theme-toggle-btn p-2 rounded-circle d-flex align-items-center justify-content-center mx-2 ${themeMode === 'light' ? 'text-slate-700 hover:bg-gray-200' : 'text-gray-300 hover:bg-slate-700'}`}
							onClick={onThemeToggleButton}
							aria-label="Toggle theme"
							style={{ width: '40px', height: '40px', border: 'none', background: 'transparent' }}
						>
							{themeMode === 'light' ? <FaSun size="1.2em" /> : <FaMoon size="1.2em" />}
						</button>
						{isAuth ? (
							<>
								<NavLink to="/profile" className="btn-auth btn-auth-profile nav-item mx-1">Profile</NavLink>
								{isAdmin && (
									<NavLink to="/admin" className="btn-auth btn-auth-admin nav-item mx-1">Admin</NavLink>
								)}
								<button className="btn-auth btn-auth-logout nav-item mx-1" onClick={logout}>Logout</button>
							</>
						) : (
							<Link to="/login" className="btn-auth btn-auth-login nav-item mx-1">Login</Link>
						)
					}
</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	)
}

export default Header;
