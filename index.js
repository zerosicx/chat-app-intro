const express = require('express');     // requires the express module to run
const app = express(); // Instantiate an instance of express
const http = require('http'); // requires http protocol
const server = http.createServer(app); // initialises app to be a function handler that we can supply to an http server

// Instantiate the socket and server
const { Server } = require('socket.io'); // stating we require the SocketIO module
const io = new Server(server); // Instantiating a new server

/**
 * http.createServer creates our computer into an HttpServer
 * It creates an HTTP server object based on the input which is
 * the first thing a client sees when making a get request connection.
 * `app` is essentially the request listener.
 */

// Creating the requestListener
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html'); // Modified so it shows a webpage we designated
});
// When a get request is received for the index page, show a page that says "Hello World"

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

// The server now begins listening for requests if we execute this script
server.listen(3000, () => {
    console.log('listening on port *:3000');
})

// So far, Socket.io has not been used yet. Only express has been used.

// Initialise socket io and get the chat message value
io.on('connection', (socket) => {
    socket.on('chat message', (msg) => {
        console.log('message: ' + msg);
    });
});

// TODO: answer why do I need more than one io.on connection?