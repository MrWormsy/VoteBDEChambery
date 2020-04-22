const express = require('express');
const app = express();
const Routes = require('./routes');

// Parser
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());
app.use(Routes);

// Listen
app.listen(7374);
console.log("waiting on localhost:7374");

// MongoDB
const mongoose = require('mongoose');
database = 'mongodb://localhost:27017/VoteChambery';
mongoose.connect(database, (err) => {
    if (err)
        throw err;
    console.log('Connect to the database');
});

// Path and Views
const path = require('path');
let dirViews = [path.join(__dirname, './views')];
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', dirViews);
app.set('view engine', 'ejs');