const http = require("node:http");
const { Client } = require("pg");

const port = Number(process.env.PORT || 3000);
const databaseConfig = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT ? Number(process.env.DB_PORT) : undefined,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
};

async function checkDatabase() {
  if (!databaseConfig.host) return false;
  const client = new Client(databaseConfig);
  try {
    await client.connect();
    await client.query("SELECT 1");
    return true;
  } finally {
    await client.end().catch(() => undefined);
  }
}

http
  .createServer(async (request, response) => {
    const database = await checkDatabase().catch(() => false);
    response.writeHead(200, { "content-type": "application/json; charset=utf-8" });
    response.end(JSON.stringify({ ok: true, database, path: request.url }));
  })
  .listen(port, "0.0.0.0");
