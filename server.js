let app = require('./config/express');
let http = require('http').Server(app);
let io = require('socket.io')(http);

const PORT = process.env.PORT || 3000;

io.on('connection', () => console.log('User connected via socket.io'));

http.listen(PORT, () => console.log(`Server running on port ${PORT}`))