import React, { useEffect, useContext, useState } from 'react'
import { Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import { useParams } from "react-router-dom";
import AuthContext from '../../contexts/authContext';
const Blog = () =>
{
	const { id } = useParams();
	const { token } = useContext(AuthContext);
	const [ blog, setBlog ] = useState({});
	useEffect(() =>
	{
		axios
			.get(`http://localhost:9999/blog/${ id }`, {
				headers: {
					Authorization: `Bearer ${ token }`
				}
			})
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
			<Container>
				<Row>
					<Col md={ 12 }>
						<div dangerouslySetInnerHTML={ { __html: blog.content } }></div>
					</Col>
				</Row>
			</Container>
		</>
	)
}

export default Blog

