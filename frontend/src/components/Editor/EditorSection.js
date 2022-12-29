import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from "react-bootstrap";
import axios from 'axios';
import AceEditor from "react-ace";
import 'ace-builds/src-noconflict/ace';
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-monokai";
import "./Editor.css"

const EditorSection = () =>
{


    const [ editorValue, setEditorValue ] = useState("");
    const onChangeEditor = (newValue) =>
    {
        setEditorValue(newValue);
        console.log(newValue);
    }
    useEffect(() =>
    {

        // const editor = AceEditor.current.editor;
        const options = {
            method: 'GET',
            url: 'https://judge0-ce.p.rapidapi.com/submissions/2e979232-92fd-4012-97cf-3e9177257d10',
            params: { base64_encoded: 'true', fields: '*' },
            headers: {
                'X-RapidAPI-Key': '7084eecd5bmsh74a242975252cc5p134c73jsne8432e550977',
                'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com'
            }
        };

        axios.post('https://judge0-ce.p.rapidapi.com/submissions', options)
            .then(response =>
            {
                console.table(response);
            })
            .catch(error =>
            {
                console.log(error);
            });
    }, []);

    return (
        <>
            <Container fluid className='my-5'>
                <Row>
                    <Col md={ 8 }>
                        <AceEditor
                            placeholder="//Write your code here"
                            mode="javascript"
                            theme="monokai"
                            name="editorX"
                            onChange={ onChangeEditor }
                            fontSize={ 20 }
                            showPrintMargin={ true }
                            showGutter={ true }
                            highlightActiveLine={ true }
                            value={ editorValue }
                            setOptions={ {
                                enableBasicAutocompletion: true,
                                enableLiveAutocompletion: true,
                                enableSnippets: true,
                                showLineNumbers: true,
                                tabSize: 2,
                            } } />
                    </Col>
                    <Col md={ 4 }>
                        <button className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded">
                            Run Code
                        </button>
                        <button className="bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 mx-1 border-b-4 border-red-700 hover:border-red-500 rounded">
                            Reset
                        </button>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default EditorSection;





