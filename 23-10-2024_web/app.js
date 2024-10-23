const express = require('express');
const app = express();
const port = 3000;

app.get('/users', (req, res)=> {
    res.json([
        {id: 1, name: 'john due'},
        {id: 2, name: 'tvhuan'}
    ]);
});

app.listen(port, () =>{
    console.log(`Server is running at http://localhost:${port}`);
});