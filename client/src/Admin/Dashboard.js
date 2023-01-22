import React, { useContext, useState, useEffect } from "react";
import { Container, Form, Row, Col, FloatingLabel } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from '../contexts/authContext';
import axios from "axios";
import swal from 'sweetalert';

const Dashboard = () =>
{
    const navigate = useNavigate();
    const { userLogin } = useContext(AuthContext);
    const [ users, setUsers ] = useState([]);
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
    const updateUser = (e) =>
    {
        e.preventDefault();
        axios.post('http://localhost:9999/createUser', user)
            .then((res) =>
            {
                if (res.data.status === true)
                {
                    const token = res.data.token;
                    userLogin(token);
                    swal({
                        title: res.data.message,
                        text: `Welcome ${ res.data.user.firstName }`,
                        icon: "success",
                        button: "Explore"
                    });
                    navigate("/courses");
                } else
                {
                    swal({
                        title: res.data.message,
                        icon: "warning",
                        button: "close"
                    });
                    navigate("/register");
                }
            })
            .catch((err) =>
            {
                console.log("🚀 ~ file: Register.js:~ err", err);
            });
    }

    useEffect(() =>
    {
        const getAllUsers = async () =>
        {
            const token = localStorage.getItem('token');
            axios
                .get(`http://localhost:9999/user`, {
                    headers: {
                        Authorization: `Bearer ${ token }`
                    }
                })
                .then((res) =>
                {
                    console.log("=>", res.data);
                    setUsers(res.data.users);
                }).catch((err) =>
                {
                    console.log(err.message);
                })
        }
        getAllUsers();
    }, []);

    return (
        <>
            <Container>
                <form method="POST" onSubmit={ updateUser }>
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
                            <button type="submit" className="bg-dark text-white py-3 fw-bolder text-2xl rounded" size="lg">
                                Add User
                            </button>
                        </Col>
                    </Row>
                </form>
            </Container>
            <Container>
                <Row>
                    <Col md={ 12 }>
                        <div className="relative overflow-x-auto shadow-md sm:rounded-lg my-5">
                            <table className="w-full text-sm text-left text-slate-900 dark:text-gray-400">
                                <thead className="text-xs text-gray-200 uppercase bg-dark dark:bg-gray-700 dark:text-gray-400">
                                    <tr>
                                        <th scope="col" className="px-6 py-3">
                                            User Name
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Email
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Phone
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Enrollments
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Purchased Courses
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            <span className="sr-only">Edit</span>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            Urmil rupareliya
                                        </th>
                                        <td className="px-6 py-4">
                                            email@mail.com
                                        </td>
                                        <td className="px-6 py-4">
                                            +9165498765453
                                        </td>
                                        <td className="px-6 py-4">
                                            python,c
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <Link href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</Link>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <Link href="#" className="font-medium rounded bg-red-500 px-3 py-2 text-white no-underline hover:underline">Delete</Link>
                                        </td>
                                    </tr>
                                    { users.map((user, index) => (
                                        <tr key={ index }>
                                            <td className="px-6 py-4">
                                                {user.email}
                                            </td>
                                            <td className="px-6 py-4">
                                                +9165498765453
                                            </td>
                                            <td className="px-6 py-4">
                                                python,c
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <Link href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</Link>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <Link href="#" className="font-medium rounded bg-red-500 px-3 py-2 text-white no-underline hover:underline">Delete</Link>
                                            </td>
                                        </tr>
                                    )) }
                                </tbody>
                            </table>
                        </div>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default Dashboard
