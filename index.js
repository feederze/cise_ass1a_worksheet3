// app.js
require("dotenv").config({ path: './config.env' });
const connectDB = require('./config/db');
const path = require("path");
const express = require('express');


const books = require('./routes/api/books');
const app = express();
app.use('/api/books', books);

connectDB();

var cors = require('cors');
app.use(cors({ origin: true, credentials: true }));
app.use(express.json({ extended: false }));


if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, '/frontend/build')));
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'frontend', 'build', 'index.html'));
    });
} else {
    app.get("/", (req, res) => {
        res.send("Api ruuuuuuuuuuning");
    });
}

const port = process.env.PORT || 8082;

app.listen(port, () => console.log(`Server running on port ${port}`));