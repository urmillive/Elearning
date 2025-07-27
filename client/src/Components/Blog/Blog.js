import React, { useEffect, useContext, useState } from 'react';
import { Container, Row, Col, Spinner } from "react-bootstrap"; // Added Spinner
import { useParams } from "react-router-dom";
import AuthContext from '../../Contexts/authContext';
import '../CSS/BlogView.css'; // Import the new CSS file

const Blog = () => {
    const { id } = useParams();
    const { api, loading, setLoading } = useContext(AuthContext); // Added loading state
    const [blog, setBlog] = useState(null); // Initialize with null

    useEffect(() => {
        if (id) {
            setLoading(true);
            api.get(`/blogs/${id}`)
                .then((res) => {
                    if (res.data && res.data.blog) {
                        setBlog(res.data.blog);
                    } else {
                        setBlog(null); // Handle case where blog is not found
                    }
                })
                .catch((err) => {
                    console.error("Error fetching blog:", err.message);
                    setBlog(null);
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    }, [id, api, setLoading]);

    if (loading) {
        return (
            <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
                <Spinner animation="border" role="status" className="dark:text-white">
                    <span className="visually-hidden">Loading blog...</span>
                </Spinner>
            </Container>
        );
    }

    if (!blog) {
        return (
            <Container className="text-center my-5 dark:text-white">
                <h2>Blog Post Not Found</h2>
                <p>The blog post you are looking for does not exist or could not be loaded.</p>
            </Container>
        );
    }

    const authorName = blog.creator && blog.creator.name ? blog.creator.name : "Anonymous";
    const publicationDate = blog.createdAt ? new Date(blog.createdAt).toLocaleDateString() : "";

    return (
        <div className="blog-view-container dark:bg-slate-900 flex-grow">
            <Container>
                <Row className="justify-content-md-center">
                    <Col md={10} lg={8}>
                        <header className="blog-header">
                            <h1 className="blog-title-main">{blog.name}</h1>
                            <p className="blog-meta-single">
                                {authorName && <span>By {authorName}</span>}
                                {publicationDate && <span>Published on {publicationDate}</span>}
                            </p>
                        </header>
                        <div className="blog-content-wrapper" dangerouslySetInnerHTML={{ __html: blog.content }}></div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Blog;

