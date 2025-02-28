-- MariaDB dump 10.19  Distrib 10.4.32-MariaDB, for Win64 (AMD64)
--
-- Host: localhost    Database: srh
-- ------------------------------------------------------
-- Server version	10.4.32-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `cmt_bnq`
--

DROP TABLE IF EXISTS `cmt_bnq`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cmt_bnq` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(266) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cmt_bnq`
--

LOCK TABLES `cmt_bnq` WRITE;
/*!40000 ALTER TABLE `cmt_bnq` DISABLE KEYS */;
INSERT INTO `cmt_bnq` VALUES (1,'B.Algérie'),(2,'B.E.A'),(3,'B.D.L'),(4,'B.A.D.R banque'),(5,'C.N.E.P banque'),(6,'C.P.A');
/*!40000 ALTER TABLE `cmt_bnq` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `direction`
--

DROP TABLE IF EXISTS `direction`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `direction` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nom_direction` varchar(266) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `direction`
--

LOCK TABLES `direction` WRITE;
/*!40000 ALTER TABLE `direction` DISABLE KEYS */;
INSERT INTO `direction` VALUES (2,'Direction Général'),(3,'Direction d\'Administration et des Finances '),(4,'Direction Commerciale et Recouvrement'),(5,'Direction d\'Audit et Contrôle interne'),(6,'Cellule de Contrôle Permanant '),(7,'Cellule Juridique'),(8,'Direction de la Comptabilité '),(9,'Direction de Refinancement et Titrisation'),(10,'Direction des Systèmes d\'Information');
/*!40000 ALTER TABLE `direction` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `jrn-act`
--

DROP TABLE IF EXISTS `jrn-act`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `jrn-act` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user` varchar(266) NOT NULL,
  `operation` varchar(266) NOT NULL,
  `date` date NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `jrn-act`
--

LOCK TABLES `jrn-act` WRITE;
/*!40000 ALTER TABLE `jrn-act` DISABLE KEYS */;
/*!40000 ALTER TABLE `jrn-act` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `plc_trs`
--

DROP TABLE IF EXISTS `plc_trs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `plc_trs` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `date_plc` date DEFAULT NULL,
  `date_ech` date DEFAULT NULL,
  `banque` varchar(266) DEFAULT NULL,
  `duree` varchar(11) DEFAULT NULL,
  `montant` decimal(18,2) DEFAULT NULL,
  `taux` decimal(18,2) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `plc_trs`
--

LOCK TABLES `plc_trs` WRITE;
/*!40000 ALTER TABLE `plc_trs` DISABLE KEYS */;
/*!40000 ALTER TABLE `plc_trs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `poste`
--

DROP TABLE IF EXISTS `poste`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `poste` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `direction` varchar(266) NOT NULL,
  `nom_poste` varchar(266) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `poste`
--

LOCK TABLES `poste` WRITE;
/*!40000 ALTER TABLE `poste` DISABLE KEYS */;
/*!40000 ALTER TABLE `poste` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sit-trs`
--

DROP TABLE IF EXISTS `sit-trs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sit-trs` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `montant` decimal(18,2) NOT NULL,
  `banque` varchar(266) NOT NULL,
  `date` date NOT NULL,
  `validation` tinyint(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sit-trs`
--

LOCK TABLES `sit-trs` WRITE;
/*!40000 ALTER TABLE `sit-trs` DISABLE KEYS */;
INSERT INTO `sit-trs` VALUES (1,-878.68,'C.P.A','2020-02-01',1),(4,761236013.94,'B.D.L','2024-02-01',1),(5,155070.69,'C.N.E.P banque','2020-02-01',1),(6,9506.61,'B.A.D.R banque ','2020-02-01',1),(7,-2871.00,'B.N.A','2020-02-01',1),(8,0.00,'B.E.A','2020-02-01',1),(9,16114123.87,'B.Algérie','0000-00-00',1),(14,3000000.00,'B.D.L','2024-03-05',0);
/*!40000 ALTER TABLE `sit-trs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `trs-enc`
--

DROP TABLE IF EXISTS `trs-enc`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `trs-enc` (
  `ID_TRS_F_S` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `N_PCS` int(11) DEFAULT NULL,
  `Date_chq` date DEFAULT NULL,
  `Date_depot` date DEFAULT NULL,
  `Date_reg` date DEFAULT NULL,
  `N_CHQ` varchar(266) DEFAULT NULL,
  `OP` varchar(266) DEFAULT NULL,
  `BNF` varchar(266) DEFAULT NULL,
  `ENC` decimal(18,2) DEFAULT 0.00,
  `DEC` decimal(18,2) DEFAULT 0.00,
  `nom_cmpt` varchar(266) DEFAULT NULL,
  `chq_inst` tinyint(1) DEFAULT 0,
  PRIMARY KEY (`ID_TRS_F_S`)
) ENGINE=InnoDB AUTO_INCREMENT=62 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `trs-enc`
--

LOCK TABLES `trs-enc` WRITE;
/*!40000 ALTER TABLE `trs-enc` DISABLE KEYS */;
INSERT INTO `trs-enc` VALUES (1,1,'2024-02-01','0000-00-00','0000-00-00','1688008','Redevance d\'éléctricité pour logement de fonction PDG 2022/2023','SONELGAZ',0.00,40857.22,'B.D.L',0),(2,2,'2024-02-01',NULL,NULL,'5312605','Remboursement leasing SARL LE NOMADE FASHION ','S.R.H',4108707.83,0.00,'B.D.L',0),(3,3,'2024-02-01',NULL,NULL,'3711344','Remboursement leasing 2ART OF ADVERTISING','S.R.H',973305.45,0.00,'B.D.L',0),(4,4,'2024-02-05',NULL,NULL,'4106315','Remboursement leasing GRANT THORTON','S.R.H',2678669.38,0.00,'B.D.L',0),(5,5,'2024-02-05',NULL,NULL,'1688009','SARL TEXENA, AIT OUFELLA Boubaker,ETB MAKOUR Mohamed, SARL MIDI NEGOS','MAITRE BRAHIM Mustapha',0.00,898600.00,'B.D.L',0),(6,6,'2024-02-05',NULL,NULL,'1688010','Réparation  véhicule de service TOYATA YARIS 056244-114-16','YAHIA CHERIF ABDELAZZIZ',0.00,23000.00,'B.D.L',0),(7,7,'2024-02-05',NULL,NULL,'                                                                                                                                                                          ','Prestation de service sur les travaux efféctués sur le sytéme d\'information','MIS',0.00,999600.00,'B.D.L',0),(8,8,'2024-02-05',NULL,NULL,'1688012','Renouvellement des assurances flotte automobiles pour l\'exercice 2024','SAA 1507',0.00,948506.69,'B.D.L',0),(9,9,'2024-02-05',NULL,NULL,'1688013','Révision périodique pour deux  véhicules de service les ACCENTS ','LORABI AHLEM',0.00,63000.00,'B.D.L',0),(10,10,'2024-02-05','0000-00-00','0000-00-00','1688014','Acquisition matériels informatiques','SARL LAHLOU INDUSTRIE',0.00,121140.00,'B.D.L',0),(11,11,'2024-02-05','0000-00-00','0000-00-00','1688015','Achat des tenues pour les agent de securité','ATTAR FAYCAL GR SAF PROTECT',0.00,172645.20,'B.D.L',0),(12,12,'2024-02-06','0000-00-00','0000-00-00','VRT','Honoraires des dossiers contentieux','BOUDAOUDI RAMADANE',0.00,859000.00,'B.D.L',0),(13,13,'2024-02-06','0000-00-00','0000-00-00','VCR','Remboursement leasing ATE','S.R.H',1035187.23,0.00,'B.D.L',0),(14,14,'2024-02-07','0000-00-00','0000-00-00','REM DAT','Remboursement DAT','S.R.H',450000000.00,0.00,'B.D.L',0),(15,15,'2024-02-07','0000-00-00','0000-00-00','REM INT','INT S/PALCEMENT','S.R.H',2812500.00,0.00,'B.D.L',0),(16,16,'2024-02-07','0000-00-00','0000-00-00','PRELEV','Prélevement liberatoire de 10%','BDL',0.00,281250.00,'B.D.L',0),(17,17,'2024-02-11','0000-00-00','0000-00-00','5994735','Remboursement leasing SARL ARABESQUE COMMUNICATION','S.R.H',2244724.30,0.00,'B.D.L',0),(18,18,'2024-02-11','0000-00-00','0000-00-00','5385208','Remboursement leasing SARL SCS','S.R.H',11124028.95,0.00,'B.D.L',0),(19,19,'2024-02-11','0000-00-00','0000-00-00','REM DAT','Remboursement DAT','S.R.H',100000000.00,0.00,'B.D.L',0),(20,20,'2024-02-11','0000-00-00','0000-00-00','REM INT','INT S/PALCEMENT','S.R.H',625000.00,0.00,'B.D.L',0),(21,21,'2024-02-11','0000-00-00','0000-00-00','PRELEV','Prélevement liberatoire de 10%','BDL',0.00,62500.00,'B.D.L',0),(22,22,'2024-02-11','0000-00-00','0000-00-00','VRT','Alimentation de CPTE VRT reçu de la BA','S.R.H',86000000.00,0.00,'B.D.L',0),(23,23,'2024-02-12','0000-00-00','0000-00-00','1688016','Renouvellement des assurances du patrimoines pour l\'exercice 2024','SAA 1507',0.00,3364758.89,'B.D.L',0),(24,25,'2024-02-14','0000-00-00','0000-00-00','1688017','frais de restauration','DJERRAR OKBA RESTAURANT',0.00,57000.00,'B.D.L',0),(25,26,'2024-02-14','0000-00-00','0000-00-00','5564537','Remboursement leasingSARL INDTRAV','S.R.H',4571200.00,0.00,'B.D.L',0),(26,27,'2024-02-14','0000-00-00','0000-00-00','5312614','Remboursement SARL LE NOMADE FASHION','S.R.H',5694068.40,0.00,'B.D.L',0),(27,28,'2024-02-19','0000-00-00','0000-00-00','5564617','Remboursement SARL INDTRAV','S.R.H',5000000.00,0.00,'B.D.L',0),(28,29,'2024-02-19','0000-00-00','0000-00-00','1688018','Déclaration G50  mois de Janvier  2024','CDI',0.00,18784008.00,'B.D.L',0),(29,30,'2024-02-19','0000-00-00','0000-00-00','1688019','Achat des articles d\'éléctricité pour la société','SARL OUNELEC',0.00,121495.62,'B.D.L',0),(30,31,'2024-02-19','0000-00-00','0000-00-00','1688020','Achat drapeau national','SARL BROYALG FLAG HOUSE ',0.00,58905.00,'B.D.L',0),(31,32,'2024-02-19','0000-00-00','0000-00-00','1688021','Révision périodique pour véhicule de service  ACCENT','LORABI AHLEM',0.00,21700.00,'B.D.L',0),(32,33,'2024-02-20','0000-00-00','0000-00-00','5312616','Remboursement SARL LE NOMADE FASHION','S.R.H',4604923.93,0.00,'B.D.L',0),(33,34,'2024-02-20','0000-00-00','0000-00-00','6175004','Remboursement leasing SARL FOUARA 08MAI45','S.R.H',4804943.15,0.00,'B.D.L',0),(34,35,'2024-02-22','0000-00-00','0000-00-00','5564616','Remboursement SARL INDTRAV','S.R.H',5000000.00,0.00,'B.D.L',0),(35,36,'2024-02-22','0000-00-00','0000-00-00','1688022','Redevance d\'éléctricité mois de Janvier 2024','SONELGAZ',0.00,72204.02,'B.D.L',0),(36,37,'2024-02-22','0000-00-00','0000-00-00','1688023','Réalisation des travaux de plomberie','EURL LANI REA',0.00,2082500.00,'B.D.L',0),(37,38,'2024-02-22','0000-00-00','0000-00-00','1688024','Répartion onduleur','SARL AFALCO',0.00,415548.00,'B.D.L',0),(38,39,'2024-02-22','0000-00-00','0000-00-00','1688025','Frais de formation 1ere tranche Mme ALAAT Nadia','ISGP',0.00,180552.50,'B.D.L',0),(39,40,'2024-02-22','0000-00-00','0000-00-00','1688026','Reddevance des lignes téléphonique','OPTIMUM',0.00,37800.00,'B.D.L',0),(40,41,'2024-02-22','0000-00-00','0000-00-00','9316594','Remboursement MFA','S.R.H',19676.17,0.00,'B.D.L',0),(41,42,'2024-02-22','0000-00-00','0000-00-00','9316595','Remboursement MFA','S.R.H',7396.20,0.00,'B.D.L',0),(42,43,'2024-02-22','0000-00-00','0000-00-00','VRT','Prestation de gardiennage pour le mois de Janvier 2024 ','ASG',0.00,1221535.00,'B.D.L',0),(43,44,'2024-02-25','0000-00-00','0000-00-00','8723579','Remboursement leasing SARL SOFICLEF','S.R.H',3330955.26,0.00,'B.D.L',1),(44,45,'2024-02-25','0000-00-00','0000-00-00','5086149','Remboursement de la vente aux chéres','S.R.H',94050.00,0.00,'B.D.L',0),(45,46,'2024-02-25','0000-00-00','0000-00-00','5312619','Remboursement leasing SARL LE NOMADE FASHION ','S.R.H',4105588.23,0.00,'B.D.L',0),(46,47,'2024-02-25','0000-00-00','0000-00-00','1688027','Honoraires SARL VIC EQUIPEMENT','MAITRE DJEBARRA SAMIRA',0.00,622000.00,'B.D.L',0),(47,48,'2024-02-25','0000-00-00','0000-00-00','1272017','Acquisition de deux véhicules de service','FIAT EL DJAZAIR',0.00,6251190.00,'B.D.L',0),(48,49,'2024-02-26','0000-00-00','0000-00-00','1272472','Achat des billets pour mission ','AIR ALGERIE',0.00,32114.00,'B.D.L',0),(49,50,'2024-02-26','0000-00-00','0000-00-00','1688028','Déclaration CNAC mois de Janvier  2024','CNAS',0.00,1682193.33,'B.D.L',0),(50,51,'2024-02-26','0000-00-00','0000-00-00','VRT','Salaire mois de Février 2024','S.R.H',0.00,4071575.79,'B.D.L',0),(51,52,'2024-02-26','0000-00-00','0000-00-00','VCR','Remboursement leasing BOUCHEMAL AZZOUZ','S.R.H',5449095.99,0.00,'B.D.L',0),(52,53,'2024-02-27','0000-00-00','0000-00-00','1688029','Alimentation de caisse','KHELLIL KARIMA',0.00,100000.00,'B.D.L',0),(53,54,'2024-02-27','0000-00-00','0000-00-00','VRT','Remboursement leasing EL ATHIR','S.R.H',2786123.38,0.00,'B.D.L',0),(54,55,'2024-02-27','0000-00-00','0000-00-00','3711357','Remboursement leasing 2ART OF ADVERTISING','S.R.H',972250.86,0.00,'B.D.L',1),(55,56,'2024-02-27','0000-00-00','0000-00-00','6160788','Remboursement d\'assurance des biens','S.R.H',289268.36,0.00,'B.D.L',0),(56,NULL,'2024-02-01',NULL,NULL,NULL,'le report Solde au : 01/02/2024',NULL,101968216.25,0.00,'B.D.L',0),(57,57,'2024-02-19','0000-00-00','0000-00-00','5564617','REMBOURSEMENT SARL indtrav rejet','S.R.H',0.00,5000000.00,'B.D.L',0),(58,58,'2024-02-29','2024-02-29','0000-00-00','5564646','Remboursement  leasing SARL INDTRAV','S.R.H',4000000.00,0.00,'B.D.L',0),(59,59,'2024-03-05','2024-02-29','0000-00-00','5564645','Remboursement leasing SARL INDTRAV','S.R.H',3000000.00,0.00,'B.D.L',0),(60,60,'2024-02-27','2024-02-29','2024-02-29','VRT','Alimentation du cpte des oeuvres sociales pour le fete du 08Mars','S.R.H',NULL,100000.00,'B.D.L',0),(61,24,'2024-02-12','0000-00-00','0000-00-00','VRT','Règlement de Facture ','Restaurant El Djazeera',0.00,13480.00,'B.D.L',0);
/*!40000 ALTER TABLE `trs-enc` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nom` varchar(266) NOT NULL,
  `prenom` varchar(266) NOT NULL,
  `photo` varchar(266) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `direction` varchar(266) DEFAULT NULL,
  `poste` varchar(266) DEFAULT NULL,
  `compte` tinyint(1) NOT NULL DEFAULT 1,
  `CRUD` tinyint(1) NOT NULL,
  `import` tinyint(1) NOT NULL,
  `export` tinyint(1) NOT NULL,
  `admin` tinyint(1) NOT NULL,
  `tresorerie` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'MOSTEFAOUI','Sarah','photo_1708521906380.jpg','sarah','sarah','Direction des Systèmes d\'Information','Ingénieur d\'Etat',1,1,1,1,1,1),(2,'HAMITOUCHE','Nedjoua','photo_1708607152467.PNG','hamitouche','hamitouche','Cellule de Contrôle Permanant ','Chef de Département',1,0,0,1,0,1),(13,'NASRI','Fatna Sabra','photo_1708607006527.PNG','nasri','nasri','Direction d\'Administration et des Finances ','Chargée d\'Etudes',0,1,0,1,0,1),(14,'BOUDOUCHA','Lamia','photo_1708607231212.PNG','boudoucha','boudoucha','Direction d\'Administration et des Finances ','Chef de Département ',1,1,0,1,0,1),(15,'MEHDI','Samia','photo_1708607360707.PNG','mehdi','mehdi','Direction de Refinancement et Titrisation','Directrice de Titrisation',1,0,0,1,0,1),(16,'MOUFFOK','Hafida','photo_1708607536040.PNG','mouffok','mouffok','Direction d\'Audit et Contrôle interne','Directrice',1,0,0,1,0,1),(17,'KASSOUR','Abdelhakim','photo_1708607856875.PNG','kassour','kassour','Direction Général','Président Directeur Générale',1,0,0,1,0,1),(18,'LAOUTI','Sihem','photo_1709213385774.PNG','laouti','laouti','Direction de la Comptabilité ','Directrice',1,0,0,0,0,1),(19,'BENABDERAHMANE','Abdelhafid','photo_1709213361231.PNG','BENABDERAHMANE','BENABDERAHMANE','Direction d\'Administration et des Finances ','Directeur',0,0,0,0,0,1);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-03-06 10:44:32
