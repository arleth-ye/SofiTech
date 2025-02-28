/* this file is for backend purposes , thats what she said  */
const express = require("express");
const router = express.Router();
const connection = require("../connect");
const { query } = require("../connect");
const mysql = require("mysql");
const xlsx = require("xlsx");
const multer = require("multer");
const path = require("path");
const readXlsxFile = require("read-excel-file/node");
const { exec } = require("child_process");
const fs = require("fs");
const moment = require("moment");
const { execFile } = require("child_process");

const cors = require("cors");

router.use(cors());

router.use(express.json());

module.exports = router;

// Spécifiez le chemin complet vers mysqldump
const mysqldumpPath = "C:\\xampp\\mysql\\bin\\mysqldump";
// Route pour la sauvegarde de la base de données
router.get("/backup", (req, res) => {
  // Obtenir la date et l'heure actuelles au format souhaité
  const currentDateTime = moment().format("YYYYMMDD_HHmmss");

  // Nom du fichier de sauvegarde avec la date et l'heure actuelles et l'extension .sql
  const backupFileName = `backup_${currentDateTime}.sql`;

  // Commande pour exporter la base de données (utilisation de mysqldump)
  const command = `${mysqldumpPath} -u root srh > ${backupFileName}`;

  // Exécuter la commande pour exporter la base de données
  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(
        `Erreur lors de l'exportation de la base de données: ${error.message}`
      );
      return res
        .status(500)
        .json({ error: "Erreur lors de l'exportation de la base de données" });
    }
    if (stderr) {
      console.error(
        `Erreur lors de l'exportation de la base de données: ${stderr}`
      );
      return res
        .status(500)
        .json({ error: "Erreur lors de l'exportation de la base de données" });
    }

    // Lire le fichier de sauvegarde
    fs.readFile(backupFileName, "utf8", (err, data) => {
      if (err) {
        console.error(
          `Erreur lors de la lecture du fichier de sauvegarde: ${err}`
        );
        return res.status(500).json({
          error: "Erreur lors de la lecture du fichier de sauvegarde",
        });
      }

      // Envoyer le fichier de sauvegarde en tant que réponse
      res.setHeader("Content-Type", "text/plain");
      res.setHeader(
        "Content-Disposition",
        `attachment; filename="${backupFileName}"`
      );
      res.send(data);
    });
  });
});

//import photo user

// Définir le stockage Multer
const storage_image = multer.diskStorage({
  destination: "src/assets", // Définir votre dossier de destination
  filename: function (req, file, cb) {
    const timestamp = Date.now(); // Obtenir le timestamp actuel
    const extension = file.originalname.split(".").pop(); // Obtenir l'extension du fichier d'origine
    const filename = `photo_${timestamp}.${extension}`; // Construire le nom de fichier avec le timestamp
    cb(null, filename);
  },
});

// Set up multer upload
const upload_image = multer({
  storage: storage_image,
  limits: { fileSize: 1024 * 1024 * 5 },
});

// Define route for user creation
router.post("/createUser", upload_image.single("file"), (req, res, next) => {
  let usr = req.body;
  let image = req.file.filename; // Get the filename from uploaded file

  // SQL query to insert user data into database, including the image path
  const query =
    "INSERT INTO `users` (`nom`, `prenom`, `photo`, `username`, `password`, `direction`, `poste`, `CRUD`, `import`, `export`, `admin`, `Add_project`) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)";

  // Execute the query
  connection.query(
    query,
    [
      usr.nom,
      usr.prenom,
      image,
      usr.username,
      usr.password,
      usr.direction,
      usr.poste,
      usr.CRUD,
      usr.import,
      usr.export,
      usr.admin,
      usr.Add_project,
    ],
    (err) => {
      if (!err) {
        return res.status(200).json({ message: "user added successfully" });
      } else {
        return res.status(500).json(err);
      }
    }
  );
});

/*create image*/

router.post(
  "/createUserImage",
  upload_image.single("file"),
  (req, res, next) => {
    image = req.file.filename;
    var query = "insert into image (img) values(?)";
    connection.query(query, [image], (err, results, fields) => {
      if (!err) {
        return res.status(200).json({ message: "image added succuffuly" });
      } else {
        return res.status(500).json(err);
      }
    });
  }
);

router.put("/users/:userId/:compte", (req, res) => {
  const userId = req.params.userId;
  const compte = req.params.compte; // Utilisation de req.params pour récupérer la valeur de compte

  const sql = "UPDATE `users` SET `compte` = ? WHERE `id` = ?";

  connection.query(sql, [compte, userId], (error, results) => {
    if (error) {
      console.error("Error updating user compte: ", error);
      res
        .status(500)
        .json({ error: "An error occurred while updating user compte." });
    } else {
      res.status(200).json({ message: "User compte updated successfully." });
    }
  });
});

//validation trs

router.put("/validationtrs/:Idvalidation/:validation", (req, res) => {
  const Idvalidation = req.params.Idvalidation;
  const validation = req.params.validation; // Utilisation de req.params pour récupérer la valeur de compte

  const sql = "UPDATE `sit-trs` SET `validation` = ? WHERE `id` = ?";

  connection.query(sql, [validation, Idvalidation], (error, results) => {
    if (error) {
      console.error("Error updating trs validation: ", error);
      res
        .status(500)
        .json({ error: "An error occurred while updating trs validation." });
    } else {
      res
        .status(200)
        .json({ message: "situation de la trs updated successfully." });
    }
  });
});

/* login */

router.get("/login/:username/:password", (req, res, next) => {
  const username = req.params.username;
  const password = req.params.password;
  var query = "SELECT * FROM `users` WHERE `username` = ? and `password`= ?";
  connection.query(query, [username, password], (err, results) => {
    if (!err || results.length != 0) {
      res.status(200).json(results);
    } else {
      return res.status(500).json(err);
    }
  });
});

/* login */

router.get("/login/:id", (req, res, next) => {
  const userId = req.params.id;
  var query = "SELECT * FROM `users` WHERE `id`= ? ";
  connection.query(query, [userId], (err, results) => {
    if (!err || results.length != 0) {
      res.status(200).json(results);
    } else {
      return res.status(500).json(err);
    }
  });
});

/* login */

router.get("/login", (req, res, next) => {
  var query = "SELECT * FROM `users` ORDER BY `id` ";
  connection.query(query, (err, results) => {
    if (!err || results.length != 0) {
      res.status(200).json(results);
    } else {
      return res.status(500).json(err);
    }
  });
});

/*read tresorerie avec date*/

router.get("/Trsdate/:date", (req, res, next) => {
  const date = req.params.date;
  var query = " SELECT * FROM `trs-enc` WHERE `Date_chq`=?";
  connection.query(query, [date], (err, results) => {
    if (!err) {
      return res.status(200).json(results);
    } else {
      return res.status(500).json(err);
    }
  });
});

/*read mantant de cheque en instance d'encaissement avec date*/

router.get("/getMntChqTrsDate/:date", (req, res, next) => {
  const date = req.params.date;
  var query = " SELECT * FROM `trs-enc` WHERE `Date_chq`=? && `chq_inst`= 1";
  connection.query(query, [date], (err, results) => {
    if (!err) {
      return res.status(200).json(results);
    } else {
      return res.status(500).json(err);
    }
  });
});

/*read tresorerie avec mois*/

router.get("/TrsMonth/:mois/:an", (req, res, next) => {
  const mois = req.params.mois;
  const an = req.params.an;
  var query =
    " SELECT * FROM `trs-enc` WHERE month(`Date_chq`)=? && year(`Date_chq`)=?";
  connection.query(query, [mois, an], (err, results) => {
    if (!err) {
      return res.status(200).json(results);
    } else {
      return res.status(500).json(err);
    }
  });
});

/*read mantant de cheque en instance d'encaissement avec mois*/

router.get("/getMntChqTrsMonth/:mois/:an", (req, res, next) => {
  const mois = req.params.mois;
  const an = req.params.an;
  var query =
    " SELECT * FROM `trs-enc` WHERE month(`Date_chq`)=? && year(`Date_chq`)=? && `chq_inst`= 1";
  connection.query(query, [mois, an], (err, results) => {
    if (!err) {
      return res.status(200).json(results);
    } else {
      return res.status(500).json(err);
    }
  });
});

/*read tresorerie avec année*/

router.get("/TrsYear/:an", (req, res, next) => {
  const an = req.params.an;

  var query = " SELECT * FROM `trs-enc` WHERE year(`Date_chq`)=? ;";
  connection.query(query, [an], (err, results) => {
    if (!err) {
      return res.status(200).json(results);
    } else {
      return res.status(500).json(err);
    }
  });
});

/*read  mantant de cheque en instance d'encaissement avec année*/

router.get("/getMntChqTrsYear/:an", (req, res, next) => {
  const an = req.params.an;

  var query =
    " SELECT * FROM `trs-enc` WHERE year(`Date_chq`)=? && `chq_inst`= 1;";
  connection.query(query, [an], (err, results) => {
    if (!err) {
      return res.status(200).json(results);
    } else {
      return res.status(500).json(err);
    }
  });
});

/*read tresorerie*/

router.get("/read", (req, res, next) => {
  var query = "SELECT * FROM `trs-enc` ORDER BY `N_PCS` ASC;";

  connection.query(query, (err, results) => {
    if (!err) {
      return res.status(200).json(results);
    } else {
      return res.status(500).json(err);
    }
  });
});

/*read les placements en cours*/

router.get("/readPlcTrs", (req, res, next) => {
  var query = "SELECT * FROM `plc_trs`";

  connection.query(query, (err, results) => {
    if (!err) {
      return res.status(200).json(results);
    } else {
      return res.status(500).json(err);
    }
  });
});

/*read les banques*/

router.get("/readBnq", (req, res, next) => {
  var query = "SELECT `name` FROM `cmt_bnq`;";

  connection.query(query, (err, results) => {
    if (!err) {
      return res.status(200).json(results);
    } else {
      return res.status(500).json(err);
    }
  });
});
/*read les banques*/

router.get("/readDir", (req, res, next) => {
  var query = "SELECT `nom_direction` FROM `direction`;";

  connection.query(query, (err, results) => {
    if (!err) {
      return res.status(200).json(results);
    } else {
      return res.status(500).json(err);
    }
  });
});

router.get("/readTRS", (req, res, next) => {
  var query = "SELECT * FROM `sit-trs`;";

  connection.query(query, (err, results) => {
    if (!err) {
      return res.status(200).json(results);
    } else {
      return res.status(500).json(err);
    }
  });
});

/*read cheque en instance d'encaissement*/

router.get("/read_chq_inst", (req, res, next) => {
  var query =
    "SELECT * FROM `trs-enc` WHERE `chq_inst`= 1 ORDER BY `N_PCS` ASC";

  connection.query(query, (err, results) => {
    if (!err) {
      return res.status(200).json(results);
    } else {
      return res.status(500).json(err);
    }
  });
});

/*Valider cheque encaissement*/

router.patch("/validate/:id", (req, res, next) => {
  const id = req.params.id;
  var query = "UPDATE `trs-enc` SET `chq_inst`='0' WHERE `ID_TRS_F_S`=?";
  connection.query(query, [id], (err, results) => {
    if (!err) {
      return res.status(200).json({ message: "cheque valider succuffuly" });
    } else {
      return res.status(500).json(err);
    }
  });
});

/*read situation tresorerie

router.get('/read_sit_trs',(req,res,next)=>{
    var query = "SELECT `nom_cmpt`, SUM(`ENC`)-SUM(`DEC`) as solde, `Date_chq` FROM `trs-enc` WHERE `chq_inst`=0 GROUP BY `nom_cmpt`, month(`Date_chq`) ORDER by month(`Date_chq`) DESC;";
   
    connection.query(query,(err,results)=>{
        if(!err){
            return res.status(200).json(results);
        }
        else{
            return res.status(500).json(err);
        }
    })
});
*/
router.get("/read_sit_trs", (req, res, next) => {
  var query =
    "SELECT `nom_cmpt`, SUM(`ENC`)-SUM(`DEC`) as solde, Date_chq FROM `trs-enc` WHERE `chq_inst`=0 GROUP BY `nom_cmpt`, month(`Date_chq`) ORDER by month(`Date_chq`) DESC;";

  connection.query(query, (err, results) => {
    if (!err) {
      // Récupération des données
      const sitData = results.map((result) => [
        result.solde,
        result.nom_cmpt,
        result.Date_chq,
      ]);

      // Boucle à travers les données pour insérer ou mettre à jour
      sitData.forEach((data) => {
        const [montant, banque, date] = data;
        const checkQuery =
          "SELECT * FROM `sit-trs` WHERE `banque` = ? AND MONTH(`date`) = MONTH(?)";
        connection.query(
          checkQuery,
          [banque, date],
          (checkErr, checkResults) => {
            if (!checkErr) {
              if (checkResults.length > 0) {
                // Mise à jour du montant en écrasant la valeur existante
                const updateQuery =
                  "UPDATE `sit-trs` SET `montant` = ? WHERE `banque` = ? AND MONTH(`date`) = MONTH(?)";
                connection.query(
                  updateQuery,
                  [montant, banque, date],
                  (updateErr, updateResults) => {
                    if (updateErr) {
                      console.error(
                        "Erreur lors de la mise à jour du montant dans la table 'sit-trs':",
                        updateErr
                      );
                    }
                  }
                );
              } else {
                // Insertion si la ligne n'existe pas
                const insertQuery =
                  "INSERT INTO `sit-trs`(`montant`, `banque`, `date`) VALUES (?, ?, ?)";
                connection.query(
                  insertQuery,
                  [montant, banque, date],
                  (insertErr, insertResults) => {
                    if (insertErr) {
                      console.error(
                        "Erreur lors de l'insertion des données dans la table 'sit-trs':",
                        insertErr
                      );
                    }
                  }
                );
              }
            } else {
              console.error(
                "Erreur lors de la vérification de la redondance dans la table 'sit-trs':",
                checkErr
              );
            }
          }
        );
      });

      // Sélection des données de la table sit-trs
      const sitTrsQuery = "SELECT * FROM `sit-trs`";
      connection.query(sitTrsQuery, (sitTrsErr, sitTrsResults) => {
        if (!sitTrsErr) {
          // Envoi des données de la table sit-trs en réponse
          return res
            .status(200)
            .json({ trsEncData: results, sitTrsData: sitTrsResults });
        } else {
          console.error(
            "Erreur lors de la récupération des données de la table 'sit-trs':",
            sitTrsErr
          );
          return res.status(500).json({
            error:
              "Erreur lors de la récupération des données de la table 'sit-trs'",
          });
        }
      });
    } else {
      console.error(
        "Erreur lors de la récupération des données de la table 'trs-enc':",
        err
      );
      return res.status(500).json({
        error:
          "Erreur lors de la récupération des données de la table 'trs-enc'",
      });
    }
  });
});

/*read situation tresorerie avec date*/

router.get("/SitDate/:date", (req, res, next) => {
  const date = req.params.date;
  var query =
    "SELECT `nom_cmpt`, SUM(`ENC`)-SUM(`DEC`) as solde, `Date_chq` FROM `trs-enc` WHERE `Date_chq`=? and `chq_inst`=0 GROUP BY `nom_cmpt` ORDER by `Date_chq` DESC";
  connection.query(query, [date], (err, results) => {
    if (!err) {
      return res.status(200).json(results);
    } else {
      return res.status(500).json(err);
    }
  });
});

/*read situation tresorerie avec mois*/

router.get("/SitMonth/:mois/:an", (req, res, next) => {
  const mois = req.params.mois;
  const an = req.params.an;

  var query =
    "SELECT `nom_cmpt`, SUM(`ENC`)-SUM(`DEC`) as solde, `Date_chq` FROM `trs-enc` WHERE month(`Date_chq`)=? and year(`Date_chq`)=? and `chq_inst`=0 GROUP BY `nom_cmpt` ORDER by `Date_chq` DESC ;";
  connection.query(query, [mois, an], (err, results) => {
    if (!err) {
      return res.status(200).json(results);
    } else {
      return res.status(500).json(err);
    }
  });
});

/*read situation tresorerie avec year*/

router.get("/SitYear/:an", (req, res, next) => {
  const an = req.params.an;

  var query =
    "SELECT `nom_cmpt`, SUM(`ENC`)-SUM(`DEC`) as solde, `Date_chq` FROM `trs-enc` WHERE year(`Date_chq`)=? and `chq_inst`=0 GROUP BY `nom_cmpt` ORDER by `Date_chq` DESC ;";
  connection.query(query, [an], (err, results) => {
    if (!err) {
      return res.status(200).json(results);
    } else {
      return res.status(500).json(err);
    }
  });
});

/*read situation tresorerie avec banque*/

router.get("/SitBnq/:banque", (req, res, next) => {
  const banque = req.params.banque;
  var query =
    "SELECT `nom_cmpt`, SUM(`ENC`)-SUM(`DEC`) as solde, `Date_chq` FROM `trs-enc` WHERE `nom_cmpt`=? and `chq_inst`=0 GROUP BY `nom_cmpt` ORDER by `Date_chq` DESC";
  connection.query(query, [banque], (err, results) => {
    if (!err) {
      return res.status(200).json(results);
    } else {
      return res.status(500).json(err);
    }
  });
});

/*calcul solde par jour with date */

router.get("/read_solde_sit_trs/:date", (req, res, next) => {
  const date = req.params.date;
  var query =
    "SELECT SUM(`ENC`)-SUM(`DEC`) as solde FROM `trs-enc` WHERE `Date_chq`=?";

  connection.query(query, [date], (err, results) => {
    if (!err) {
      return res.status(200).json(results);
    } else {
      return res.status(500).json(err);
    }
  });
});

//create fiche suiveuse//create fiche suiveuse

router.post("/create", (req, res, next) => {
  let trs = req.body;

  // Conversion de la date du formulaire en objet Date
  trs.Date_chq = new Date(trs.Date_chq);

  // Extraction de l'année de la date de l'opération
  const year = trs.Date_chq.getFullYear();

  // Vérification si l'année n'existe pas dans la base de données
  connection.query(
    "SELECT DISTINCT YEAR(Date_chq) AS Year FROM `trs-enc`",
    (yearError, yearResults) => {
      if (yearError) {
        console.error(yearError);
        return res
          .status(500)
          .json({ error: "Erreur lors de la récupération des années" });
      }

      const existingYears = yearResults.map((result) => result.Year);

      if (!existingYears.includes(year)) {
        // Si l'année n'existe pas, assigner le numéro de PCS à 1
        trs.N_PCS = 1;
      }

      // Vérification si une opération avec la même date existe déjà
      connection.query(
        "SELECT N_PCS FROM `trs-enc` WHERE Date_chq = ? AND N_PCS IS NOT NULL",
        [trs.Date_chq],
        (error, existingResults) => {
          if (error) {
            console.error(error);
            return res.status(500).json({
              error: "Erreur lors de la vérification de l'existence de la date",
            });
          }

          let N_PCS;
          if (existingResults.length === 0) {
            // Aucune opération avec la même date
            // Recherche du maximum des N_PCS pour les opérations ayant une date antérieure
            connection.query(
              "SELECT MAX(N_PCS) AS MaxPCS FROM `trs-enc` WHERE Date_chq < ?",
              [trs.Date_chq],
              (dateError, dateResults) => {
                if (dateError) {
                  console.error(dateError);
                  return res.status(500).json({
                    error: "Erreur lors de la recherche de la date inférieure",
                  });
                }

                const maxPCS = dateResults[0].MaxPCS;

                if (maxPCS !== null) {
                  // Il existe une date inférieure, obtenir le N_PCS correspondant
                  N_PCS = maxPCS + 1;
                } else {
                  // Aucune date inférieure trouvée, insérer avec N_PCS à 1
                  N_PCS = 1;
                }

                // Insérer la nouvelle opération avec le N_PCS déterminé
                insertOperation(N_PCS, trs, res);
              }
            );
          } else {
            // Opération avec la même date existante, obtenir le dernier N_PCS
            N_PCS =
              Math.max(...existingResults.map((result) => result.N_PCS)) + 1;

            // Insertion du nouveau TRS avec le numéro de PCS déterminé
            insertOperation(N_PCS, trs, res);
          }
        }
      );
    }
  );
});
function insertOperation(N_PCS, trs, res) {
  connection.query(
    "INSERT INTO `trs-enc` (`N_PCS`, `Date_chq`, `Date_depot`, `Date_reg`, `N_CHQ`, `OP`, `BNF`, `ENC`, `DEC`, `nom_cmpt`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
    [
      N_PCS,
      trs.Date_chq,
      trs.Date_depot,
      trs.Date_reg,
      trs.N_CHQ,
      trs.OP,
      trs.BNF,
      trs.ENC,
      trs.DEC,
      trs.nom_cmpt,
    ],
    (insertError, insertResults) => {
      if (insertError) {
        console.error(insertError);
        return res
          .status(500)
          .json({ error: "Erreur lors de l'insertion du TRS" });
      }

      // Mise à jour des numéros de PCS des opérations suivantes pour la même année
      connection.query(
        "UPDATE `trs-enc` SET `N_PCS` = `N_PCS` + 1 WHERE YEAR(Date_chq) = ? AND (Date_chq > ? OR (Date_chq = ? AND `N_PCS` > ?)) ORDER BY Date_chq",
        [trs.Date_chq.getFullYear(), trs.Date_chq, trs.Date_chq, N_PCS],
        (updateError, updateResults) => {
          if (updateError) {
            console.error(updateError);
            return res.status(500).json({
              error:
                "Erreur lors de la mise à jour des numéros PCS des opérations suivantes",
            });
          }

          return res.status(200).json({ message: "TRS ajouté avec succès" });
        }
      );
    }
  );
}

/*create tresorerie*/
router.post("/create-solde", (req, res, next) => {
  let trs = req.body;

  var query = "  INSERT INTO `trs-enc` (`Date_chq`,`OP`,`ENC`) values(?,?,?)";
  connection.query(query, [trs.Date_chq, trs.OP, trs.ENC], (err) => {
    if (!err) {
      return res.status(200).json({ message: "TRS added succuffuly" });
    } else {
      return res.status(500).json(err);
    }
  });
});

/*delete trésorerie*/
router.delete("/delete/:id", (req, res, next) => {
  const id = req.params.id;

  // Récupérer le N_PCS et l'année de l'opération avant de la supprimer
  connection.query(
    "SELECT N_PCS, YEAR(Date_chq) AS year FROM `trs-enc` WHERE ID_TRS_F_S = ?",
    [id],
    (selectErr, selectResults) => {
      if (selectErr) {
        console.error(selectErr);
        return res.status(500).json({
          error: "Erreur lors de la récupération du N_PCS de l'opération",
        });
      }

      if (selectResults.length === 0) {
        return res.status(404).json({ error: "Opération non trouvée" });
      }

      const N_PCS_to_update = selectResults[0].N_PCS;
      const year = selectResults[0].year;

      // Supprimer l'opération avec l'ID spécifié
      connection.query(
        "DELETE FROM `trs-enc` WHERE ID_TRS_F_S = ?",
        [id],
        (err, results) => {
          if (err) {
            console.error(err);
            return res
              .status(500)
              .json({ error: "Erreur lors de la suppression de l'opération" });
          }

          // Mettre à jour les numéros de PCS des opérations suivantes de la même année
          connection.query(
            "UPDATE `trs-enc` SET `N_PCS` = `N_PCS` - 1 WHERE N_PCS > ? AND YEAR(Date_chq) = ?",
            [N_PCS_to_update, year],
            (updateErr, updateResults) => {
              if (updateErr) {
                console.error(updateErr);
                return res.status(500).json({
                  error:
                    "Erreur lors de la mise à jour des numéros PCS des opérations suivantes",
                });
              }

              return res
                .status(200)
                .json({ message: "TRS supprimé avec succès" });
            }
          );
        }
      );
    }
  );
});

/*create placement*/
router.post("/createPlcTrs", (req, res, next) => {
  let Plc = req.body;
  var query =
    "INSERT INTO `plc_trs`(`date_plc`,`montant`,`duree`,`taux`,`date_ech`,`banque`) VALUES (?,?,?,?,?,?)";
  connection.query(
    query,
    [
      Plc.date_plc,
      Plc.montant,
      Plc.duree,
      Plc.taux,
      Plc.date_ech,
      Plc.nom_cmpt,
    ],
    (err) => {
      if (!err) {
        return res.status(200).json({ message: "TRS added succuffuly" });
      } else {
        return res.status(500).json(err);
      }
    }
  );
});

/*update user*/
router.patch(
  "/updateUser/:id",
  upload_image.single("file"),
  (req, res, next) => {
    const id = req.params.id;
    const userData = req.body;
    let photo = req.file ? req.file.filename : userData.photo; // Si une nouvelle photo est téléchargée, utilisez son nom de fichier, sinon utilisez le nom de fichier de la photo existante

    const query =
      "UPDATE `users` SET `nom`=?, `prenom`=?, `photo`=?, `username`=?, `password`=?, `direction`=?, `poste`=?, `CRUD`=?, `import`=?, `export`=?, `admin`=?, `Add_project`=? WHERE `id`=?";
    connection.query(
      query,
      [
        userData.nom,
        userData.prenom,
        photo,
        userData.username,
        userData.password,
        userData.direction,
        userData.poste,
        userData.CRUD,
        userData.import,
        userData.export,
        userData.admin,
        userData.Add_project,
        id,
      ],
      (err, results) => {
        if (err) {
          console.error("Error updating user:", err);
          return res
            .status(500)
            .json({ error: "An error occurred while updating the user" });
        }

        return res.status(200).json({ message: "User updated successfully" });
      }
    );
  }
);

/*update placement*/
router.patch("/updatePlcTrs/:id", (req, res, next) => {
  const id = req.params.id;
  let Plc = req.body;
  var query =
    "UPDATE `plc_trs` SET `date_plc`=?, `montant`=?,`duree`=?,`taux`=?,`date_ech`=?,`banque`=? where `id`=? ";
  connection.query(
    query,
    [
      Plc.date_plc,
      Plc.montant,
      Plc.duree,
      Plc.taux,
      Plc.date_ech,
      Plc.nom_cmpt,
      id,
    ],
    (err, results) => {
      if (!err) {
        return res.status(200).json({ message: "plc updated succuffuly" });
      } else {
        return res.status(500).json(err);
      }
    }
  );
});

/*delete placement*/

router.delete("/deletePlc/:id", (req, res, next) => {
  const id = req.params.id;
  var query = "DELETE FROM `plc_trs` WHERE id=?";
  connection.query(query, [id], (err, results) => {
    if (!err) {
      return res.status(200).json({ message: "plcs deleted succuffuly" });
    } else {
      return res.status(500).json(err);
    }
  });
});

/*delete placement*/

router.delete("/deleteUser/:id", (req, res, next) => {
  const id = req.params.id;
  var query = "DELETE FROM `users` WHERE id=?";
  connection.query(query, [id], (err, results) => {
    if (!err) {
      return res.status(200).json({ message: "user deleted succuffuly" });
    } else {
      return res.status(500).json(err);
    }
  });
});

/*create CHEQUE en INSTANCE enc*/
router.post("/createInst", (req, res, next) => {
  let trs = req.body;
  const year = new Date(trs.Date_chq).getFullYear();

  connection.query(
    "SELECT MAX(N_PCS) AS max_N_PCS FROM `trs-enc` WHERE year(Date_chq) = ?",
    [year],
    (error, results) => {
      if (error) {
        console.error(error);
        res
          .status(500)
          .send("Erreur lors de la récupération du dernier numéro PCS");
        return;
      }

      let N_PCS;
      if (results[0].max_N_PCS === null) {
        // Aucun enregistrement pour l'année actuelle, donc définissez num_pcs sur 1
        N_PCS = 1;
      } else {
        // Des enregistrements existent pour l'année actuelle, donc récupérez le dernier numéro PCS et incrémentez-le
        N_PCS = results[0].max_N_PCS + 1;
      }

      var query =
        "  INSERT INTO `trs-enc` (`N_PCS`, `Date_chq`,`Date_depot`,`Date_reg`, `N_CHQ`, `OP`, `BNF`, `ENC` , `nom_cmpt`,`chq_inst`) values(?,?,?,'0000-00-00',?,?,?,?,?,?)";
      connection.query(
        query,
        [
          N_PCS,
          trs.Date_chq,
          trs.Date_depot,
          trs.N_CHQ,
          trs.OP,
          trs.BNF,
          trs.ENC,
          trs.nom_cmpt,
          1,
        ],
        (err) => {
          if (!err) {
            return res.status(200).json({ message: "TRS added succuffuly" });
          } else {
            return res.status(500).json(err);
          }
        }
      );
    }
  );
});

/*update trs*/
router.patch("/update/:id", (req, res, next) => {
  const id = req.params.id;
  let trs = req.body;
  var query =
    "UPDATE `trs-enc` SET `Date_chq`=?,`Date_depot`=?,`Date_reg`=?,`N_CHQ`=?,`OP`=?,`BNF`=?,`ENC`=?,`DEC`=?,`nom_cmpt` =? where ID_TRS_F_S=? ";
  connection.query(
    query,
    [
      trs.Date_chq,
      trs.Date_depot,
      trs.Date_reg,
      trs.N_CHQ,
      trs.OP,
      trs.BNF,
      trs.ENC,
      trs.DEC,
      trs.nom_cmpt,
      id,
    ],
    (err, results) => {
      if (!err) {
        return res.status(200).json({ message: "trs updated succuffuly" });
      } else {
        return res.status(500).json(err);
      }
    }
  );
});

/*Import trésorerie*/

const storage = multer.diskStorage({
  destination: "./src/assets",
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname +
        "." +
        file.originalname.split(".")[file.originalname.split(".").length - 1]
    );
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 5 },
});

router.post("/import", upload.single("file"), (req, res, next) => {
  let excel = req.file.filename;
  let workboot = xlsx.readFile("./src/assets/" + excel);
  let worksheet = workboot.Sheets[workboot.SheetNames[0]];
  let range = xlsx.utils.decode_range(worksheet["!ref"]);

  let row = range.s.r; // Initialiser la variable row en dehors de la boucle

  // Fonction récursive pour parcourir chaque ligne du fichier Excel
  function processRow() {
    if (row <= range.e.r) {
      let data = [];

      let isEmptyRow = true; // Marquer la ligne comme vide par défaut

      for (let col = range.s.c; col <= range.e.c; col++) {
        let cell = worksheet[xlsx.utils.encode_cell({ r: row, c: col })];
        // Vérifier si la cellule est définie et si elle a une propriété 'v'
        if (cell && cell.v !== undefined) {
          data.push(cell.v);
          isEmptyRow = false; // La ligne n'est pas vide si une cellule a une valeur
        }
      }

      // Si la ligne est vide, passer à la prochaine itération
      if (isEmptyRow) {
        row++;
        processRow(); // Appeler récursivement pour la ligne suivante
        return;
      }

      const trs = {
        Date_chq: new Date(data[0]),
        N_CHQ: data[1],
        OP: data[2],
        BNF: data[3],
        ENC: data[4],
        DEC: data[5],
      };

      const year = trs.Date_chq.getFullYear();
      // Vérifier si l'année n'existe pas dans la base de données
      connection.query(
        "SELECT DISTINCT YEAR(Date_chq) AS Year FROM `trs-enc`",
        (yearError, yearResults) => {
          if (yearError) {
            console.error(yearError);
            return res
              .status(500)
              .json({ error: "Erreur lors de la récupération des années" });
          }

          const existingYears = yearResults.map((result) => result.Year);

          if (!existingYears.includes(year)) {
            // Si l'année n'existe pas, assigner le numéro de PCS à 1
            trs.N_PCS = 1;
          }

          // Vérification si une opération avec la même date existe déjà
          connection.query(
            "SELECT N_PCS FROM `trs-enc` WHERE Date_chq = ? AND N_PCS IS NOT NULL",
            [trs.Date_chq],
            (error, existingResults) => {
              if (error) {
                console.error(error);
                return res.status(500).json({
                  error:
                    "Erreur lors de la vérification de l'existence de la date",
                });
              }

              if (existingResults.length === 0) {
                // Aucune opération avec la même date
                // Recherche du maximum des N_PCS pour les opérations ayant une date antérieure
                connection.query(
                  "SELECT MAX(N_PCS) AS MaxPCS FROM `trs-enc` WHERE Date_chq < ?",
                  [trs.Date_chq],
                  (dateError, dateResults) => {
                    if (dateError) {
                      console.error(dateError);
                      return res.status(500).json({
                        error:
                          "Erreur lors de la recherche de la date inférieure",
                      });
                    }

                    const maxPCS = dateResults[0].MaxPCS;

                    if (maxPCS !== null) {
                      // Il existe une date inférieure, obtenir le N_PCS correspondant
                      N_PCS = maxPCS + 1;
                    } else {
                      // Aucune date inférieure trouvée, insérer avec N_PCS à 1
                      N_PCS = 1;
                    }

                    // Insérer la nouvelle opération avec le N_PCS déterminé
                    insertOperation(N_PCS, trs);
                  }
                );
              } else {
                // Opération avec la même date existante, obtenir le dernier N_PCS
                N_PCS =
                  Math.max(...existingResults.map((result) => result.N_PCS)) +
                  1;

                // Insertion du nouveau TRS avec le numéro de PCS déterminé
                insertOperation(N_PCS, trs);
              }
            }
          );
        }
      );
    } else {
      // Si c'est la dernière ligne du fichier, renvoyer la réponse
      return res.status(200).json({ message: "TRS ajoutés avec succès" });
    }
  }

  // Appeler la fonction pour traiter la première ligne
  processRow();

  // Fonction pour insérer une nouvelle opération avec le N_PCS déterminé
  function insertOperation(N_PCS, trs, year) {
    connection.query(
      "INSERT INTO `trs-enc` (`N_PCS`, `Date_chq`, `N_CHQ`, `OP`, `BNF`, `ENC`, `DEC`) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [N_PCS, trs.Date_chq, trs.N_CHQ, trs.OP, trs.BNF, trs.ENC, trs.DEC],
      (insertError, insertResults) => {
        if (insertError) {
          console.error(insertError);
          return res
            .status(500)
            .json({ error: "Erreur lors de l'insertion du TRS" });
        }

        // Mise à jour des numéros de PCS des opérations suivantes pour la même année
        connection.query(
          "UPDATE `trs-enc` SET `N_PCS` = `N_PCS` + 1 WHERE YEAR(Date_chq) = ? AND (Date_chq > ? OR (Date_chq = ? AND `N_PCS` > ?)) ORDER BY Date_chq",
          [year, trs.Date_chq, trs.Date_chq, N_PCS],
          (updateError, updateResults) => {
            if (updateError) {
              console.error(updateError);
              return res.status(500).json({
                error:
                  "Erreur lors de la mise à jour des numéros PCS des opérations suivantes",
              });
            }

            // Passer à la ligne suivante et appeler récursivement la fonction de traitement
            row++;
            processRow();
          }
        );
      }
    );
  }
});
