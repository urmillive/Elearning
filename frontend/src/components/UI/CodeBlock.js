import React, { useRef, useState, useEffect } from "react";
import hljs from 'highlight.js';
import 'highlight.js/styles/panda-syntax-dark.css';
// import hljs from 'highlight.js/lib/highlight';
// import python from 'highlight.js/lib/languages/javascript';


function CodeBlock({ code = "print('hello world!')", language = "python" })
{
    const codeRef = useRef(null);
    const [ copied, setCopied ] = useState(false);
    const handleCopy = async () =>
    {
        try
        {
            await navigator.clipboard.writeText(code);
            setCopied(true);
        } catch (err)
        {
            console.error('Failed to copy text: ', err);
        }
    };

    useEffect(() =>
    {
        hljs.highlightBlock(codeRef.current);
    }, [ code ]);

    return (
        <>
            <pre className="rounded-md">
                <code ref={ codeRef } className={ language }>
                    { code }
                </code>
            </pre>
            <button className="bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white px-4 py-2 rounded-lg" onClick={ handleCopy }>
                { copied ? 'Copied!' : 'Copy Code' }
            </button>
        </>
    );
}

export default CodeBlock;
