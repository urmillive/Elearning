import React from 'react'
import { Container, Form, Nav, NavDropdown, Navbar, Button } from "react-bootstrap";
import { Link } from 'react-router-dom';

import "./CSS/Header.css";
const Header = () =>
{
	return (
		<>
			<Navbar bg="" className="bg-slate-900	" variant='dark' expand="lg">
				<Container fluid>
					<Navbar.Brand href="/" className='text-4xl tracking-tight font-extrabold'>E-learning</Navbar.Brand>
					<Navbar.Toggle aria-controls="navbarScroll" />
					<Navbar.Collapse id="navbarScroll">
						<Nav
							className="me-auto my-2 my-lg-0"
							style={ { maxHeight: '100px' } }
							navbarScroll
						>
							<Link to="/" className="nav-link dropdon-item">Home</Link>
							<Link to="/editor" className="nav-link dropdown-item">Editor</Link>
							<Link to="/about" className="nav-link dropdown-item">About</Link>
							<Link to="/contact" className="nav-link dropdown-item">Contact</Link>
							<Link to="/certificate" className="nav-link dropdown-item">Certificate</Link>
							<NavDropdown title="Link" id="navbarScrollingDropdown">
								<NavDropdown.Item href="#action3">Action</NavDropdown.Item>
								<NavDropdown.Item href="#action4">
									Another action
								</NavDropdown.Item>
								<NavDropdown.Divider />
								<NavDropdown.Item href="#action5">
									Something else here
								</NavDropdown.Item>
							</NavDropdown>
						</Nav>
						<Button variant="light" className="">Logout</Button>
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</>
	)
}

export default Header
