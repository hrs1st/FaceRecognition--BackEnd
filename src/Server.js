const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const knex = require('knex');
const cors = require('cors');

const register = require('./operators/register');
const login = require('./operators/login');
const profile = require('./operators/profile');
const image = require('./operators/image');

const database = knex({
    client: 'pg',
    connection: {
        host : '127.0.0.1',
        user : 'postgres',
        password : '8001',
        database : 'facerecognition'
    }
});

const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.json('connected successfully');
});

app.post('/logIn', (req, res) => {
    login.loginHandler(req, res, bcrypt, database);
});

app.post('/register', (req, res) => {
    register.registerHandler(req, res, bcrypt, database);
});

app.get('/profile/:id', (req, res) => {
    profile.profileHandler(req, res, database);
});

app.put('/image', (req, res) => {
    image.imageHandler(req, res, database);
});

app.post('/imageUrl', (req, res) => {
    image.apiCallHandler(req, res);
});

app.listen(3001, () => {
    console.log('server is running on the local host');
});