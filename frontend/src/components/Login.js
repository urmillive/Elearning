import React, { useState } from 'react'
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

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

  return (
    <>
      <Container className="my-5">
        <Row>
          <Col md={ 6 }>
            <Form>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email Address</Form.Label>
                <Form.Control name="email" value={ user.email } type="email" placeholder="Enter Email Address" onChange={ handleChange } />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control name="password" value={ user.password } type="password" placeholder="Password" onChange={ handleChange } />
              </Form.Group>
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default Login
