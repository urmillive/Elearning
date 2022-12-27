import React, { useState } from 'react'
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import axios from "axios";

const Register = () =>
{
	const [ user, setUser ] = useState({
		fname: "",
		lname: "",
		mobile: "",
		email: "",
		password: ""
	});

	const handleChange = (event) =>
	{
		const { name, value } = event.target;
		setUser({ ...user, [ name ]: value });
	}
	
	const register = () =>
	{
		const { fname, lname, mobile, email, password } = user;
		if (fname && lname && mobile && email && password)
		{
			axios.post("http://localhost:3000/register", user)
				.then(res => console.log(res))
		} else
		{
			alert("Please fill all the fields!");
		}
	}

	return (
		<>
			<Container className="my-5">
				<Row>
					<Col md={ 6 }>
						<Form>
							<Form.Group className="mb-3" controlId="formBasicfname">
								<Form.Label>First Name</Form.Label>
								<Form.Control name="fname" value={ user.fname } type="text" placeholder="Enter First Name" onChange={ handleChange } />
							</Form.Group>
							<Form.Group className="mb-3" controlId="formBasiclname">
								<Form.Label>Last Name</Form.Label>
								<Form.Control name="lname" value={ user.lname } type="text" placeholder="Enter Last Name" onChange={ handleChange } />
							</Form.Group>
							<Form.Group className="mb-3" controlId="formBasicMobile">
								<Form.Label>Mobile Number</Form.Label>
								<Form.Control name="mobile" value={ user.mobile } type="text" placeholder="Enter Mobile" onChange={ handleChange } />
							</Form.Group>
							<Form.Group className="mb-3" controlId="formBasicEmail">
								<Form.Label>Email Address</Form.Label>
								<Form.Control name="email" value={ user.email } type="email" placeholder="Enter Email Address" onChange={ handleChange } />
							</Form.Group>
							<Form.Group className="mb-3" controlId="formBasicPassword">
								<Form.Label>Password</Form.Label>
								<Form.Control name="password" value={ user.password } type="password" placeholder="Password" onChange={ handleChange } />
							</Form.Group>
							<Button variant="primary" type="submit" onClick={ register }>
								Submit
							</Button>
						</Form>
					</Col>
				</Row>
			</Container>
		</>
	)
}

export default Register
