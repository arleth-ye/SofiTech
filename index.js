const express = require('express'); 
const bodyParser = require('body-parser');
const TrsRoute = require('./routes/trs-enc'); 

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use('/trs-enc',TrsRoute); 


const connection = require('./connect');




module.exports =app;
