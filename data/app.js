// app.js
const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();
const dataFile = path.join(__dirname, 'data', 'submissions.json');

// Ensure file exists
if (!fs.existsSync(dataFile)) {
    fs.writeFileSync(dataFile, JSON.stringify([]));
}

router.post('/submit', (req, res) => {
    const submission = req.body;

    // Load existing submissions
    const existing = JSON.parse(fs.readFileSync(dataFile));

    // Add new one
    existing.push(submission);

    // Save back to file
    fs.writeFileSync(dataFile, JSON.stringify(existing, null, 2));

    res.json({ message: "Survey submitted successfully!" });
});

module.exports = router;