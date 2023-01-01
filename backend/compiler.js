
const express = require('express');
const app = express();
const axios = require('axios');
const { response } = require('express');
const API_KEY = '7084eecd5bmsh74a242975252cc5p134c73jsne8432e550977';

const getAPI = () =>
{
    const options = {
        method: 'POST',
        url: 'https://judge0-ce.p.rapidapi.com/submissions',
        params: { base64_encoded: 'true', fields: '*' },
        headers: {
            'content-type': 'application/json',
            'Content-Type': 'application/json',
            'X-RapidAPI-Key': '7084eecd5bmsh74a242975252cc5p134c73jsne8432e550977',
            'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com'
        },
        data: '{"language_id":52,"source_code":"hello"}'
    };

    axios.request(options).then((response) =>
    {
        console.info(response.data);
    }).catch(function (error)
    {
        console.error("->", error);
    });
}
// <ge></ge>tAPI();


app.get("/editor", (req, res) =>
{
    const option = {
        method: 'GET',
        url: 'https://judge0-ce.p.rapidapi.com/languages/',
        headers: {
            'X-RapidAPI-Key': API_KEY,
            'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com'
        }
    };

    axios.request(option).then((response) =>
    {
        console.log("Language showing....")
        console.log(response.data);

    }).catch((err) =>
    {
        console.log(err)
    });
    res.send(lang);
})

app.listen(8000, () =>
{
    console.log("running express...");
})
