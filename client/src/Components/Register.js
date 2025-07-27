import React, { useContext, useState } from "react";
import { Container, Form, Row, Col, FloatingLabel } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import swal from 'sweetalert';
import AuthContext from '../Contexts/authContext';

const RegisterPage = () =>
{
	const navigate = useNavigate();
	const { userLogin, api } = useContext(AuthContext); // Use api from context
	const [ user, setUser ] = useState({
		firstName: "",
		lastName: "",
		email: "",
		contactNumber: "",
		password: ""
	});
	const [ formErrors, setFormErrors ] = useState({});

	const handleChange = (event) =>
	{
		event.preventDefault();
		const { name, value } = event.target;
		setUser({ ...user, [ name ]: value });
		// Clear specific field error on change
		if (formErrors[name]) {
			setFormErrors({ ...formErrors, [name]: null });
		}
	}
	const submitRegister = (e) =>
	{
		e.preventDefault();
		setFormErrors({}); // Clear previous errors
		api.post('/signup/', user) // Use api from context
			.then((res) =>
			{
				if (res.status === 200 && res.data.token) // Ensure token exists
				{
					const token = res.data.token;
					userLogin(token);
					swal({
						title: res.data.message,
						text: `Welcome ${ res.data.user.firstName }`,
						icon: "success",
						button: "Explore"
					});
					navigate("/profile");
				}
				// Removed the else block; errors will be handled by the catch block
			})
			.catch((err) =>
			{
				if (err.response && err.response.data && err.response.data.data && Array.isArray(err.response.data.data)) {
					const serverErrors = {};
					err.response.data.data.forEach(error => {
						serverErrors[error.param] = error.msg;
					});
					setFormErrors(serverErrors);
				} else if (err.response && err.response.data && err.response.data.message) {
					// Handle other types of errors from server if needed
					swal({
						title: "Error",
						text: err.response.data.message,
						icon: "error",
						button: "Close"
					});
				}
				else {
					console.log("🚀 ~ file: Register.js:~ err", err);
					swal({
						title: "Registration Failed",
						text: "An unexpected error occurred. Please try again.",
						icon: "error",
						button: "Close"
					});
				}
			});
	}
	return (
		<Container>
			<form method="POST" onSubmit={ submitRegister }>
				<Row className="justify-content-md-center my-5">
					<Col md={ 8 }>
						<FloatingLabel controlId="floatingfirstName" label="First Name" className="mb-3">
							<Form.Control type="text" placeholder="First Name" name="firstName" value={ user.firstName } onChange={ handleChange } required isInvalid={!!formErrors.firstName} />
							{formErrors.firstName && <Form.Text className="text-danger ms-2">{formErrors.firstName}</Form.Text>}
						</FloatingLabel>

						<FloatingLabel controlId="flotinglastName" label="Last Name" className="mb-3">
							<Form.Control type="text" placeholder="Last Name" name="lastName" value={ user.lastName } onChange={ handleChange } required isInvalid={!!formErrors.lastName} />
							{formErrors.lastName && <Form.Text className="text-danger ms-2">{formErrors.lastName}</Form.Text>}
						</FloatingLabel>

						<FloatingLabel
							controlId="floatingEmail"
							label="Email address"
							className="mb-3"
						>
							<Form.Control type="email" placeholder="name@example.com" name="email" value={ user.email } autoComplete="Username or Email" onChange={ handleChange } required isInvalid={!!formErrors.email}/>
							{formErrors.email && <Form.Text className="text-danger ms-2">{formErrors.email}</Form.Text>}
						</FloatingLabel>

						<FloatingLabel controlId="floatingMobile" label="Mobile" className="mb-3">
							<Form.Control type="number" placeholder="Mobile" name="contactNumber" value={ user.contactNumber } onChange={ handleChange } required isInvalid={!!formErrors.contactNumber}/>
							{formErrors.contactNumber && <Form.Text className="text-danger ms-2">{formErrors.contactNumber}</Form.Text>}
						</FloatingLabel>

						<FloatingLabel controlId="floatingPassword" label="Password" className="mb-3">
							<Form.Control type="password" placeholder="Enter Password" name="password" value={ user.password } onChange={ handleChange } autoComplete="current-password" required isInvalid={!!formErrors.password}/>
							{formErrors.password && <Form.Text className="text-danger ms-2">{formErrors.password}</Form.Text>}
						</FloatingLabel>
					</Col>
					<Col md={ 8 } className="d-grid gap-2">
						<button
							type="submit"
							className="bg-slate-900 text-white py-3 fw-bolder text-2xl rounded border border-transparent hover:border-slate-300 dark:hover:border-slate-300"
							size="lg"
						>
							Register
						</button>
						<h6 className="text-right my-1 dark:text-slate-300 font-mono">Already User then go to <Link to="/login" className="fw-bold text-slate-800 dark:text-yellow-200 hover:text-slate-900 dark:hover:bg-yellow-100 dark:hover:text-slate-800">Login!</Link></h6>
					</Col>
				</Row>
			</form>
		</Container>
	);
};

export default RegisterPage;
