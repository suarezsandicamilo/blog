//

const http = require('http');

const app = require('./app.js');

//

const port = 3000;

app.set('port', port);

const server = http.createServer(app);

server.listen(port, () => {
    console.log(`Server running at http://127.0.0.1:${port}`);
});
