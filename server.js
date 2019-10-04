const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const api = require('./server/router/api');


const app = express();

const port = 3000;

app.use(express.static(path.join(__dirname, 'dist')));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
  });

app.use('/api', api);
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/MEANStackTesting/index.html'));
});

app.listen(port, function(){
    console.log('Server running on localhost with port '+port);
});