import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Dropdown, Button } from "react-bootstrap";
import axios from 'axios';
import AceEditor from "react-ace";
import 'ace-builds/src-noconflict/ace';
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/theme-monokai";
import './CSS/Editor.css';
 
const EditorSection = () => 
{
    const [ code, setCode ] = useState("print('hello world!')");
    const [ output, setOutput ] = useState();
    const [ language, setLanguage ] = useState([]);
    const [ selectedLanguage, setSelectedLanguage ] = useState();
    const [ langId, setlangId ] = useState();

    const handleChange = (eventKey, item) =>
    {
        console.log(item.name);
        setSelectedLanguage(item.name);
        setlangId(item.id);
    };

    const onChangeEditor = (newValue) =>
    {
        setCode(newValue);
    }

    const submitCode = () =>
    {
        axios.post('http://localhost:8000/editor/submit', { code, langId })
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
    useEffect(() =>
    {
        const fetchData = async () =>
        {
            try
            {
                const res = await axios.post('http://localhost:8000/editor/languages/');
                setLanguage(res.data);
            } catch (error)
            {
                console.log("🚀 ~ file: EditorSection.js:35 ~ err", error);
            }
        };

        fetchData();
    }, []);


    return (
        <>
            <Container fluid className='my-5'>
                <Row>
                    <Col md={ 8 }>
                        <AceEditor
                            placeholder="//Write your code here"
                            mode="python"
                            theme="monokai"
                            name="editorX"
                            fontSize={ 20 }
                            showPrintMargin={ true }
                            showGutter={ true }
                            highlightActiveLine={ true }
                            onChange={ onChangeEditor }
                            value={ code }
                        />
                    </Col>
                    <Col md={ 4 } className="bg-dark">
                        <Col md={ 12 } className="d-grid gap-2 my-2">
                            <Button onClick={ submitCode } variant="success" block="block">
                                Run Code
                            </Button>
                        </Col>
                        <Col md={ 12 } className="d-grid gap-2 my-2">
                            <Button onClick={ clearEditor } variant="danger">Reset</Button>
                        </Col>
                        <Dropdown>
                            <Dropdown.Toggle variant="warning" id="dropdown-basic" style={ { width: '100%' } }>
                                { selectedLanguage ? selectedLanguage : "Select Language" }
                            </Dropdown.Toggle>
                            <Dropdown.Menu style={ { height: '200px', overflow: 'scroll' } }>
                                { language.map(item => (
                                    <Dropdown.Item eventKey={ item.name } name={ item.name } key={ item.id } onClick={ (eventKey) => handleChange(eventKey, item) }>
                                        { item.name }
                                    </Dropdown.Item>
                                )) }
                            </Dropdown.Menu>
                        </Dropdown>
                        <h2 className='text-secondary my-3'>Output🔽</h2>
                        <div className='text-secondary mt-5 outputBlock'>
                            <h5 className='text-white'>{ output ? output : "" } </h5>
                            <p className='text-white'>
                            </p>
                        </div>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default EditorSection;
