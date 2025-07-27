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
    const [ code, setCode ] = useState("print('hello world!')"); // Default to Python
    const [ output, setOutput ] = useState("");
    const [ languages, setLanguages ] = useState([]); // Renamed for clarity
    const [ selectedLanguage, setSelectedLanguage ] = useState(null); // Will store the whole language object

    const handleChange = (item) => // eventKey is not directly used, item is the language object
    {
        setSelectedLanguage(item);
        setCode(getDefaultCodeForLanguage(item.aceMode)); // Optional: set default code snippet
    };

    const onChangeEditor = (newValue) =>
    {
        setCode(newValue);
    }

    // Helper function to provide default code snippets (optional)
    const getDefaultCodeForLanguage = (aceMode) => {
        switch (aceMode) {
            case "python":
                return "print('Hello, Python!')";
            case "javascript":
                return "console.log('Hello, JavaScript!');";
            case "java":
                return "public class Main {\n    public static void main(String[] args) {\n        System.out.println(\"Hello, Java!\");\n    }\n}";
            case "c_cpp": // For C and C++
                 return "#include <iostream>\n\nint main() {\n    std::cout << \"Hello, C++!\" << std::endl;\n    return 0;\n}";
            default:
                return "";
        }
    };

    const submitCode = () =>
    {
        if (!selectedLanguage) {
            alert("Please select a language.");
            return;
        }
        setLoading(true);
        setOutput(""); // Clear previous output

        const payload = {
            code,
            language: selectedLanguage.language, // e.g., "python3"
            versionIndex: selectedLanguage.versionIndex, // e.g., "0"
            stdin: "" // Add stdin input field later if needed
        };

        api.post('/editor/submit', payload)
            .then((res) =>
            {
                setLoading(false);
                if (res.status === 200)
                {
                    // The backend now sends { message: "...", data: "...", fullResponse: {...} }
                    // For errors, data might be an error string or details from JDoodle
                    console.log("API Response:", res.data);
                    setOutput(res.data.data || res.data.message || "No output/error message.");
                    if (res.data.message.toLowerCase().includes("error")) {
                        // Optionally handle errors differently, e.g., style output
                        console.error("Execution Error/Warning:", res.data.data || res.data.message);
                    }
                } else {
                     // This case might not be hit if backend normalizes to 200 with error message
                    setOutput(`Error: ${res.status} ${res.statusText}`);
                }
            })
            .catch((err) =>
            {
                setLoading(false);
                console.error("API Call Error:", err.response ? err.response.data : err.message);
                setOutput(`Failed to run code. ${err.response ? (err.response.data.message || err.message) : err.message}`);
            });
    }

    const clearEditor = () =>
    {
        if (selectedLanguage) {
            setCode(getDefaultCodeForLanguage(selectedLanguage.aceMode));
        } else {
            setCode("");
        }
        setOutput("");
    }
    useEffect(() =>
    {
        const fetchData = async () =>
        {
            setLoading(true);
            try
            {
                const res = await api.post('/editor/languages/'); // Should be GET if not sending body, but matching existing
                if (res.data && res.data.length > 0) {
                    setLanguages(res.data);
                    // Set default selected language to the first one, e.g., Python if it's first
                    const defaultLang = res.data.find(lang => lang.language === "python3") || res.data[0];
                    setSelectedLanguage(defaultLang);
                    setCode(getDefaultCodeForLanguage(defaultLang.aceMode));
                } else {
                    setLanguages([]);
                    setSelectedLanguage(null);
                }
            } catch (error)
            {
                console.error("Failed to fetch languages:", error.response ? error.response.data : error.message);
                setLanguages([]);
                setSelectedLanguage(null);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [api, setLoading]); // Add dependencies


    return (
        <>
            <Container fluid className='my-2'>
                <Row>
                    <Col md={ 8 }>
                        <AceEditor
                            placeholder="//Write your code here"
                            mode={selectedLanguage ? selectedLanguage.aceMode : "python"}
                            theme="monokai"
                            name="editorX"
                            fontSize={ 20 }
                            showPrintMargin={ true }
                            showGutter={ true }
                            highlightActiveLine={ true }
                            onChange={ onChangeEditor }
                            value={ code }
                            width="100%"
                            setOptions={{ useWorker: false }} // Disables syntax checking worker to avoid console errors for missing workers
                        />
                    </Col>
                    <Col md={ 4 } className="bg-dark">
                        <Col md={ 12 } className="d-grid gap-2 my-2">
                            <button onClick={ submitCode } className="bg-green-500 px-5 py-3 rounded text-dark font-bold text-lg" disabled={loading || !selectedLanguage}>
                                {loading ? "Running..." : "Run Code"}
                            </button>
                        </Col>
                        <Col md={ 12 } className="d-grid gap-2 my-2">
                            <button className="bg-red-500 px-5 py-3 rounded text-white font-bold text-lg" onClick={ clearEditor } variant="danger">Reset</button>
                        </Col>
                        <Dropdown>
                            <Dropdown.Toggle className="bg-green-500 px-5 py-3 rounded text-dark text-white font-bold text-lg" id="dropdown-basic" style={ { width: '100%' } } disabled={loading}>
                                { selectedLanguage ? selectedLanguage.name : "Select Language" }
                            </Dropdown.Toggle>
                            <Dropdown.Menu style={ { width: '100%', maxHeight: '200px', overflowY: 'auto' } }>
                                { languages.map(item => (
                                    <Dropdown.Item
                                        eventKey={item.id} /* Keep unique key for React */
                                        key={ item.id }
                                        onClick={ () => handleChange(item) }
                                        active={selectedLanguage && selectedLanguage.id === item.id}
                                    >
                                        { item.name }
                                    </Dropdown.Item>
                                )) }
                                {languages.length === 0 && !loading && <Dropdown.Item disabled>No languages loaded</Dropdown.Item>}
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
