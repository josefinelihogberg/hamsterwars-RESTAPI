import express from 'express';
import router from './src/router/router.js';
import cors from 'cors';

const addr = "127.0.0.1";
const port = 3030;

const app = express();

/* Server middlewares (app.use) */
app.use(cors()); // <-- alla ips är tillåtna att ansluta
app.use(express.json()); // <-- in-data går från json till javascript-objekt

//Actutor (En endpoint för att se om allt fungerar)
app.get("/health", (request, response) => {
  response.send({ state: "up", message: "Server is healthy" });
});

app.use("/api", router); // <-- alla url med api ...:3030/api/...

app.listen(port, addr, () => {
  console.log("Server listening on port: " + port);
});

