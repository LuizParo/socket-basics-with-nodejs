(function() {
    'use strict'

    let socket = io();

    socket.on('connect', () => console.log('Connected to socket.io server!'));

    socket.on('message', message => console.log(message.text));

    socket.emit('message', {text : 'Hello world'});
}());