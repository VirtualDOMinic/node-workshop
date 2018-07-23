const http = require('http');
const server = http.createServer(handler);
const port = 1337;
const fs = require("fs");
const path = require("path"); // Dom and Martin decided this is better for getting file ext
const querystring = require("querystring");

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
    } else if(endpoint == "/node"){
        response.writeHead(200, {"Content-Type": "text/html"})
        response.write(`${message}... and on node!`)
        response.end();
    } else if (endpoint == "/girls"){
        response.writeHead(200, {"Content-Type": "text/html"})
        response.write("<h1>Wooo! Go NodeGirls!</h1>")
        response.end();
    } else if(endpoint == "/create-post"){
        console.log("create post");
        // 300 didn't work, 302 did!
        response.writeHead(302, {"Location": "/index.html"});
        let allTheData = "";

        request.on("data", chunkOfData => {
            allTheData += chunkOfData;
        });

        request.on("end", () => {
            const convertedData = querystring.parse(allTheData)
            console.log(convertedData);
            response.end();
        })

    } else {
        // the below would cause issues if we've got several periods in the name. Gonna use path.extname instead
        // const fileExt = file.split(".")[1]; 

        const contentType = {
            ".html": "text/html",
            ".jpg": "image/jpg",
            ".png": "image/png",
            ".js": "application/javascript",
            ".css": "text/css",
            ".txt": "text",
            ".ico": "image/x-icon",
        }

        console.log(path.extname(endpoint))
        console.log(contentType[path.extname(endpoint)]);
        response.writeHead(200, {"Content-Type": contentType[path.extname(endpoint)]});
        fs.readFile(__dirname + "/public" + endpoint, (error, file) => {
            if (error){
                // console.log("error!")
                // console.log(`${__dirname}public${endpoint}`);
                response.writeHead(500, {"Content-Type": "text/html"});
                response.write("Internal server error (500). Sorry!");
                response.end();
            } else {
                // console.log("no error!")
                // response.write(file);
                response.end(file);
            }
        });

        // response.end(endpoint);
    }



}