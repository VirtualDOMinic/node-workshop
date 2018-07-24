const http = require("http");
const handler = require("./src/handler");
const server = http.createServer(handler);
const port = 1337;

server.listen(port, () => {
  console.log(`Server is live on port ${port}`);
});
