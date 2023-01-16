const express = require('express');
const app = express();
const cors = require("cors");
const axios = require('axios');
const { Buffer } = require('buffer');
const config = require('./config.json');

app.use(cors());
app.use(express.json());

app.post("/editor/submit", (req, res) =>
{
    // process of code

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
            'X-RapidAPI-Key': config.apiToken,
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
                'X-RapidAPI-Key': config.apiToken,
                'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com'
            }
        };
        axios.request(options2).then(function (response2)
        {
            if (response2.data.stderr == null)
            {
                const encodedData = response2.data.stdout;
                const data = Buffer.from(encodedData, 'base64').toString();
                res.send(data);
            }
            else
            {
                const encodedData = response2.data.stderr;
                const data = Buffer.from(encodedData, 'base64').toString();
                res.send(data);
            }
        }).catch((err) =>
        {
            res.send(err);
        });

    }).catch(function (error)
    {
        console.error(error);
    });
});

app.post("/editor/languages", (req, res) =>
{
    const languagesOption = {
        method: 'GET',
        url: 'https://judge0-ce.p.rapidapi.com/languages',
        headers: {
            'X-RapidAPI-Key': config.apiToken,
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
});

app.listen(8000, () =>
{
    console.log("running express...");
})
