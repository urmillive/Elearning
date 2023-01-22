import React, { useState, useRef, useMemo } from 'react';
import { Container, Form, Row, Col, FloatingLabel } from "react-bootstrap";
import JoditEditor from 'jodit-react';
import axios from "axios";

const AdminBlogs = () =>
{
    const editor = useRef(null);
    const [ content, setContent ] = useState({
        title: "",
        summery: "",
        password: ""
    });

    const handleChange = (event) =>
    {
        event.preventDefault();
        const { name, value } = event.target;
        setContent({ ...content, [ name ]: value });
    }
    const submitBlog = (e) =>
    {
        e.preventDefault();
        // axios.post('http://localhost:9999/register', user)
        //     .then((res) =>
        //     {
        //         if (res.data.status === true)
        //         {
        //             const token = res.data.token;
        //             userLogin(token);
        //             swal({
        //                 title: res.data.message,
        //                 text: `Welcome ${ res.data.user.firstName }`,
        //                 icon: "success",
        //                 button: "Explore"
        //             });
        //             navigate("/courses");
        //         } else
        //         {
        //             swal({
        //                 title: res.data.message,
        //                 icon: "warning",
        //                 button: "close"
        //             });
        //             navigate("/register");
        //         }
        //     })
        //     .catch((err) =>
        //     {
        //         console.log("🚀 ~ file: Register.js:~ err", err);
        //     });
    }

    return (
        <>

            <Container>
                <form method="POST" onSubmit={ submitBlog }>
                    <Row className="justify-content-md-center my-5">
                        <Col md={ 8 }>
                            <FloatingLabel controlId="floatingtitle" label="Blog Title" className="mb-3">
                                <Form.Control type="text" placeholder="Blog Title" name="title" value={ content.title } onChange={ handleChange } required />
                            </FloatingLabel>
                            <JoditEditor
                                ref={ editor }
                                value={ content.summery }
                                tabIndex={ 1 } // tabIndex of textarea
                                onChange={ newContent => setContent(newContent) }
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
                    <Col md={ 4 }>
                        <div className='flex flex-auto'>
                            <div className="mx-3 my-5 max-w-sm bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
                                <img className="rounded-t-lg" src="/docs/images/blog/image-1.jpg" alt="" />
                                <div className="p-5">
                                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Noteworthy technology acquisitions 2021</h5>
                                    <p className="font-normal text-gray-700 dark:text-gray-400">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
                                </div>
                                <div className="d-flex mx-3 mb-2 gap-2">
                                    <button href="#" class="font-medium rounded bg-blue-500 px-5 py-2 text-white no-underline hover:underline">Edit Blog</button>
                                    <button href="#" class="font-medium rounded bg-red-500 px-5 py-2 text-white no-underline hover:underline">Delete Blog</button>
                                </div>
                            </div>
                        </div>
                    </Col>
                    <Col md={ 4 }>
                        <div className='flex flex-auto'>
                            <div className="mx-3 my-5 max-w-sm bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
                                <img className="rounded-t-lg" src="/docs/images/blog/image-1.jpg" alt="" />
                                <div className="p-5">
                                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Noteworthy technology acquisitions 2021</h5>
                                    <p className="font-normal text-gray-700 dark:text-gray-400">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
                                </div>
                                <div className="d-flex mx-3 mb-2 gap-2">
                                    <button href="#" class="font-medium rounded bg-blue-500 px-5 py-2 text-white no-underline hover:underline">Edit Blog</button>
                                    <button href="#" class="font-medium rounded bg-red-500 px-5 py-2 text-white no-underline hover:underline">Delete Blog</button>
                                </div>
                            </div>
                        </div>
                    </Col>
                    <Col md={ 4 }>
                        <div className='flex flex-auto'>
                            <div className="mx-3 my-5 max-w-sm bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
                                <img className="rounded-t-lg" src="/docs/images/blog/image-1.jpg" alt="" />
                                <div className="p-5">
                                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Noteworthy technology acquisitions 2021</h5>
                                    <p className="font-normal text-gray-700 dark:text-gray-400">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
                                </div>
                                <div className="d-flex mx-3 mb-2 gap-2">
                                    <button href="#" class="font-medium rounded bg-blue-500 px-5 py-2 text-white no-underline hover:underline">Edit Blog</button>
                                    <button href="#" class="font-medium rounded bg-red-500 px-5 py-2 text-white no-underline hover:underline">Delete Blog</button>
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default AdminBlogs

