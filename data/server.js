//Import Modules.
const express = require('express');
const path = require('path');
const appRoutes = require('./app');

const server = express(); //Create the Express server instance.

server.use((req, res, next) => { //Runs whenever a request comes in. Proves APIs are being called.
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});

server.use(express.json()); //Enable JSON body parsing.
server.use(express.urlencoded({ extended: true })); //Enable URL-encoded form parsing.

server.use(express.static(path.join(__dirname, '..', 'public'))); //Serve the frontend files for HTML and CSS.

server.use('/', appRoutes); //Register all API routes from app.js.

const PORT = 3000;
server.listen(PORT, () => { //Start the server on port 3000.
    console.log(`Server running at http://localhost:${PORT}`);
});