const http = require('http');

const server = http.createServer(handler);

const port = 1337;

server.listen(port, () => {
    console.log(`Server is live on port ${port}`)
})

const message = "Hey! We are live"

function handler(request, response){
    response.writeHead(200, {"Content-Type": "text/html"});
    response.write(message);
    response.end()

}