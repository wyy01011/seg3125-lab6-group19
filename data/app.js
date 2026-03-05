//Import Modules.
const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router(); //Router object to define the API routes.

const dataFile = path.join(__dirname, 'submissions.json'); //Path to the submissions json file.

if (!fs.existsSync(dataFile)) { //If there is no submission file, make an empty array instead.
    fs.writeFileSync(dataFile, JSON.stringify([]));
}

router.post('/submit', (req, res) => { //POST. Receive data from the survey and save it to the json file. Logs the request.
    console.log("POST /submit called with data:", req.body);

    const submission = req.body; //Get the survey data.
    const existing = JSON.parse(fs.readFileSync(dataFile, 'utf8')); //Get the submissions already there.
    existing.push(submission); //Add the submission to the array.

    fs.writeFileSync(dataFile, JSON.stringify(existing, null, 2)); //Save the array to the json file.

    res.json({ message: "Survey submitted successfully!" });
});

router.get('/api/submissions', (req, res) => { //GET. Return all the stored submissions to the analyst view.
    console.log("GET /api/submissions called");

    try {
        const data = JSON.parse(fs.readFileSync(dataFile, 'utf8')); //Try to read all the submissions from the json file.
        res.json(data); //Send the data to the frontend.
    } catch (err) {
        console.error("Error reading submissions:", err);
        res.status(500).json({ error: "Failed to read submissions." });
    }
});

router.get('/', (req, res) => { //GET. Called when the user visits the root URL. 
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

module.exports = router; //Export the router so it can be used by server.js.