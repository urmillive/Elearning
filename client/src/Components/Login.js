import React, { useState, useContext } from 'react'
import { Container, Row, Col, Form, FloatingLabel } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import Cookies from 'js-cookie';
import AuthContext from '../Contexts/authContext';
import swal from 'sweetalert';

const Login = () =>
{
  const { login, admin } = useContext(AuthContext);
  const navigate = useNavigate();
  const [ user, setUser ] = useState({
    email: "",
    password: ""
  });

  const handleChange = (event) =>
  {
    const { name, value } = event.target;
    setUser({ ...user, [ name ]: value });
  }

  const submitLogin = (e) =>
  {
    e.preventDefault();
    if (user.email == 'admin@gmail.com' && user.password == "admin")
    {
      Cookies.set('admin', user.password, { expires: 7, path: '/', secure: true, sameSite: 'strict', httpOnly: true });
      swal({
        title: "Admin Login Successful",
        icon: "success",
        button: "Explore"
      });
      admin();
      navigate("/admin/dashboard");
    }
    else
    {
      axios.post('http://localhost:9999/login', user)
        .then((res) =>
        {
          if (res.data.status == true)
          {
            const token = res.data.token;
            Cookies.set('token', token, { expires: 7, path: '/', secure: true, sameSite: 'strict', httpOnly: true });
            swal({
              title: res.data.message,
              text: `Welcome ${ res.data.user.firstName }`,
              icon: "success",
            });
            login();
            navigate("/learning");
          } else
          {
            swal({
              title: res.data.message,
              icon: "warning",
              button: "close"
            });
            navigate("/login");
          }
        })
        .catch((res, err) =>
        {
          console.log("🚀 ~ file: Login.js:~ err", err.message);
        });
    }
  }

  return (
    <>
      <Container>
        <form method="POST" onSubmit={ submitLogin }>
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
              <button type="submit" className="bg-slate-900 text-white py-3 fw-bolder text-2xl rounded" size="lg">
                Login
              </button>
              <h6 className="text-right my-1">New User then go to <Link to="/register" className="fw-bold">Register!</Link></h6>
            </Col>
          </Row>
        </form>
      </Container>
    </>
  )
}

export default Login;

