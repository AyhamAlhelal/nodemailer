const express = require('express');
const appRoute = require('../../routes/route.js');
const serverless = require('serverless-http');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require( 'path' );
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

const EMAIL_GROUP_1= process.env.EMAIL_GROUP_1;
const NAME_GROUP_1= process.env.NAME_GROUP_1;

const EMAIL_GROUP_2= process.env.EMAIL_GROUP_2;
const NAME_GROUP_2= process.env.NAME_GROUP_2;

const EMAIL_GROUP_3= process.env.EMAIL_GROUP_3;
const NAME_GROUP_3= process.env.NAME_GROUP_3;

const APPROVAL_EMAIL= process.env.APPROVAL_EMAIL;
const APPROVAL_NAME= process.env.APPROVAL_NAME;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json());

// Endpoint to serve configuration data
app.get('/config', (req, res) => {
    res.json({
        EMAIL_GROUP_1: EMAIL_GROUP_1,
        EMAIL_GROUP_2: EMAIL_GROUP_2,
        EMAIL_GROUP_3: EMAIL_GROUP_3,
        NAME_GROUP_1: NAME_GROUP_1,
        NAME_GROUP_2: NAME_GROUP_2,
        NAME_GROUP_3: NAME_GROUP_3,
        APPROVAL_EMAIL: APPROVAL_EMAIL, 
        APPROVAL_NAME: APPROVAL_NAME
    });
});

// Use the router for the root path
app.use('/', appRoute);

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, '../../public')));

/** routes */
app.use('/api', appRoute);

// Handle 404 errors by redirecting to the root path
app.use((req, res, next) => {
    res.redirect('/');
});

// app.listen(PORT, () => {
//     console.log(`Server is running on http://localhost:${PORT}`)
// })


module.exports.handler = serverless(app);