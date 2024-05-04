import React, { useEffect, useContext, useState } from 'react'
import { Container, Row, Col } from "react-bootstrap";
import { useParams } from "react-router-dom";
import AuthContext from '../../Contexts/authContext';
const Blog = () =>
{
	const { id } = useParams();
	const { api } = useContext(AuthContext);
	const [ blog, setBlog ] = useState({});
	useEffect(() =>
	{
		api.get(`/blog/${ id }`)
			.then((res) =>
			{
				setBlog(res.data.blog);
			}).catch((err) =>
			{
				console.log(err.message);
			})
	}, []);

	return (
		<>
			<Container className='my-5'>
				<Row>
					<Col md={ { span: 8, offset: 2 } } >
						<div dangerouslySetInnerHTML={ { __html: blog.content } }></div>
					</Col>
				</Row>
			</Container>
		</>
	)
}

export default Blog

