(function() {
    'use strict'

    let name = getQueryVariable('name') || 'Anonymous';
    let room = getQueryVariable('room') || 'Default';

    let socket = io();

    socket.on('connect', () => console.log('Connected to socket.io server!'));

    $('.room-title').text(room);

    socket.on('message', message => {
        console.log(message.text);

        let timestamp = moment.utc(message.timestamp).local().format('h:mm a');
        let $message = $('.messages');
        $message.append(`<p><strong>${message.name} ${timestamp}</strong></p>`);
        $message.append(`<p>${message.text}</p>`);
    });

    let $form = $('#message-form');
    $form.on('submit', event => {
        event.preventDefault();

        let $message = $form.find('input[name=message]');

        console.log(room);

        socket.emit('message', {
            name : name,
            text : $message.val()
        });

        $message.val('');
    });
}());