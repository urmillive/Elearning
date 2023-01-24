import React, { useState, useRef, useEffect } from 'react';
import { Container, Form, Row, Col, FloatingLabel } from "react-bootstrap";
import JoditEditor from 'jodit-react';
import axios from "axios";
import swal from 'sweetalert';
import { useNavigate } from "react-router-dom";

const AdminBlogs = () =>
{
    const navigate = useNavigate();

    const editorBlog = useRef(null);
    const [ allBlogs, setAllBlogs ] = useState([]);

    const [ blog, setBlog ] = useState({
        name: "",
        summary: "",
        content: "",
    });

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
    const submitBlog = (e) =>
    {

        e.preventDefault();
        console.log(blog);
        const token = localStorage.getItem('token');
        axios.post('http://localhost:9999/blog/', blog, {
            headers: {
                Authorization: `Bearer ${ token }`
            }
        })
            .then((res) =>
            {
                console.log("=>", res.data);
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
                    getAllBlogs();
                    navigate("/admin/blogs");
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
                console.log("🚀 ~ file: AdminBlogs.js:~ err", err);
            });
    }


    const deleteBlog = (userId) =>
    {
        const token = localStorage.getItem('token');
        axios
            .delete(`http://localhost:9999/blog/${ userId }`, {
                headers: {
                    Authorization: `Bearer ${ token }`
                }
            })
            .then((res) =>
            {
                swal({
                    title: res.data.message,
                    icon: "success",
                });
                getAllBlogs();
            }).catch((err) =>
            {
                console.log(err.message);
            })
    }

    const getAllBlogs = () =>
    {
        const token = localStorage.getItem('token');
        axios.get('http://localhost:9999/blog/', {
            headers: {
                Authorization: `Bearer ${ token }`
            }
        }).then((res) =>
        {
            setAllBlogs(res.data.blogs);
        }).catch((err) =>
        {
            console.log("🚀 ~ file: AdminBlogs.js:~ err", err);
        })
    }

    useEffect(() =>
    {
        getAllBlogs();
    }, []);


    return (
        <>
            { JSON.stringify(blog) }
            <Container>
                <form method="POST" onSubmit={ submitBlog }>
                    <Row className="justify-content-md-center my-5">
                        <Col md={ 8 }>
                            <FloatingLabel controlId="floatingtitle" label="Blog Title" className="mb-3">
                                <Form.Control type="text" placeholder="Blog Name" name="name" value={ blog.name } onChange={ handleChange } required />
                            </FloatingLabel>
                            <FloatingLabel controlId="floatingsummery" label="Blog Summery" className="mb-3">
                                <Form.Control type="text" placeholder="Blog Summery" name="summary" value={ blog.summary } onChange={ handleChange } required />
                            </FloatingLabel>
                            <JoditEditor
                                ref={ editorBlog }
                                value={ blog.content }
                                tabIndex={ 1 }
                                onChange={ (newContent) => { handleChangeContent(newContent) } }
                            />
                        </Col>
                        <Col md={ 8 } className="d-grid gap-2 my-2">
                            <button type="submit" className="bg-dark text-white py-3 fw-bolder text-2xl rounded" size="lg">
                                Create Blog
                            </button>
                        </Col>
                    </Row>
                </form>
            </Container>
            <Container className='my-5'>
                <Row>
                    { allBlogs.map((blogItem, index) =>
                    (
                        <Col md={ 4 } key={ index }>
                            <div className='flex flex-auto'>
                                <div className="mx-3 my-5 max-w-sm bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
                                    <img className="rounded-t-lg" src="/docs/images/blog/image-1.jpg" alt="" />
                                    <div className="p-5">
                                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{ blogItem.name }</h5>
                                        <p className="font-normal text-gray-700 dark:text-gray-400">{ blogItem.summary }</p>
                                    </div>
                                    <div className="d-flex mx-3 mb-2 gap-2">
                                        <button href="#" className="font-medium rounded bg-blue-500 px-5 py-2 text-white no-underline hover:underline">Edit Blog</button>
                                        <button href="#" className="font-medium rounded bg-red-500 px-5 py-2 text-white no-underline hover:underline" onClick={ () => { deleteBlog(blogItem._id); } }>Delete Blog</button>
                                    </div>
                                </div>
                            </div>
                        </Col>
                    ))
                    }
                </Row>
            </Container>
        </>
    )
}

export default AdminBlogs

