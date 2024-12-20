import React, { useContext, useState } from 'react'
import { Container, Row, Col, Form, FloatingLabel } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import AuthContext from '../Contexts/authContext';
import Loader from "../pages/Loader";

const Login = () =>
{
  const { userLogin, loading, api } = useContext(AuthContext);
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
    api.post('/login', user)
      .then((res) =>
      {
        if (res.status === 200)
        {
          const token = res.data.token;
          userLogin(token);
          swal({
            title: `Welcome ${ res.data.user.firstName }`,
            text: res.data.message,
            icon: "success",
          });
          if (res.data.user.isAdmin)
          {
            navigate("/admin");
          } else
          {
            navigate("/profile");
          }
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
      .catch((err) =>
      {
        console.log("🚀 ~ file: Login.js:~ err", err.message);
      });
  }
  return (
    <div className='dark:bg-slate-900 flex-grow'>
      {
        loading ?
          <Loader /> :
          <Container>
            <form method="POST" onSubmit={ submitLogin }>
              <Row className="justify-content-md-center py-5">
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
                  <button
                    type="submit"
                    className="bg-slate-900 text-white py-3 fw-bolder text-2xl rounded border border-transparent hover:border-slate-300 dark:hover:border-slate-300"
                    size="lg"
                  >
                    Login
                  </button>

                  <h6 className="text-right my-1 dark:text-slate-300 font-mono">New User then go to <Link to="/register" className="fw-bold text-slate-800 dark:text-yellow-200 hover:text-slate-900 dark:hover:bg-yellow-100 dark:hover:text-slate-800">Register!</Link></h6>
                </Col>
              </Row>
            </form>
          </Container>
      }
    </div>
  )
}

export default Login;

