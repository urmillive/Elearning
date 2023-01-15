import React, { useState, useEffect, useContext } from 'react'
import { Container, Row, Col, Form, FloatingLabel } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { setAuth } from "../Contexts/authContext";
import axios from "axios";



const Login = () =>
{
  const [ user, setUser ] = useState({
    email: "",
    password: ""
  });

  const handleChange = (event) =>
  {
    const { name, value } = event.target;
    setUser({ ...user, [ name ]: value });
  }


  const submitLogin = () =>
  {
    axios.post('http://localhost:9999/login', user)
      .then((res) =>
      {
        console.log(res.data);
        // setAuth();
      })
      .catch((err) =>
      {
        console.log("🚀 ~ file: EditorSection.js:35 ~ err", err);
      });
  }

  return (
    <>
      <Container>
        <Form>
          <Row className="justify-content-md-center my-5">
            <Col md={ 8 }>
              <FloatingLabel
                controlId="floatingInput"
                label="Email address"
                className="mb-3"
              >
                <Form.Control type="email" placeholder="name@example.com" name="email" value={ user.email } onChange={ handleChange } required />
              </FloatingLabel>

              <FloatingLabel controlId="floatingPassword" label="Password" className="mb-3">
                <Form.Control type="password" placeholder="Password" name="password" value={ user.password } onChange={ handleChange } required />
              </FloatingLabel>
            </Col>
            <Col md={ 8 } className="d-grid gap-2">
              <button variant="light" className="bg-slate-900 text-white py-3 fw-bolder text-2xl rounded" type="submit" size="lg" onSubmit={ submitLogin }>
                Login
              </button>
              <h6 className="text-right my-1">New User then go to <Link to="/register" className="fw-bold">Register!</Link></h6>
            </Col>
          </Row>
        </Form>
      </Container>
    </>
  )
}

export default Login;

