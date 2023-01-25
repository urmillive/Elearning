import React, { useState, useEffect, useContext } from 'react'
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import AuthContext from '../../contexts/authContext';
const BlogList = () =>
{
    const { api } = useContext(AuthContext);
    const [ blogList, setBlogList ] = useState([]);

    useEffect(() =>
    {
        api.get('/blog/').then((res) =>
        {
            setBlogList(res.data.blogs);
        }).catch((err) =>
        {
            console.log(err);
        })
    }, []);

    return (
        <>
            <Container className='my-5'>
                <Row>
                    { blogList.map((blogItem, index) =>
                    (
                        <Col md={ 4 } key={ index }>
                            <div className="mx-3 my-5 h-400 min-h-300 max-w-sm bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
                                <img className="rounded-t-lg" src="/docs/images/blog/image-1.jpg" alt="" />
                                <div className="p-3">
                                    <h3 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{ blogItem.name }</h3>
                                    <h5 className="font-normal text-gray-700 dark:text-gray-400">
                                        { blogItem.summary.slice(0, 30) + "..." }
                                    </h5>
                                </div>
                                <Link key={ blogItem._id } to={ `/blog/${ blogItem._id }` }
                                    className="no-underline inline-flex items-center mx-2 mb-2 px-3 py-2 text-md font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                    Read more
                                    <svg aria-hidden="true" className="w-4 h-4 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                                </Link>
                            </div>
                        </Col>
                    ))
                    }
                </Row>
            </Container>
        </>
    )
}

export default BlogList
