const http = require('http');

const server = http.createServer();

const port = 1337;

server.listen(port, () => {
    console.log(`Server is live on port ${port}`)
})

