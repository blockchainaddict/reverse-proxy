import React, { useState } from 'react';
import './App.css';

function App() {
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setResponse('');

    try {
      // The request body format should match what Ollama expects
      const requestBody = {
        model: "deepseek-r1:1.5b",  // You can change this to any model you have in Ollama
        prompt: message,
        stream: false
      };

      const response = await fetch('http://localhost:5001/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      // Handle the new response format from Ollama's chat API
      if (data.message && data.message.content) {
        setResponse(data.message.content);
      } else {
        setResponse(JSON.stringify(data, null, 2));
      }
    } catch (err) {
      setError(`Error: ${err.message}`);
      console.error('Error sending message:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Simple Chat with Ollama</h1>
        <div className="chat-container">
          <form onSubmit={handleSubmit}>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message here..."
              rows={4}
              className="message-input"
            />
            <button type="submit" disabled={loading || !message.trim()}>
              {loading ? 'Sending...' : 'Send'}
            </button>
          </form>

          {error && <div className="error">{error}</div>}
          
          {response && (
            <div className="response">
              <h3>Response:</h3>
              <pre>{response}</pre>
            </div>
          )}
        </div>
      </header>
    </div>
  );
}

export default App;
