let app = require('./config/express');
let http = require('http').Server(app);

const PORT = process.env.PORT || 3000;

http.listen(PORT, () => console.log(`Server running on port ${PORT}`))