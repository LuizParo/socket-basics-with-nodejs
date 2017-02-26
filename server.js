'use strict'

let app = require('./config/express');
let http = require('http').Server(app);
let io = require('socket.io')(http);
let moment = require('moment');

const PORT = process.env.PORT || 3000;

io.on('connection', socket => {
    console.log('User connected via socket.io');

    socket.on('message', message => {
        console.log(`Message received: ${message.text}`);

        message.timestamp = moment().valueOf();
        io.emit('message', message);
    });

    io.emit('message', {
        name : 'System',
        text : 'Welcome to the chat application',
        timestamp : moment().valueOf()
    });
});


http.listen(PORT, () => console.log(`Server running on port ${PORT}`))