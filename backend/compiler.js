// const request = require('request');

// compiler_api_endpoint = "";
// const languages = [ 'Python', 'Node JS', 'Php', 'Java', 'C', 'Cpp', 'Cpp14', 'Csharp' ];

// const EditorAPI = (callback) =>
// {
//     request("https://ide.geeksforgeeks.org", { json: true }, (err, res, body) =>
//     {
//         if (err)
//         {
//             return callback(err);
//         }
//         return callback(body);
//     })
// }


// module.exports.callAPI = EditorAPI;

// GPT converted code 

// const https = require('https');

// const gfgCompilerApiEndpoint = 'https://ide.geeksforgeeks.org/main.php';

// const languages = [ 'C', 'Cpp', 'Cpp14', 'Java', 'Python', 'Python3', 'Scala', 'Php', 'Perl', 'Csharp' ];

// async function gfgCompile(lang, code, input = null)
// {
//     const data = {
//         lang,
//         code,
//         input
//     };

//     const options = {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
//     };

//     const response = await https.request(gfgCompilerApiEndpoint, options, res =>
//     {
//         let data = '';
//         res.on('data', chunk =>
//         {
//             data += chunk;
//         });
//         res.on('end', () =>
//         {
//             return JSON.parse(data);
//         });
//     });

//     // response.write(data);
//     console.log(data.json)
//     response.end();
// }

// if (require.main === module)
// {
//     const lang = 'Python3';
//     const code = `
//     a = input()
//     print(a)
//     `;
//     const input = 'hello ji';
//     gfgCompile(lang, code, input).then(result =>
//     {
//         console.log(result);
//     });
// }    



const express = require('express');
const app = express();
const axios = require('axios');

axios.get('https://ide.geeksforgeeks.org/main.php')
    .then(response =>
    {
        console.log(response.data);
    })
    .catch(error =>
    {
        console.log(error);
    });

app.post("/editor", (req, res) =>
{
    res.send("hello coder");
    res.send(response.data);
})

app.listen(8000, () =>
{
    console.log("running express")
})
