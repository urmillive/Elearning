const axios = require('axios');
const { Buffer } = require('buffer');
require('dotenv').config();
const JDOODLE_CLIENT_ID = process.env.JDOODLE_CLIENT_ID;
const JDOODLE_CLIENT_SECRET = process.env.JDOODLE_CLIENT_SECRET;

exports.postEditorSubmit = async (req, res) => {
    const { code, language, versionIndex, stdin } = req.body;

    if (!JDOODLE_CLIENT_ID || !JDOODLE_CLIENT_SECRET) {
        return res.status(500).json({ message: "JDoodle API credentials not configured." });
    }

    const program = {
        script: code,
        language: language, // e.g., "python3", "java", "cpp17"
        versionIndex: versionIndex || "0", // "0" for latest, check JDoodle docs for specific versions
        stdin: stdin || "",
        clientId: JDOODLE_CLIENT_ID,
        clientSecret: JDOODLE_CLIENT_SECRET
    };

    try {
        const response = await axios({
            method: 'POST',
            url: 'https://api.jdoodle.com/v1/execute',
            data: program,
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.data.error) {
             // JDoodle API might return an error message in response.data.error for compilation/runtime issues
             // or a non-200 status code for API errors.
            res.status(200).json({ message: "Error in your Code or API issue", data: response.data.error, fullResponse: response.data });
        } else if (response.data.output) {
            res.status(200).json({ message: "Code Run Successfully", data: response.data.output, fullResponse: response.data });
        } else {
            // Handle cases where output might be empty for successful execution (e.g. no print statements)
            // but check statusCode for actual errors.
            if (response.data.statusCode === 200) {
                 res.status(200).json({ message: "Code Executed (No Output)", data: "", fullResponse: response.data });
            } else {
                 res.status(200).json({ message: "Error during execution", data: response.data.output || "Unknown error", fullResponse: response.data });
            }
        }
    } catch (error) {
        console.error("JDoodle API request error:", error.response ? error.response.data : error.message);
        let errorMessage = "Failed to execute code via JDoodle API.";
        let errorDetails = null;
        if (error.response) {
            errorMessage = error.response.data.error || errorMessage;
            errorDetails = error.response.data;
        }
        res.status(error.response ? error.response.status : 500).json({ message: errorMessage, error: errorDetails });
    }
};

/*
JDoodle's free API does not provide a direct equivalent for fetching all language details
as Judge0 did. You may need to manage the list of supported languages on the client-side
or use a predefined list. The `postEditorLanguage` function is commented out for this reason.

exports.postEditorLanguage = (req, res) => {
    // const languagesOption = {
    //     method: 'GET',
    //     url: 'https://api.jdoodle.com/v1/languages', // This endpoint does not exist or is not for this purpose
    //     headers: {
    //         // JDoodle authentication is typically done via clientId and clientSecret in the request body for /execute
    //     }
    // };
    //
    // axios.request(languagesOption).then((lang) => {
    //     res.send(lang.data);
    // }).catch(function (error) {
    //     console.error(error);
    //     res.status(500).send("Error fetching languages.");
    // });
    res.status(501).json({ message: "Language listing endpoint is not available with the current JDoodle integration." });
};
*/

// Placeholder for postEditorLanguage if you decide to implement a static list or other solution
exports.postEditorLanguage = (req, res) => {
    // Example: Return a static list of common languages supported by JDoodle
    // You should verify these against JDoodle's documentation for accuracy and supported versionIndexes
    const supportedLanguages = [
        { id: 71, name: "Java", language: "java", versionIndex: "4", aceMode: "java" },
        { id: 70, name: "Python 3", language: "python3", versionIndex: "4", aceMode: "python" },
        { id: 54, name: "C++ 17", language: "cpp17", versionIndex: "1", aceMode: "c_cpp" },
        { id: 63, name: "JavaScript (Node.js)", language: "nodejs", versionIndex: "4", aceMode: "javascript" },
        { id: 50, name: "C", language: "c", versionIndex: "5", aceMode: "c_cpp" }
        // Add more languages as needed. Verify language codes and versionIndexes from JDoodle documentation.
        // Ace editor modes: java, python, c_cpp, javascript, etc.
    ];
    res.status(200).json(supportedLanguages);
};
