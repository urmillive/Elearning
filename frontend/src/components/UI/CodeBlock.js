import React, { useRef, useEffect } from "react";
import hljs from 'highlight.js';
import 'highlight.js/styles/panda-syntax-dark.css';
// import hljs from 'highlight.js/lib/highlight';
// import python from 'highlight.js/lib/languages/javascript';


function CodeBlock({ code = "print('hello world!')", language = "python" })
{
    const codeRef = useRef(null);

    useEffect(() =>
    {
        hljs.highlightBlock(codeRef.current);
    }, [ code ]);

    return (
        <pre className="rounded-md">
            <code ref={ codeRef } className={ language }>
                { code }
            </code>
        </pre>
    );
}

export default CodeBlock;
