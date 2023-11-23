const nodeStatic = require("node-static");
const http = require("http");
const https = require("https");
const fs = require("fs");

const options = {
  key: fs.readFileSync("./cert/private.pem"),
  cert: fs.readFileSync("./cert/public.pem"),
};

var fileServer = new nodeStatic.Server();
https
  .createServer(options, (req, res) => {
    fileServer.serve(req, res);
  })
  .listen(443)
  .on("listening", () => {
    console.log("Listening on port 443");
  });

http
  .createServer((req, res) => {
    res.writeHead(301, { Location: "https://" + req.headers["host"] + req.url });
    res.end();
  })
  .listen(80)
  .on("listening", () => {
    console.log("Listening on port 80");
  });
