import React, { useEffect } from 'react'
import { Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import { useParams } from "react-router-dom";

const Blog = () =>
{
	const { id } = useParams();
	console.log(id);

	const oneBlog = (blogId) =>
	{
		const token = localStorage.getItem('token');
		axios
			.get(`http://localhost:9999/blog/${ blogId }`, {
				headers: {
					Authorization: `Bearer ${ token }`
				}
			})
			.then((res) =>
			{
				console.log(res.data);
			}).catch((err) =>
			{
				console.log(err.message);
			})
	}
	// useEffect(() =>
	// {
	//   oneBlog(id);
	// }, [ id ]);

	return (
		<>
			<Container>
				<Row>
					<Col md={ 12 }>
						<h1>Blog</h1>
					</Col>
				</Row>
			</Container>
		</>
	)
}

export default Blog

