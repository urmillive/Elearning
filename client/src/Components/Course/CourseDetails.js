import React from 'react'
import { Container, Row, Col, Accordion } from "react-bootstrap";

const CourseDetails = () =>
{
    return (
        <>
            <Container fluid className="bg-zinc-900">
                <Row>
                    <Col md={ 8 }>
                        <div className="p-6 my-5 shadow-md rounded-lg bg-gray-200">
                            <h1 className="font-semibold text-4xl mb-3">Python for Beginners - Learn Programming from scratch</h1>
                            <h6>
                                Master Python by building 100 projects in 100 days. Learn data science, automation, build websites, games and apps!
                            </h6>
                            <hr className="my-6 border-gray-300" />
                        </div>
                    </Col>
                    <Col md={ 4 }>
                        <div className="mx-auto my-5 d-flex flex-col">
                            <img src='/images/i2.jpg' className='rounded' alt="" height={ 300 } width={400} />
                            <h4 className="text-white mt-2">₹150 Only</h4>
                            <button className='bg-yellow-500  py-3 px-5 rounded font-bold text-lg'>Buy Now</button>
                        </div>
                    </Col>
                </Row>
            </Container>
            <Container className='my-5'>
                <Row>
                    <Col md={ 12 }>
                        <Accordion defaultActiveKey="0">
                            <Accordion.Item eventKey="0">
                                <Accordion.Header>Course Module 1</Accordion.Header>
                                <Accordion.Body>
                                    Course Video 1
                                </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="1">
                                <Accordion.Header>Course Module 2</Accordion.Header>
                                <Accordion.Body>
                                    Course Video 2
                                </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="3">
                                <Accordion.Header>Course Module 3</Accordion.Header>
                                <Accordion.Body>
                                    Course Video 3
                                </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="4">
                                <Accordion.Header>Course Module 4</Accordion.Header>
                                <Accordion.Body>
                                    Course Video 4
                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default CourseDetails;

