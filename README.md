# My Reverse Proxy Server

This project is a reverse proxy server implemented in Node.js. Below is an overview of the project structure and the purpose of each directory and file.

## Run

To install dependencies and start the server, run the following commands:

```sh
npm install
npm start
```

## Instructions

The server runs at `http://localhost:5001`. To interact with the server, you can use Postman to make a POST request to `http://localhost:5001/api/chat`.

### Headers

Set the following header:

```
Content-Type: application/json
```

### Body

Include the following JSON body in your request:

```json
{
   "model": "deepseek-r1:1.5b",
   "prompt": "prompt - your message",
   "stream": false
}

### Ollama

On terminal, run 
```sh
ollama serve
```

You need to have the model you're using installed previously.