import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import CodeBlock from "../components/UI/CodeBlock";
const Learning = () =>
{
    return (
        <>
            <Container>
                <Row>
                    <Col className="" md={ 12 }>
                        <CodeBlock code='#include <stdio.h>
						int main() {
						// printf() displays the string inside quotation
						printf("Hello, World!");
						return 0;
						}'
                            language='cpp' />
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default Learning

