const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const middlewares = require("./middlewares");
const logs = require('./api/logs');
require('dotenv').config();

const app = express();

mongoose.connect(process.env.DATABASE_URL);

app.use(morgan("common"));
app.use(helmet());
app.use(cors({
    origin: process.env.CORS_ORIGIN
}));

app.use(express.json());

app.get('/', (req, res) => {
    res.json({
        message: 'Hello World!'
    });
});


app.use('/api/logs', logs);

app.use(middlewares.notFound);

app.use(middlewares.errorHandler);

const port = process.env.PORT || 1337;

app.listen(port, () => {
    console.log(`Listening at localhost:${port}`);
});