import React from 'react';
import "./editor.css";

const editor = () =>
{
    return (
        <>
            <div id="editor">some text</div>
            <script src="./ace.js" type="text/javascript" charset="utf-8"></script>
            <script>
                var editor = ace.edit("editor");
                editor.setTheme("monokai");
                editor.session.setMode("ace/mode/javascript");
            </script>
            
        </>
    )
}

export default editor
