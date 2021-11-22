const express = require('express');
const path = require('path')

const app = express();
const PORT = process.env.PORT || 5000;


app.use(express.static(__dirname +'/public'))

app.get('/', (req, res) => {
    res.send(`
        Welcome on Server, port ${PORT}
        <h1> Welcome</h1>
    `);
});

app.get('/page', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'))
});

app.get('/html', (req, res) => {
    res.sendFile(__dirname+'/public/index.html')
});

app.get('/index', (req, res) => {
    res
})


app.listen(PORT,() => {
   console.log(`Server listening on port ${PORT}`);
})