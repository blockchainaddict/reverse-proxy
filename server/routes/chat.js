const express = require('express');
const axios = require('axios');

const router = express.Router(); // Create a new router

router.post('/chat', async (req, res) => {
    try {
        // Format the request body for Ollama's chat API
        const ollamaRequest = {
            model: req.body.model,
            messages: [
                {
                    role: "user",
                    content: req.body.prompt
                }
            ],
            stream: req.body.stream || false
        };

        // Send the user's message to the Ollama API using the chat endpoint
        const response = await axios.post('http://localhost:11434/api/chat', ollamaRequest, {
            headers: { 'Content-Type': 'application/json' }
        });
        res.json(response.data); // Send the response from Ollama back to the user
    } catch (error) {
        console.error('Error communicating with Ollama:', error);
        res.status(500).json({ error: 'Failed to get response from Ollama' });
    }
});

module.exports = router;