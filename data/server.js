// server.js
const express = require('express');
const appRoutes = require('./app');

const server = express();

// Middleware to read JSON
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

// Serve frontend files
server.use(express.static('public'));

// Use routes from app.js
server.use('/', appRoutes);

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});