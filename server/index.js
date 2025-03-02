const express = require('express');
const bodyParser = require('body-parser');
const chat = require('./routes/chat');

// Create a new Express application
const app = express();
const PORT = process.env.PORT || 5001;

app.use(bodyParser.json()); // Parse JSON bodies

app.use('/api', chat); // Use the chat router for all routes starting with /api

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});