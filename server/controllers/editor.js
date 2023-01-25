const axios = require('axios');
const { Buffer } = require('buffer');
require('dotenv').config();
const JUDGE_API = process.env.JUDGE_API;

exports.postEditorSubmit = (req, res) =>
{
    // const data = 'print("hello world"';
    const data = req.body.code;
    const languageID = req.body.langId;
    const encodedData = Buffer.from(data).toString('base64');

    const dataJson = {
        language_id: languageID,
        source_code: encodedData,
        stdin: 'STRING'
    };
    const options = {
        method: 'POST',
        url: 'https://judge0-ce.p.rapidapi.com/submissions',
        params: { base64_encoded: 'true', fields: '*' },
        headers: {
            'content-type': 'application/json',
            'Content-Type': 'application/json',
            'X-RapidAPI-Key': JUDGE_API,
            'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com'
        },
        data: JSON.stringify(dataJson)
    };

    axios.request(options).then(function (response)
    {
        const token = response.data.token;
        const options2 = {
            method: 'GET',
            url: 'https://judge0-ce.p.rapidapi.com/submissions/' + token,
            params: { base64_encoded: 'true', fields: '*' },
            headers: {
                'X-RapidAPI-Key': JUDGE_API,
                'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com'
            }
        };
        axios.request(options2).then(function (response2)
        {
            if (response2.data.stderr == null)
            {
                const encodedData = response2.data.stdout;
                const data = Buffer.from(encodedData, 'base64').toString();
                // res.send(data);
                res.status(200).json({ message: "Code Run Successfully", data: data });
            }
            else
            {
                const encodedData = response2.data.stderr;
                const data = Buffer.from(encodedData, 'base64').toString();
                res.status(200).json({ message: "Error in your Code", data: data });
            }
        }).catch((err) =>
        {
            res.send(err);
        });

    }).catch(function (error)
    {
        console.error(error);
    });
}

exports.postEditorLanguage = (req, res) =>
{
    const languagesOption = {
        method: 'GET',
        url: 'https://judge0-ce.p.rapidapi.com/languages',
        headers: {
            'X-RapidAPI-Key': JUDGE_API,
            'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com'
        }
    };

    axios.request(languagesOption).then((lang) =>
    {
        res.send(lang.data);
    }).catch(function (error)
    {
        console.error(error);
    });
}
