require('dotenv').config();
const express = require('express');
const path = require('path');
const axios = require('axios');
const mongoose = require('mongoose');
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/googlebooks';

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

const Book = mongoose.model('Article', new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    authors: {
        type: [String],
        required: true
    },
    description: {
        type: String,
    },
    image: {
        type: String,
    },
    link: {
        type: String
    }
}));

mongoose.connect(MONGODB_URI, (err) => {
    if (err) throw err;
});

const PORT = process.env.PORT || 3001;
const app = express();

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
}

// Define API routes here
app.get('/api/search/:terms', (req, res) => {
    const url = `https://www.googleapis.com/books/v1/volumes?q=\
${req.params.terms}&key=${process.env.GOOGLE_API_KEY}`;
    axios.get(url)
        .then(results => {
            res.send(results.data);
        }).catch(err => res.send(err));
});

app.get('/api/books', (req, res) => {
    Book.find((err, books) => res.send(books));
});

app.post('/api/books', (req, res) => {
    Book.create(req.body, (err) => err ? res.sendStatus(200) : res.send(err));
});

// Send every other request to the React app
// Define any API routes before this runs
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './client/build/index.html'));
});

app.listen(PORT, () => {
    console.log(`🌎 ==> API server now on port ${PORT}!!!`);
});
