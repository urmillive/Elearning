import React, { useState, useEffect, useContext } from 'react'
import { Container, Row, Col, Spinner } from "react-bootstrap"; // Added Spinner
// import { Link } from "react-router-dom"; // Link is now in BlogCard
import AuthContext from '../../Contexts/authContext';
import BlogCard from './BlogCard'; // Import the new BlogCard component

const BlogList = () =>
{
    const { api, loading, setLoading } = useContext(AuthContext); // Added loading and setLoading
    const [ blogList, setBlogList ] = useState([]);

    useEffect(() =>
    {
        setLoading(true);
        api.get('/blogs/')
            .then((res) => {
                if (res.data && res.data.blogs) {
                    setBlogList(res.data.blogs);
                } else {
                    setBlogList([]);
                }
            })
            .catch((err) => {
                console.error("Error fetching blogs:", err);
                setBlogList([]);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [api, setLoading]); // Added dependencies

    if (loading && blogList.length === 0) {
        return (
            <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
                <Spinner animation="border" role="status" className="dark:text-white">
                    <span className="visually-hidden">Loading blogs...</span>
                </Spinner>
            </Container>
        );
    }

    return (
        <div className="dark:bg-slate-900 py-5 flex-grow"> {/* Added padding and flex-grow */}
            <Container>
                <h2 className="text-center mb-5 display-4 dark:text-white">Latest Blog Posts</h2>
                {blogList.length === 0 && !loading ? (
                    <p className="text-center dark:text-slate-300">No blog posts available at the moment.</p>
                ) : (
                    <Row xs={1} md={2} lg={3} className="g-4"> {/* Responsive grid */}
                        { blogList.map((blogItem) => (
                            <Col key={blogItem._id} className="d-flex align-items-stretch"> {/* Ensure cards align height */}
                                <BlogCard blog={blogItem} />
                            </Col>
                        ))}
                    </Row>
                )}
            </Container>
        </div>
    )
}

export default BlogList
