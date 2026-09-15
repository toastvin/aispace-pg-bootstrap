const http = require("node:http");

const port = Number(process.env.PORT || 3000);

http
  .createServer((request, response) => {
    response.writeHead(200, { "content-type": "application/json; charset=utf-8" });
    response.end(JSON.stringify({ ok: true, path: request.url }));
  })
  .listen(port, "0.0.0.0");
