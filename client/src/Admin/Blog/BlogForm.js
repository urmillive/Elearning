import React, { useState, useEffect, useContext } from "react";
import JoditEditor from 'jodit-react';
import swal from 'sweetalert';
import { useNavigate, useParams } from "react-router-dom";
import { Container, Form, Row, Col, FloatingLabel } from "react-bootstrap";
import AuthContext from "../../Contexts/authContext";

const BlogForm = ({ getBlogs }) =>
{
    const { api } = useContext(AuthContext);
    const navigate = useNavigate();
    const { id } = useParams();
    const [ blog, setBlog ] = useState({
        name: "",
        summary: "",
        content: "",
    });
    useEffect(() =>
    {
        if (id !== undefined)
        {
            api.get(`/admin/blogs/${ id }`) // Changed to /admin/blogs/
                .then((res) =>
                {
                    setBlog({ name: res.data.blog.name, summary: res.data.blog.summary, content: res.data.blog.content });
                }).catch((err) =>
                {
                    console.log(err.message);
                })
        }
    }, [ id ]);

    const handleChange = (event) =>
    {
        event.preventDefault();
        const { name, value } = event.target;
        setBlog({ ...blog, [ name ]: value });
    }
    const handleChangeContent = (data) =>
    {
        setBlog({ ...blog, 'content': data });
    }
    const submit = (e) =>
    {
        e.preventDefault();
        console.log(blog);
        if (id === undefined)
        {
            api.post('/admin/blogs/', blog) // Changed to /admin/blogs/
                .then((res) =>
                {
                    if (res.status === 200)
                    {
                        swal({
                            title: res.data.message,
                            icon: "success",
                        });
                        setBlog({
                            name: "",
                            summary: "",
                            content: "",
                        });
                        getBlogs();
                    } else
                    {
                        swal({
                            title: res.data.message,
                            icon: "warning",
                            button: "close"
                        });
                    }
                })
                .catch((err) =>
                {
                    console.log("🚀 ~ file: AdminBlogs.js:~ err", err);
                });
        } else
        {
            api.put(`/admin/blogs/${ id }`, blog) // Changed to /admin/blogs/
                .then((res) =>
                {
                    console.log("=>", res.data);
                    if (res.status === 200)
                    {
                        swal({
                            title: res.data.message,
                            icon: "success",
                        });
                        navigate("/admin/blogs");
                    } else
                    {
                        swal({
                            title: res.data.message,
                            icon: "warning",
                            button: "close"
                        });
                    }
                })
                .catch((err) =>
                {
                    console.log("🚀 ~ file: AdminBlogs.js:~ err", err);
                });
        }
    }

    return (
        <>
            <Container>
                <form onSubmit={ submit }>
                    <Row className="justify-content-md-center my-5">
                        <Col md={ 8 }>
                            <FloatingLabel controlId="floatingtitle" label="Blog Title" className="mb-3">
                                <Form.Control type="text" placeholder="Blog Name" name="name" value={ blog.name } onChange={ handleChange } required />
                            </FloatingLabel>
                            <FloatingLabel controlId="floatingsummery" label="Blog Summery" className="mb-3">
                                <Form.Control type="text" placeholder="Blog Summery" name="summary" value={ blog.summary } onChange={ handleChange } required />
                            </FloatingLabel>
                            <JoditEditor
                                value={ blog.content }
                                tabIndex={ 1 }
                                onChange={ (newContent) => { handleChangeContent(newContent) } }
                            />
                        </Col>
                        <Col md={ 8 } className="d-grid gap-2 my-2">
                            {
                                id === undefined ? <button type="submit" className="bg-green-500 text-white py-3 fw-bolder text-2xl rounded" size="lg">
                                    Create Blog
                                </button> : <button type="submit" className="bg-blue-500 text-white py-3 fw-bolder text-2xl rounded" size="lg">
                                    Update Blog
                                </button>
                            }
                        </Col>
                    </Row>
                </form>
            </Container>
        </>
    )
}

export default BlogForm

