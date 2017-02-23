let app = require('./config/express');
let http = require('http').Server(app);
let io = require('socket.io')(http);

const PORT = process.env.PORT || 3000;

io.on('connection', socket => {
    console.log('User connected via socket.io');

    socket.on('message', message => {
        console.log(`Message received: ${message.text}`);
        io.emit('message', message);
    });

    io.emit('message', {
        text : 'Welcome to the chat application'
    });
});


http.listen(PORT, () => console.log(`Server running on port ${PORT}`))