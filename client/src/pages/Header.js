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
		<Navbar className={ themeMode === 'light' ? "bg-light" : "bg-slate-900" } variant={ themeMode === 'light' ? 'light' : 'dark' } expand="lg">
			<Container fluid>
				<Navbar.Brand>
					<img
						src={ themeMode === 'light' ? "/images/logo-dark.png" : "/images/logo-white.png" }
						alt="E-Learning logo"
						className="h-12"
					/>

				</Navbar.Brand>
				<Navbar.Toggle aria-controls="navbarScroll" />
				<Navbar.Collapse id="navbarScroll">
					<Nav
						className="me-auto my-2 my-lg-0"
						style={ { maxHeight: '100px' } }
						navbarScroll
					>
						<NavLink to="/" className="nav-link nav-item">Home</NavLink>
						<NavLink to="/blogs" className="nav-link nav-item">Blogs</NavLink>
						<NavLink to="/courses" className="nav-link nav-item">Courses</NavLink>
						<NavLink to="/editor" className="nav-link nav-item"> Coding Playground </NavLink>
						<NavLink to="/about" className="nav-link nav-item">About</NavLink>
						<NavLink to="/contact" className="nav-link nav-item">Contact</NavLink>
					</Nav>
					<button className="text-white px-4 py-2 rounded mx-2" onClick={ onThemeToggleButton }>
						{ themeMode === 'light' ? <FaSun className='text-slate-900' /> : <FaMoon /> }
					</button>
					{
						isAuth || isAdmin ?
							<button className="bg-red-500 px-4 py-2 rounded-pill mx-2 text-decoration-none text-white" onClick={ logout }>Logout</button>
							:
							<Link to="/login" className="bg-green-500 px-4 py-2 rounded-pill mx-2 text-decoration-none text-white hover:bg-green-700">Login</Link>
					}
				</Navbar.Collapse>
			</Container>
		</Navbar>
	)
}

export default Header;
