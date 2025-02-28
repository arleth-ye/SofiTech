-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : mer. 06 mars 2024 à 10:43
-- Version du serveur : 10.4.32-MariaDB
-- Version de PHP : 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `srh`
--

-- --------------------------------------------------------

--
-- Structure de la table `trs-enc`
--

CREATE TABLE `trs-enc` (
  `ID_TRS_F_S` int(10) UNSIGNED NOT NULL,
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
  `chq_inst` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `trs-enc`
--

INSERT INTO `trs-enc` (`ID_TRS_F_S`, `N_PCS`, `Date_chq`, `Date_depot`, `Date_reg`, `N_CHQ`, `OP`, `BNF`, `ENC`, `DEC`, `nom_cmpt`, `chq_inst`) VALUES
(1, 1, '2024-02-01', '0000-00-00', '0000-00-00', '1688008', 'Redevance d\'éléctricité pour logement de fonction PDG 2022/2023', 'SONELGAZ', 0.00, 40857.22, 'B.D.L', 0),
(2, 2, '2024-02-01', NULL, NULL, '5312605', 'Remboursement leasing SARL LE NOMADE FASHION ', 'S.R.H', 4108707.83, 0.00, 'B.D.L', 0),
(3, 3, '2024-02-01', NULL, NULL, '3711344', 'Remboursement leasing 2ART OF ADVERTISING', 'S.R.H', 973305.45, 0.00, 'B.D.L', 0),
(4, 4, '2024-02-05', NULL, NULL, '4106315', 'Remboursement leasing GRANT THORTON', 'S.R.H', 2678669.38, 0.00, 'B.D.L', 0),
(5, 5, '2024-02-05', NULL, NULL, '1688009', 'SARL TEXENA, AIT OUFELLA Boubaker,ETB MAKOUR Mohamed, SARL MIDI NEGOS', 'MAITRE BRAHIM Mustapha', 0.00, 898600.00, 'B.D.L', 0),
(6, 6, '2024-02-05', NULL, NULL, '1688010', 'Réparation  véhicule de service TOYATA YARIS 056244-114-16', 'YAHIA CHERIF ABDELAZZIZ', 0.00, 23000.00, 'B.D.L', 0),
(7, 7, '2024-02-05', NULL, NULL, '                                                                                                                                                                          ', 'Prestation de service sur les travaux efféctués sur le sytéme d\'information', 'MIS', 0.00, 999600.00, 'B.D.L', 0),
(8, 8, '2024-02-05', NULL, NULL, '1688012', 'Renouvellement des assurances flotte automobiles pour l\'exercice 2024', 'SAA 1507', 0.00, 948506.69, 'B.D.L', 0),
(9, 9, '2024-02-05', NULL, NULL, '1688013', 'Révision périodique pour deux  véhicules de service les ACCENTS ', 'LORABI AHLEM', 0.00, 63000.00, 'B.D.L', 0),
(10, 10, '2024-02-05', '0000-00-00', '0000-00-00', '1688014', 'Acquisition matériels informatiques', 'SARL LAHLOU INDUSTRIE', 0.00, 121140.00, 'B.D.L', 0),
(11, 11, '2024-02-05', '0000-00-00', '0000-00-00', '1688015', 'Achat des tenues pour les agent de securité', 'ATTAR FAYCAL GR SAF PROTECT', 0.00, 172645.20, 'B.D.L', 0),
(12, 12, '2024-02-06', '0000-00-00', '0000-00-00', 'VRT', 'Honoraires des dossiers contentieux', 'BOUDAOUDI RAMADANE', 0.00, 859000.00, 'B.D.L', 0),
(13, 13, '2024-02-06', '0000-00-00', '0000-00-00', 'VCR', 'Remboursement leasing ATE', 'S.R.H', 1035187.23, 0.00, 'B.D.L', 0),
(14, 14, '2024-02-07', '0000-00-00', '0000-00-00', 'REM DAT', 'Remboursement DAT', 'S.R.H', 450000000.00, 0.00, 'B.D.L', 0),
(15, 15, '2024-02-07', '0000-00-00', '0000-00-00', 'REM INT', 'INT S/PALCEMENT', 'S.R.H', 2812500.00, 0.00, 'B.D.L', 0),
(16, 16, '2024-02-07', '0000-00-00', '0000-00-00', 'PRELEV', 'Prélevement liberatoire de 10%', 'BDL', 0.00, 281250.00, 'B.D.L', 0),
(17, 17, '2024-02-11', '0000-00-00', '0000-00-00', '5994735', 'Remboursement leasing SARL ARABESQUE COMMUNICATION', 'S.R.H', 2244724.30, 0.00, 'B.D.L', 0),
(18, 18, '2024-02-11', '0000-00-00', '0000-00-00', '5385208', 'Remboursement leasing SARL SCS', 'S.R.H', 11124028.95, 0.00, 'B.D.L', 0),
(19, 19, '2024-02-11', '0000-00-00', '0000-00-00', 'REM DAT', 'Remboursement DAT', 'S.R.H', 100000000.00, 0.00, 'B.D.L', 0),
(20, 20, '2024-02-11', '0000-00-00', '0000-00-00', 'REM INT', 'INT S/PALCEMENT', 'S.R.H', 625000.00, 0.00, 'B.D.L', 0),
(21, 21, '2024-02-11', '0000-00-00', '0000-00-00', 'PRELEV', 'Prélevement liberatoire de 10%', 'BDL', 0.00, 62500.00, 'B.D.L', 0),
(22, 22, '2024-02-11', '0000-00-00', '0000-00-00', 'VRT', 'Alimentation de CPTE VRT reçu de la BA', 'S.R.H', 86000000.00, 0.00, 'B.D.L', 0),
(23, 23, '2024-02-12', '0000-00-00', '0000-00-00', '1688016', 'Renouvellement des assurances du patrimoines pour l\'exercice 2024', 'SAA 1507', 0.00, 3364758.89, 'B.D.L', 0),
(24, 25, '2024-02-14', '0000-00-00', '0000-00-00', '1688017', 'frais de restauration', 'DJERRAR OKBA RESTAURANT', 0.00, 57000.00, 'B.D.L', 0),
(25, 26, '2024-02-14', '0000-00-00', '0000-00-00', '5564537', 'Remboursement leasingSARL INDTRAV', 'S.R.H', 4571200.00, 0.00, 'B.D.L', 0),
(26, 27, '2024-02-14', '0000-00-00', '0000-00-00', '5312614', 'Remboursement SARL LE NOMADE FASHION', 'S.R.H', 5694068.40, 0.00, 'B.D.L', 0),
(27, 28, '2024-02-19', '0000-00-00', '0000-00-00', '5564617', 'Remboursement SARL INDTRAV', 'S.R.H', 5000000.00, 0.00, 'B.D.L', 0),
(28, 29, '2024-02-19', '0000-00-00', '0000-00-00', '1688018', 'Déclaration G50  mois de Janvier  2024', 'CDI', 0.00, 18784008.00, 'B.D.L', 0),
(29, 30, '2024-02-19', '0000-00-00', '0000-00-00', '1688019', 'Achat des articles d\'éléctricité pour la société', 'SARL OUNELEC', 0.00, 121495.62, 'B.D.L', 0),
(30, 31, '2024-02-19', '0000-00-00', '0000-00-00', '1688020', 'Achat drapeau national', 'SARL BROYALG FLAG HOUSE ', 0.00, 58905.00, 'B.D.L', 0),
(31, 32, '2024-02-19', '0000-00-00', '0000-00-00', '1688021', 'Révision périodique pour véhicule de service  ACCENT', 'LORABI AHLEM', 0.00, 21700.00, 'B.D.L', 0),
(32, 33, '2024-02-20', '0000-00-00', '0000-00-00', '5312616', 'Remboursement SARL LE NOMADE FASHION', 'S.R.H', 4604923.93, 0.00, 'B.D.L', 0),
(33, 34, '2024-02-20', '0000-00-00', '0000-00-00', '6175004', 'Remboursement leasing SARL FOUARA 08MAI45', 'S.R.H', 4804943.15, 0.00, 'B.D.L', 0),
(34, 35, '2024-02-22', '0000-00-00', '0000-00-00', '5564616', 'Remboursement SARL INDTRAV', 'S.R.H', 5000000.00, 0.00, 'B.D.L', 0),
(35, 36, '2024-02-22', '0000-00-00', '0000-00-00', '1688022', 'Redevance d\'éléctricité mois de Janvier 2024', 'SONELGAZ', 0.00, 72204.02, 'B.D.L', 0),
(36, 37, '2024-02-22', '0000-00-00', '0000-00-00', '1688023', 'Réalisation des travaux de plomberie', 'EURL LANI REA', 0.00, 2082500.00, 'B.D.L', 0),
(37, 38, '2024-02-22', '0000-00-00', '0000-00-00', '1688024', 'Répartion onduleur', 'SARL AFALCO', 0.00, 415548.00, 'B.D.L', 0),
(38, 39, '2024-02-22', '0000-00-00', '0000-00-00', '1688025', 'Frais de formation 1ere tranche Mme ALAAT Nadia', 'ISGP', 0.00, 180552.50, 'B.D.L', 0),
(39, 40, '2024-02-22', '0000-00-00', '0000-00-00', '1688026', 'Reddevance des lignes téléphonique', 'OPTIMUM', 0.00, 37800.00, 'B.D.L', 0),
(40, 41, '2024-02-22', '0000-00-00', '0000-00-00', '9316594', 'Remboursement MFA', 'S.R.H', 19676.17, 0.00, 'B.D.L', 0),
(41, 42, '2024-02-22', '0000-00-00', '0000-00-00', '9316595', 'Remboursement MFA', 'S.R.H', 7396.20, 0.00, 'B.D.L', 0),
(42, 43, '2024-02-22', '0000-00-00', '0000-00-00', 'VRT', 'Prestation de gardiennage pour le mois de Janvier 2024 ', 'ASG', 0.00, 1221535.00, 'B.D.L', 0),
(43, 44, '2024-02-25', '0000-00-00', '0000-00-00', '8723579', 'Remboursement leasing SARL SOFICLEF', 'S.R.H', 3330955.26, 0.00, 'B.D.L', 1),
(44, 45, '2024-02-25', '0000-00-00', '0000-00-00', '5086149', 'Remboursement de la vente aux chéres', 'S.R.H', 94050.00, 0.00, 'B.D.L', 0),
(45, 46, '2024-02-25', '0000-00-00', '0000-00-00', '5312619', 'Remboursement leasing SARL LE NOMADE FASHION ', 'S.R.H', 4105588.23, 0.00, 'B.D.L', 0),
(46, 47, '2024-02-25', '0000-00-00', '0000-00-00', '1688027', 'Honoraires SARL VIC EQUIPEMENT', 'MAITRE DJEBARRA SAMIRA', 0.00, 622000.00, 'B.D.L', 0),
(47, 48, '2024-02-25', '0000-00-00', '0000-00-00', '1272017', 'Acquisition de deux véhicules de service', 'FIAT EL DJAZAIR', 0.00, 6251190.00, 'B.D.L', 0),
(48, 49, '2024-02-26', '0000-00-00', '0000-00-00', '1272472', 'Achat des billets pour mission ', 'AIR ALGERIE', 0.00, 32114.00, 'B.D.L', 0),
(49, 50, '2024-02-26', '0000-00-00', '0000-00-00', '1688028', 'Déclaration CNAC mois de Janvier  2024', 'CNAS', 0.00, 1682193.33, 'B.D.L', 0),
(50, 51, '2024-02-26', '0000-00-00', '0000-00-00', 'VRT', 'Salaire mois de Février 2024', 'S.R.H', 0.00, 4071575.79, 'B.D.L', 0),
(51, 52, '2024-02-26', '0000-00-00', '0000-00-00', 'VCR', 'Remboursement leasing BOUCHEMAL AZZOUZ', 'S.R.H', 5449095.99, 0.00, 'B.D.L', 0),
(52, 53, '2024-02-27', '0000-00-00', '0000-00-00', '1688029', 'Alimentation de caisse', 'KHELLIL KARIMA', 0.00, 100000.00, 'B.D.L', 0),
(53, 54, '2024-02-27', '0000-00-00', '0000-00-00', 'VRT', 'Remboursement leasing EL ATHIR', 'S.R.H', 2786123.38, 0.00, 'B.D.L', 0),
(54, 55, '2024-02-27', '0000-00-00', '0000-00-00', '3711357', 'Remboursement leasing 2ART OF ADVERTISING', 'S.R.H', 972250.86, 0.00, 'B.D.L', 1),
(55, 56, '2024-02-27', '0000-00-00', '0000-00-00', '6160788', 'Remboursement d\'assurance des biens', 'S.R.H', 289268.36, 0.00, 'B.D.L', 0),
(56, NULL, '2024-02-01', NULL, NULL, NULL, 'le report Solde au : 01/02/2024', NULL, 101968216.25, 0.00, 'B.D.L', 0),
(57, 57, '2024-02-19', '0000-00-00', '0000-00-00', '5564617', 'REMBOURSEMENT SARL indtrav rejet', 'S.R.H', 0.00, 5000000.00, 'B.D.L', 0),
(58, 58, '2024-02-29', '2024-02-29', '0000-00-00', '5564646', 'Remboursement  leasing SARL INDTRAV', 'S.R.H', 4000000.00, 0.00, 'B.D.L', 0),
(59, 59, '2024-03-05', '2024-02-29', '0000-00-00', '5564645', 'Remboursement leasing SARL INDTRAV', 'S.R.H', 3000000.00, 0.00, 'B.D.L', 0),
(60, 60, '2024-02-27', '2024-02-29', '2024-02-29', 'VRT', 'Alimentation du cpte des oeuvres sociales pour le fete du 08Mars', 'S.R.H', NULL, 100000.00, 'B.D.L', 0),
(61, 24, '2024-02-12', '0000-00-00', '0000-00-00', 'VRT', 'Règlement de Facture ', 'Restaurant El Djazeera', 0.00, 13480.00, 'B.D.L', 0);

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `trs-enc`
--
ALTER TABLE `trs-enc`
  ADD PRIMARY KEY (`ID_TRS_F_S`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `trs-enc`
--
ALTER TABLE `trs-enc`
  MODIFY `ID_TRS_F_S` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=62;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
