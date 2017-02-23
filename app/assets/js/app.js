(function() {
    'use strict'

    let socket = io();

    socket.on('connect', () => console.log('Connected to socket.io server!'));

    socket.on('message', message => console.log(message.text));

    let $form = jQuery('#message-form');
    $form.on('submit', event => {
        event.preventDefault();

        let $message = $form.find('input[name=message]');

        socket.emit('message', {
            text : $message.val()
        });

        $message.val('');
    });
}());