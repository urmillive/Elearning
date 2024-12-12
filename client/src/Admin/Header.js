import React, { useContext, useState } from 'react';
import { NavLink, Link } from 'react-router-dom'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import AuthContext from '../Contexts/authContext';
import { FaSun, FaMoon } from 'react-icons/fa';

const AdminHeader = () =>
{
	const { isAuth, isAdmin, logout } = useContext(AuthContext);
	const [ theme, setTheme ] = useState('light');

	const toggleTheme = () => {
		setTheme(theme === 'light' ? 'dark' : 'light');
	};

	return (
		<Navbar bg="dark" variant="dark">
			<Container>
				<Navbar.Brand>Admin</Navbar.Brand>
				<Nav className="me-auto">
					<NavLink className="nav-link" to="/admin">Home</NavLink>
					<NavLink className="nav-link" to="/admin/users">Users</NavLink>
					<NavLink className="nav-link" to="/admin/blogs">Blogs</NavLink>
					<NavLink className="nav-link" to="/admin/courses">Courses</NavLink>
				</Nav>

				<button className=" text-white px-4 py-2 rounded mx-2" onClick={ toggleTheme }>
					{ theme === 'light' ? <FaSun /> : <FaMoon /> }
				</button>
				{
					isAuth || isAdmin ?
						<button className="bg-red-500 px-4 py-2 rounded mx-2 text-decoration-none text-white" onClick={ () => { logout() } }>Logout</button>
						:
						<Link to="/login" className="bg-green-500 px-4 py-2 rounded mx-2 text-decoration-none text-white">Login</Link>
				}
			</Container>
		</Navbar>
	)
}

export default AdminHeader

