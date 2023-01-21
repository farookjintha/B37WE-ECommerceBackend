require('dotenv').config();

const express = require('express');
const cor = require('cors');


const db = require('./db/connect');

const categoryRoutes = require('./routes/categories.routes');
const productRoutes = require('./routes/products.routes');
const cartRoutes = require('./routes/cart.routes');

const app = express();

//Connecting DB;
db();

app.use(express.json());
app.use(cor());


app.get('/', (req, res) => {
    res.send('Welcome to our Ecommerce App!')
})

app.use('/api', categoryRoutes);
app.use('/api', productRoutes);
app.use('/api', cartRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`App is running on PORT ${PORT}`)
});