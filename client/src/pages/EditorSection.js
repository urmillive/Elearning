import React, { useContext, useEffect, useState } from 'react';
import { Container, Row, Col, Dropdown } from "react-bootstrap";
import AceEditor from "react-ace";
import 'ace-builds/src-noconflict/ace';
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/theme-monokai";
import './css/Editor.css';
import AuthContext from "../Contexts/authContext";
import { Circles } from "react-loader-spinner";
const EditorSection = () => 
{
    const { api, loading, setLoading } = useContext(AuthContext);
    const [ code, setCode ] = useState("print('hello world!')");
    const [ output, setOutput ] = useState();
    const [ language, setLanguage ] = useState([]);
    const [ selectedLanguage, setSelectedLanguage ] = useState();
    const [ langId, setlangId ] = useState();

    const handleChange = (eventKey, item) =>
    {
        setSelectedLanguage(item.name);
        setlangId(item.id);
    };

    const onChangeEditor = (newValue) =>
    {
        setCode(newValue);
    }

    const submitCode = () =>
    {
        setLoading(true);

        api.post('/editor/submit', { code, langId })
            .then((res) =>
            {
                if (res.status === 200)
                {
                    setLoading(false);
                    console.log("=>", res.data.data);
                    setOutput(res.data.data);
                }
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
                const res = await api.post('/editor/languages/');
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
            <Container fluid className='my-2'>
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
                            <button onClick={ submitCode } className="bg-green-500 px-5 py-3 rounded text-dark font-bold text-lg" block="block">
                                Run Code
                            </button>
                        </Col>
                        <Col md={ 12 } className="d-grid gap-2 my-2">
                            <button className="bg-red-500 px-5 py-3 rounded text-white font-bold text-lg" onClick={ clearEditor } variant="danger">Reset</button>
                        </Col>
                        <Dropdown>
                            <Dropdown.Toggle className="bg-green-500 px-5 py-3 rounded text-dark text-white font-bold text-lg" id="dropdown-basic" style={ { width: '100%' } }>
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
                        <h2 className='text-secondary my-3 text-center'>Output🔽</h2>
                        <div className='text-secondary mt-5 outputBlock'>
                            {
                                loading ? <div className="mx-5 d-flex flex-column align-items-center justify-content-center">
                                    <Circles
                                        height="80"
                                        width="80"
                                        color="#ffd500"
                                        ariaLabel="circles-loading"
                                        wrapperStyle={ {} }
                                        wrapperClass=""
                                        visible={ true }
                                    />
                                </div> : <h5 className='text-white'>{ output ? output : "" } </h5>
                            }
                        </div>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default EditorSection;
