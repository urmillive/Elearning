import React, { useContext } from 'react'
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link } from 'react-router-dom';
import AuthContext from '../contexts/authContext';

import "./css/Header.css";
const Header = () =>
{
	const { isAuth, isAdmin, logout } = useContext(AuthContext);

	return (
		<>
			<Navbar bg="" className="bg-slate-900" variant='dark' expand="lg">
				<Container fluid>
					<Navbar.Brand>
						<img src="/images/logo-white.png" alt="E-Learning logo" className="h-12" />
					</Navbar.Brand>

					<Navbar.Toggle aria-controls="navbarScroll" />
					<Navbar.Collapse id="navbarScroll">
						<Nav
							className="me-auto my-2 my-lg-0"
							style={ { maxHeight: '100px' } }
							navbarScroll
						>
							<Link to="/" className="nav-link dropdown-item">Home</Link>
							<Link to="/learning" className="nav-link dropdown-item">Learning</Link>
							<Link to="/courses" className="nav-link dropdown-item">Courses</Link>
							<Link to="/editor" className="nav-link dropdown-item">Editor</Link>
							<Link to="/about" className="nav-link dropdown-item">About</Link>
							<Link to="/contact" className="nav-link dropdown-item">Contact</Link>
						</Nav>
						{
							isAuth || isAdmin ?
								<Link to="/login" className=''><button variant="" className="bg-red-500 px-4 py-2 rounded mx-2 text-decoration-none text-white" onClick={ () => { logout() } }>Logout</button></Link>
								:
								<Link to="/login" className=''><button variant="" className="bg-green-500 px-4 py-2 rounded mx-2 text-decoration-none text-white">Login</button></Link>
						}
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</>
	)
}

export default Header
