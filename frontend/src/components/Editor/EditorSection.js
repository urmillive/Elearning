import React, { useEffect, useState } from 'react'
import Axios from "axios";

import AceEditor from "react-ace";
import 'ace-builds/src-noconflict/ace';
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-monokai";
// ace/webpack-resolver
const EditorSection = () =>
{
    useEffect(() =>
    {
        // const editor = AceEditor.current.editor;
    }, []);

    const [ editorValue, setEditorValue ] = useState("");
    const onChangeEditor = (newValue) =>
    {
        setEditorValue(newValue);
        console.log("change", newValue);
    }
    return (
        <div className="editor">
            <AceEditor
                placeholder="//Write your code here"
                mode="javascript"
                theme="monokai"
                name="blah2"
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
        </div>
    );
};



export default EditorSection;





