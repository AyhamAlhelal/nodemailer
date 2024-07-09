const express = require('express');
const appRoute = require('../../routes/route.js');
const serverless = require('serverless-http');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require( 'path' );

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json());

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

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})


module.exports.handler = serverless(app);