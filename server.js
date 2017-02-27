'use strict'

let app = require('./config/express');
let http = require('http').Server(app);
let io = require('socket.io')(http);
let moment = require('moment');

let clientInfo = {};

io.on('connection', socket => {
    console.log('User connected via socket.io');

    socket.on('joinRoom', req => {
        clientInfo[socket.id] = req;

        socket.join(req.room);
        socket.broadcast.to(req.room).emit('message', {
            name : 'System',
            text : `${req.name} has joined!`,
            timestamp : moment().valueOf()
        });
    });

    socket.on('message', message => {
        console.log(`Message received: ${message.text}`);

        message.timestamp = moment().valueOf();
        io.to(clientInfo[socket.id].room).emit('message', message);
    });

    socket.emit('message', {
        name : 'System',
        text : 'Welcome to the chat application',
        timestamp : moment().valueOf()
    });
});

const PORT = process.env.PORT || 3000;

http.listen(PORT, () => console.log(`Server running on port ${PORT}`))