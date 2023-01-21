require('dotenv').config();

const express = require('express');
const cor = require('cors');


const db = require('./db/connect');

const app = express();

//Connecting DB;
db();

app.use(express.json());
app.use(cor());


app.get('/', (req, res) => {
    res.send('Welcome to our Ecommerce App!')
})


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`App is running on PORT ${PORT}`)
});