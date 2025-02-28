const mysql = require("mysql");

// Créer une nouvelle connexion à la base de données
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  port: 3306,
  password: "",
  database: "srh",
});

connection.connect(function (error) {
  if (error) {
    console.log("Error Connecting to DataBase");
  } else {
    console.log("successfully Connected to DataBase");
  }
});

// Exporter la connexion pour l'utiliser dans d'autres fichiers
module.exports = connection;
