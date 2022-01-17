-- MySQL dump 10.13  Distrib 5.5.62, for Win64 (AMD64)
--
-- Host: 127.0.0.1    Database: db_bond
-- ------------------------------------------------------
-- Server version	5.5.5-10.4.22-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `login`
--

DROP TABLE IF EXISTS `login`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `login` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `access_token` varchar(256) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `login`
--

LOCK TABLES `login` WRITE;
/*!40000 ALTER TABLE `login` DISABLE KEYS */;
INSERT INTO `login` VALUES (1,'bond_admin','admin@bond.com','$2b$10$wqFaVMJxdB4N2eUQE.966e7NlK21MrzMptJU1gmlQGWjmyi1xL21.','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJib25kX2FkbWluIiwiZW1haWwiOiJhZG1pbkBib25kLmNvbSIsImlhdCI6MTY0MjQxMTU0OSwiZXhwIjoxNjQyNDE4NzQ5fQ.jqB_Hin1W1yNU16yH7kW-mjkHh6U5BRnUHv4f687t94');
/*!40000 ALTER TABLE `login` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_email`
--

DROP TABLE IF EXISTS `tb_email`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tb_email` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `group` int(11) NOT NULL,
  `is_active` int(11) NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_email`
--

LOCK TABLES `tb_email` WRITE;
/*!40000 ALTER TABLE `tb_email` DISABLE KEYS */;
INSERT INTO `tb_email` VALUES (1,'EVENT BOND 300','asdas@asdsf.com',1,1),(2,'User Name 1000','useremail1000@mail.com',1,1),(3,'User Name 1001','useremail1001@mail.com',2,1),(4,'User Name 1002','useremail1002@mail.com',3,1),(5,'User Name 1003','useremail1003@mail.com',1,1),(6,'User Name 1004','useremail1004@mail.com',3,1),(7,'User Name 1005','useremail1005@mail.com',1,1),(8,'User Name 1006','useremail1006@mail.com',1,1),(9,'User Name 1007','useremail1007@mail.com',2,1),(10,'User Name 1008','useremail1008@mail.com',2,1),(11,'User Name 1009','useremail1009@mail.com',2,1),(12,'User Name 1010','useremail1010@mail.com',3,1),(13,'User Name 1011','useremail1011@mail.com',3,1),(14,'User Name 1012','useremail1012@mail.com',3,1),(15,'User Name 1013','useremail1013@mail.com',3,1),(16,'User Name 1014','useremail1014@mail.com',1,1),(17,'User Name 1015','useremail1015@mail.com',2,1);
/*!40000 ALTER TABLE `tb_email` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_event`
--

DROP TABLE IF EXISTS `tb_event`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tb_event` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `event_name` varchar(100) NOT NULL,
  `event_date` varchar(100) NOT NULL,
  `description` longtext NOT NULL,
  `created_by` varchar(100) NOT NULL,
  `created_at` varchar(100) NOT NULL,
  `updated_at` varchar(100) DEFAULT NULL,
  `is_active` int(11) NOT NULL DEFAULT 1,
  `event_time` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_event`
--

LOCK TABLES `tb_event` WRITE;
/*!40000 ALTER TABLE `tb_event` DISABLE KEYS */;
/*!40000 ALTER TABLE `tb_event` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_event_image`
--

DROP TABLE IF EXISTS `tb_event_image`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tb_event_image` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `event_id` int(11) NOT NULL,
  `created_by` varchar(32) NOT NULL,
  `created_at` varchar(100) NOT NULL,
  `updated_at` varchar(100) DEFAULT NULL,
  `filename` varchar(100) NOT NULL,
  `base64string` longtext DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_event_image`
--

LOCK TABLES `tb_event_image` WRITE;
/*!40000 ALTER TABLE `tb_event_image` DISABLE KEYS */;
/*!40000 ALTER TABLE `tb_event_image` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_group`
--

DROP TABLE IF EXISTS `tb_group`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tb_group` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `group_name` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_group`
--

LOCK TABLES `tb_group` WRITE;
/*!40000 ALTER TABLE `tb_group` DISABLE KEYS */;
INSERT INTO `tb_group` VALUES (1,'VVIP'),(2,'Executive'),(3,'Reguler'),(4,'Executive');
/*!40000 ALTER TABLE `tb_group` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'db_bond'
--
