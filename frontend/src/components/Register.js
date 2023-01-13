import React, { useState } from "react";
import { Container, Form, Row, Col, FloatingLabel } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";

const RegisterPage = () =>
{
	const [ user, setUser ] = useState({
		fname: "",
		lname: "",
		email: "",
		mobile: "",
		password: ""
	});

	const handleChange = (event) =>
	{
		const { name, value } = event.target;
		setUser({ ...user, [ name ]: value });
	}
	const submitRegister = () =>
	{
		axios.post('http://localhost:8000/register', { user })
			.then((res) =>
			{
				console.log(res.data);
			})
			.catch((err) =>
			{
				console.log("🚀 ~ file: EditorSection.js:35 ~ err", err);
			});
	}
	return (
		<Container>
			<Form>
				<Row className="justify-content-md-center my-5">
					<Col md={ 8 }>
						<FloatingLabel controlId="floatingfirstName" label="First Name" className="mb-3">
							<Form.Control type="text" placeholder="First Name" name="fname" value={ user.fname } onChange={ handleChange } required />
						</FloatingLabel>

						<FloatingLabel controlId="floatingPassword" label="Last Name" className="mb-3">
							<Form.Control type="text" placeholder="First Name" name="lname" value={ user.lname } onChange={ handleChange } required />
						</FloatingLabel>

						<FloatingLabel
							controlId="floatingInput"
							label="Email address"
							className="mb-3"
						>
							<Form.Control type="email" placeholder="name@example.com" name="email" value={ user.email } onChange={ handleChange } required />
						</FloatingLabel>

						<FloatingLabel controlId="floatingMobile" label="Mobile" className="mb-3">
							<Form.Control type="number" placeholder="Mobile" name="mobile" value={ user.mobile } onChange={ handleChange } required />
						</FloatingLabel>

						<FloatingLabel controlId="floatingPassword" label="Password" className="mb-3">
							<Form.Control type="password" placeholder="Password" name="password" value={ user.password } onChange={ handleChange } required />
						</FloatingLabel>
					</Col>
					<Col md={ 8 } className="d-grid gap-2">
						<button variant="warning" className="bg-slate-900 text-white py-3 fw-bolder text-2xl rounded" type="submit" block size="lg" onSubmit={ submitRegister }>
							Register
						</button>
						<h6 className="text-right my-1">Already User then go to <Link to="/login" className="fw-bold">Login!</Link></h6>
					</Col>
				</Row>
			</Form>
		</Container>
	);
};

export default RegisterPage;
