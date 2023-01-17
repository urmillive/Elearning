import React, { useRef, useState, useEffect } from "react";
import hljs from 'highlight.js';
import 'highlight.js/styles/panda-syntax-dark.css';
import "../css/copyButton.css";

function CodeBlock({ code = "print('hello world!')", language = "python" })
{
    const codeRef = useRef(null);
    const [ isCopied, setCopied ] = useState(false);
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
        hljs.highlightElement(codeRef.current);
    }, [ code ]);

    return (
        <>
            <div className="code-block">
                <div className="code-block-header">
                    <button className={ `copy-btn ${ isCopied ? 'success' : '' }` } onClick={ handleCopy }>
                        { isCopied ? 'Copied!' : <>
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                            </svg></> }
                    </button>
                </div>
                <pre className="code-block-content rounded-md" ref={ codeRef }>
                    <code>
                        { code }
                    </code>
                </pre>
            </div>

        </>
    );
}

export default CodeBlock;
