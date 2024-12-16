import React, { useContext } from 'react';
import { NavLink, Link } from 'react-router-dom'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import AuthContext from '../Contexts/authContext';
import { FaSun, FaMoon } from 'react-icons/fa';
import useTheme from '../Contexts/themeContext';

const AdminHeader = () =>
{
	const { isAuth, isAdmin, logout } = useContext(AuthContext);
	const { themeMode, lightTheme, darkTheme } = useTheme();
	const onThemeToggleButton = () => themeMode === 'light' ? darkTheme() : lightTheme();
	return (
		<Navbar className={ themeMode === 'light' ? "bg-light" : "bg-slate-900" } variant={ themeMode === 'light' ? 'light' : 'dark' } expand="lg">
			<Container>
				<Navbar.Brand className='font-bold'>Admin Panel</Navbar.Brand>
				<Nav className="me-auto">
					<NavLink className="nav-link" to="/admin/">Home</NavLink>
					<NavLink className="nav-link" to="/admin/users">Users</NavLink>
					<NavLink className="nav-link" to="/admin/blogs">Blogs</NavLink>
					<NavLink className="nav-link" to="/admin/courses">Courses</NavLink>
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
			</Container>
		</Navbar>
	)
}

export default AdminHeader

