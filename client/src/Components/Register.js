import React, { useState, useContext } from "react";
import { Container, Form, Row, Col, FloatingLabel } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from 'js-cookie';
import AuthContext from '../contexts/authContext';
import swal from 'sweetalert';
const RegisterPage = () =>
{
	const { login } = useContext(AuthContext);
	const navigate = useNavigate();

	const [ user, setUser ] = useState({
		firstName: "",
		lastName: "",
		email: "",
		mobile: "",
		password: ""
	});

	const handleChange = (event) =>
	{
		event.preventDefault();
		const { name, value } = event.target;
		setUser({ ...user, [ name ]: value });
	}
	const submitRegister = (e) =>
	{
		e.preventDefault();
		axios.post('http://localhost:9999/register', user)
			.then((res) =>
			{
				const token = res.data.token;
				localStorage.setItem('token', token);
				swal({
					title: res.data.message,
					text: `Welcome ${ res.data.user.firstName }`,
					icon: "success",
					button: "Explore"
				});
				login();
				navigate("/courses");
			})
			.catch((err) =>
			{
				console.log("🚀 ~ file: Register.js:~ err", err);
			});
	}
	return (
		<Container>
			<form method="POST" onSubmit={ submitRegister }>
				<Row className="justify-content-md-center my-5">
					<Col md={ 8 }>
						<FloatingLabel controlId="floatingfirstName" label="First Name" className="mb-3">
							<Form.Control type="text" placeholder="First Name" name="firstName" value={ user.firstName } onChange={ handleChange } required />
						</FloatingLabel>

						<FloatingLabel controlId="flotinglastName" label="Last Name" className="mb-3">
							<Form.Control type="text" placeholder="First Name" name="lastName" value={ user.lastName } onChange={ handleChange } required />
						</FloatingLabel>

						<FloatingLabel
							controlId="floatingEmail"
							label="Email address"
							className="mb-3"
						>
							<Form.Control type="email" placeholder="name@example.com" name="email" value={ user.email } autoComplete="Username or Email" onChange={ handleChange } required />
						</FloatingLabel>

						<FloatingLabel controlId="floatingMobile" label="Mobile" className="mb-3">
							<Form.Control type="number" placeholder="Mobile" name="mobile" value={ user.mobile } onChange={ handleChange } required />
						</FloatingLabel>

						<FloatingLabel controlId="floatingPassword" label="Password" className="mb-3">
							<Form.Control type="password" placeholder="Enter Password" name="password" value={ user.password } onChange={ handleChange } autoComplete="current-password" required />
						</FloatingLabel>
					</Col>
					<Col md={ 8 } className="d-grid gap-2">
						<button type="submit" className="bg-slate-900 text-white py-3 fw-bolder text-2xl rounded" size="lg">
							Register
						</button>
						<h6 className="text-right my-1">Already User then go to <Link to="/login" className="fw-bold">Login!</Link></h6>
					</Col>
				</Row>
			</form>
		</Container>
	);
};

export default RegisterPage;
