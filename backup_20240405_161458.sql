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
INSERT INTO `direction` VALUES (1,'Direction des Systèmes d\'Information');
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
  `Gantt` tinyint(1) NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'mostefaoui','houda','photo_1711033835366.jpg','b1dbleep','16august2001<3','Direction des Systèmes d\'Information','//',1,1,1,1,1,1),(2,'Anane','Nardjes','photo_1711452099733.PNG','nerssece','soficlef','Direction des Systèmes d\'Information','//',1,1,1,1,1,1),(28,'chibani','mohamed','photo_1711828089969.png','testeur','testeur','Direction des Systèmes d\'Information','responsable technique',1,0,0,0,0,0);
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

-- Dump completed on 2024-04-05 16:15:32
