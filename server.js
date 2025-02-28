const http = require("http");
const express = require("express");
const cors = require("cors");
const app = express();
const trsRouter = require("./routes/trs-enc");

// Middleware pour autoriser les requêtes CORS
const corsOptions = {
  origin: ["http://localhost:4200", "http://localhost:3002"],
  credentials: true,
};
app.use(cors(corsOptions));

app.use("/trs-enc", trsRouter);

// Ajouter une gestion spécifique pour les requêtes OPTIONS (preflight)
app.options("*", cors(corsOptions));

// Vos routes et autres configurations viennent ici

const server = http.createServer(app);

const Port = 3002;
server.listen(Port, () => {
  console.log(`Le serveur fonctionne sur le port ${Port}`);
});
