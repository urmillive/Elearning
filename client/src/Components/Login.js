import React, { useContext, useState } from 'react'
import { Container, Row, Col, Form, FloatingLabel } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import AuthContext from '../Contexts/authContext';
import Loader from "../pages/Loader";

const Login = () =>
{
  const { userLogin, loading, api } = useContext(AuthContext); // Use api from context
  const navigate = useNavigate();
  const [ user, setUser ] = useState({
    email: "",
    password: ""
  });
  const [ formErrors, setFormErrors ] = useState({});

  const handleChange = (event) =>
  {
    const { name, value } = event.target;
    setUser({ ...user, [ name ]: value });
    // Clear specific field error on change
    if (formErrors[name]) {
        setFormErrors({ ...formErrors, [name]: null });
    }
  }

  const submitLogin = (e) =>
  {
    e.preventDefault();
    setFormErrors({}); // Clear previous errors

    api.post('/login', user) // Use api from context
      .then((res) =>
      {
        if (res.status === 200 && res.data.token) // Ensure token exists
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
        }
        // Removed the else block; errors will be handled by the catch block
        // or if status is 200 but no token, it will silently not log in,
        // which might need further refinement based on expected server behavior.
      })
      .catch((err) =>
      {
        if (err.response && err.response.data) {
            if (err.response.data.data && Array.isArray(err.response.data.data)) {
                // Handle field-specific errors (e.g. from express-validator)
                const serverErrors = {};
                err.response.data.data.forEach(error => {
                    serverErrors[error.param] = error.msg;
                });
                setFormErrors(serverErrors);
            } else if (err.response.data.message) {
                // Handle general error messages from the server (e.g., "Invalid credentials")
                // Display this as a general error, or specifically for a field if appropriate
                // For login, a general message might be better if not field-specific.
                // Or, if the server always returns a specific field for "general" login errors:
                setFormErrors({ general: err.response.data.message });
                // Alternatively, use swal for general non-field errors:
                // swal({
                //     title: "Login Failed",
                //     text: err.response.data.message,
                //     icon: "error",
                //     button: "Close"
                // });
            } else {
                setFormErrors({ general: "An unexpected error occurred. Please try again."});
            }
        } else {
          console.log("🚀 ~ file: Login.js:~ err", err.message);
          setFormErrors({ general: "Login failed. Please check your connection and try again."});
        }
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
                  {formErrors.general && <p className="text-danger text-center mb-3">{formErrors.general}</p>}
                  <FloatingLabel
                    controlId="floatingInput"
                    label="Email address"
                    className="mb-3"
                  >
                    <Form.Control type="email" placeholder="name@example.com" name="email" value={ user.email } onChange={ handleChange } required isInvalid={!!formErrors.email} />
                    {formErrors.email && <Form.Text className="text-danger ms-2">{formErrors.email}</Form.Text>}
                  </FloatingLabel>
                  <FloatingLabel controlId="floatingPassword" label="Password" className="mb-3">
                    <Form.Control type="password" placeholder="Password" name="password" value={ user.password } onChange={ handleChange } required isInvalid={!!formErrors.password}/>
                    {formErrors.password && <Form.Text className="text-danger ms-2">{formErrors.password}</Form.Text>}
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
                  
                  <div className="text-center my-3">
                    <p className="dark:text-slate-400">OR</p>
                    <a
                      href={`${process.env.REACT_APP_API_URL || 'https://elearning-c9yc.onrender.com'}/auth/google`}
                      className="btn btn-danger w-100 py-2.5 d-flex align-items-center justify-content-center" // Using Bootstrap classes for styling
                      style={{backgroundColor: '#DB4437', color: 'white', textDecoration: 'none', borderRadius: '0.25rem'}}
                    >
                      {/* You can add a Google icon here */}
                      <svg className="me-2" xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z"/>
                      </svg>
                      Login with Google
                    </a>
                  </div>

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

