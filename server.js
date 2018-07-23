const http = require('http');

const server = http.createServer(handler);

const port = 1337;

const fs = require("fs");

server.listen(port, () => {
    console.log(`Server is live on port ${port}`)
})

const message = "Hey! We are live"

function handler(request, response){
    const endpoint = request.url;
    // console.log(`endpoint: ${endpoint}`);

    const method = request.method;
    // console.log(`request method: ${method}`)

    if(endpoint == "/"){
        response.writeHead(200, {"Content-Type": "text/html"});
        fs.readFile(__dirname + "/public/index.html", (error, file) => {
            if (error){
                // console.log("error!")
                response.writeHead(500, {"Content-Type": "text/html"});
                response.write("Internal server error (500). Sorry!");
                response.end();
            } else {
                // console.log("no error!")
                // response.write(file);
                response.end(file);
            }
        });
        // response.end();
    }
    else if(endpoint == "/node"){
        response.writeHead(200, {"Content-Type": "text/html"})
        response.write(`${message}... and on node!`)
        response.end();
    } else if (endpoint == "/girls"){
        response.writeHead(200, {"Content-Type": "text/html"})
        response.write("<h1>Wooo! Go NodeGirls!</h1>")
        response.end();
    } else {
        response.writeHead(200, {"Content-Type": "text/html"});
        response.write(message);
        response.end()
    }

}