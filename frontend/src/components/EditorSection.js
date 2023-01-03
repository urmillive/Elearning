import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Dropdown, DropdownButton, Button } from "react-bootstrap";
import axios from 'axios';
import AceEditor from "react-ace";
import 'ace-builds/src-noconflict/ace';
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/mode-c_cpp";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/theme-monokai";
import { Spinner } from 'react-bootstrap';
import { BounceLoader } from 'react-spinners';

import './Editor.css';

const EditorSection = () => 
{
    const [ language, setLanguage ] = useState("python");
    const [ code, setCode ] = useState("print('hello world!')");
    const [ output, setOutput ] = useState();

    const onChangeEditor = (newValue) =>
    {
        setCode(newValue);
    }

    const handleSelect = (eventKey) =>
    {
        axios.get('http://localhost:8000/editor/languages', { eventKey })
            .then((res) =>
            {
                console.log(res.data);
                setLanguage(res.data);
            })
            .catch((err) =>
            {
                console.log("🚀 ~ file: EditorSection.js:35 ~ err", err);
            });
        setLanguage(eventKey);
    };

    const submitCode = () =>
    {
        axios.post('http://localhost:8000/editor/submit', { code })
            .then((res) =>
            {
                console.log(res.data);
                setOutput(res.data);
            })
            .catch((err) =>
            {
                console.log("🚀 ~ file: EditorSection.js:35 ~ err", err);
            });
    }

    const clearEditor = () =>
    {
        setCode("");
        setOutput("");
    }

     // useEffect(() =>
    // {
    // }, []);
    
    return (
        <>
            <Container fluid className='my-5'>
                <Row>
                    <Col md={ 7 }>
                        <AceEditor
                            placeholder="//Write your code here"
                            mode={ language }
                            theme="monokai"
                            name="editorX"
                            fontSize={ 20 }
                            showPrintMargin={ true }
                            showGutter={ true }
                            highlightActiveLine={ true }
                            onChange={ onChangeEditor }
                            value={ code }
                            setOptions={ {
                                enableBasicAutocompletion: true,
                                enableLiveAutocompletion: true,
                                enableSnippets: true,
                                showLineNumbers: true,
                                tabSize: 2,
                            } } />
                    </Col>
                    <Col md={ 4 }>
                        <h3>language : { language }</h3>
                        <h3>output : { output ? output : <Spinner animation="border" role="status" size="md">
                            <span className="visually-hidden">Loading...</span>
                        </Spinner>
                        }</h3>
                    </Col>
                </Row>
                <Row className='my-5'>
                    <Col md={ 2 } className="d-grid gap-2">
                        <DropdownButton
                            id="dropdown-button"
                            title={ language }
                            variant="primary"
                            onSelect={ handleSelect }
                        >
                            <Dropdown.Item eventKey="python">Python</Dropdown.Item>
                            <Dropdown.Item eventKey="c_cpp">C++</Dropdown.Item>
                            <Dropdown.Item eventKey="javascript">JavaScript</Dropdown.Item>
                            <Dropdown.Item eventKey="java">Java</Dropdown.Item>
                        </DropdownButton>
                    </Col>
                    <Col md={ 2 } className="d-grid gap-2">
                        <Button onClick={ submitCode } variant="success" block>
                            Run Code
                        </Button>
                    </Col>
                    <Col md={ 2 } className="d-grid gap-2">
                        <Button onClick={ clearEditor } variant="danger">Reset</Button>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default EditorSection;





