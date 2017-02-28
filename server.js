'use strict'

let app = require('./config/express');
let http = require('http').Server(app);
let io = require('socket.io')(http);
let moment = require('moment');

let clientInfo = {};

io.on('connection', socket => {
    console.log('User connected via socket.io');

    socket.on('disconnect', () => {
        let userData = clientInfo[socket.id];

        if(typeof userData !== 'undefined') {
            socket.leave(userData.room);
            io.to(userData.room).emit('message', {
                name : 'System',
                text : `${userData.name} has left!`,
                timestamp : moment().valueOf()
            });

            delete clientInfo[socket.id];
        }
    });

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

        if(message.text === '@currentusers') {
            sendCurrentUsers(socket);
            return;
        }

        message.timestamp = moment().valueOf();
        io.to(clientInfo[socket.id].room).emit('message', message);
    });

    socket.emit('message', {
        name : 'System',
        text : 'Welcome to the chat application',
        timestamp : moment().valueOf()
    });
});

function sendCurrentUsers(socket) {
    let info = clientInfo[socket.id];
    let users = [];

    if(typeof info === 'undefines') {
        return;
    }

    Object.keys(clientInfo).forEach(socketId => {
        let userInfo = clientInfo[socketId];

        if(info.room === userInfo.room) {
            users.push(userInfo.name);
        }
    });

    socket.emit('message', {
        name : 'System',
        text : `Current users: ${users.join(', ')}`,
        timestamp : moment().valueOf()
    });
}

const PORT = process.env.PORT || 3000;

http.listen(PORT, () => console.log(`Server running on port ${PORT}`))