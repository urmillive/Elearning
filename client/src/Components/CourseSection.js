import React from 'react'
import { Container, Row, Col } from "react-bootstrap";
import CardX from "./UI/Card.js";

const CourseSection = () =>
{
    return (
        <>
            <Container>
                <Row className='my-5'>
                    <Col md={ 4 }>
                        <CardX image="/images/i1.jpg" />
                    </Col>
                    <Col md={ 4 }>
                        <CardX image="/images/i2.jpg" />
                    </Col>
                    <Col md={ 4 }>
                        <CardX image="/images/i3.jpg" />
                    </Col>
                </Row>
                <Row className='my-5'>
                    <Col md={ 4 }>
                        <CardX image="/images/i1.jpg" />
                    </Col>
                    <Col md={ 4 }>
                        <CardX image="/images/i2.jpg" />
                    </Col>
                    <Col md={ 4 }>
                        <CardX image="/images/i3.jpg" />
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default CourseSection;
