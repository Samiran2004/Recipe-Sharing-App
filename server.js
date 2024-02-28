const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

require('dotenv').config();

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

mongoose.connect(process.env.DATABASE_URI).then(console.log("Database connected")).catch((err) => console.log(`Database connection error ${err}`));

app.use('/api/user', require('./router/userRouter'));
app.use('/api/recipe',require('./router/recipeRouter'));

app.listen(process.env.PORT, (err) => {
    if (err) {
        console.log("Server connection error.");
    } else {
        console.log(`Server connected on port: ${process.env.PORT}`);
    }
});