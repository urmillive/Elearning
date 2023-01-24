import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from "react-bootstrap";
import swal from 'sweetalert';
import { useNavigate } from "react-router-dom";
import BlogForm from "./BlogForm";
import api from '../../api/api';

const AdminBlogs = () =>
{
    const navigate = useNavigate();
    const [ blogs, setBlogs ] = useState([]);

    const deleteBlog = (userId) =>
    {
        api.delete(`/blog/${ userId }`)
            .then((res) =>
            {
                swal({
                    title: res.data.message,
                    icon: "success",
                });
                getBlogs();
            }).catch((err) =>
            {
                console.log(err.message);
            })
    }

    const getBlogs = () =>
    {
        api.get('/blog/')
            .then((res) =>
            {
                setBlogs(res.data.blogs);
            }).catch((err) =>
            {
                console.log("🚀 ~ file: AdminBlogs.js:~ err", err);
            })
    }

    useEffect(() =>
    {
        getBlogs();
    }, []);

    return (
        <>
            <BlogForm getBlogs={ getBlogs } />
            <Container className='my-5'>
                <Row>
                    { blogs.map((blogItem, index) =>
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
                                        <button href="#" className="font-medium rounded bg-blue-500 px-5 py-2 text-white no-underline hover:underline" onClick={ () => { navigate(`/admin/blogs/${ blogItem._id }`); } }>Edit Blog</button>
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
