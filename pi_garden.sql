-- MySQL dump 10.15  Distrib 10.0.32-MariaDB, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: pi_garden
-- ------------------------------------------------------
-- Server version	10.0.32-MariaDB-0+deb8u1

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
-- Table structure for table `actions`
--

DROP TABLE IF EXISTS `actions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `actions` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `device_id` int(11) unsigned NOT NULL,
  `verb` char(25) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT 'save a verb like READ, WRITE, START, OPEN, STOP, CHECK_PROGRESS..',
  `object` char(25) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT 'save a code like AREA, TEMPERATURE...',
  `options` text COLLATE utf8_unicode_ci COMMENT 'a json with options',
  `last_run_time` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `next_run_time` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `schedule` text COLLATE utf8_unicode_ci NOT NULL COMMENT 'json {start: {every: 60}/{at:[7:10:11, 13:01:00]}, CHECK_PROGRESS: {every: 60}}',
  `description` text COLLATE utf8_unicode_ci NOT NULL,
  `is_running` tinyint(1) DEFAULT NULL,
  `status` char(25) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT 'ACTIVE, COMPLETED, WARNING, ERROR, INACTIVE, DELETED',
  `retries` smallint(6) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `actions`
--

LOCK TABLES `actions` WRITE;
/*!40000 ALTER TABLE `actions` DISABLE KEYS */;
INSERT INTO `actions` VALUES (1,1,'READ','TEMPERATURE','{}','2018-04-22 06:49:14','2018-04-22 06:49:14','{\"type\": \"cyclic\", \"every\": \"PT20S\"}','Read temperature from device 1',0,'INACTIVE',0),(2,2,'READ','HUMIDITY','{}','2018-04-22 06:49:14','2018-04-22 06:49:14','{\"type\": \"cyclic\", \"every\": \"PT10S\"}','Read humidity from device 2',0,'INACTIVE',0),(3,3,'READ','TEMPERATURE_HUMIDITY','{}','2018-04-22 06:49:14','2018-04-22 06:49:14','{\"type\": \"cyclic\", \"every\": \"PT30S\"}','Read temperature and humidity from device 3',0,'INACTIVE',0);
/*!40000 ALTER TABLE `actions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `areas`
--

DROP TABLE IF EXISTS `areas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `areas` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `description` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `status` char(25) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT 'ACTIVE, INACTIVE, DELETED',
  `options` text COLLATE utf8_unicode_ci COMMENT 'save more settings here as json',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `areas`
--

LOCK TABLES `areas` WRITE;
/*!40000 ALTER TABLE `areas` DISABLE KEYS */;
INSERT INTO `areas` VALUES (1,'Area 1','This is area 1','ACTIVE','{}'),(2,'Area 2','This is area 2','ACTIVE','{}');
/*!40000 ALTER TABLE `areas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `areas_devices`
--

DROP TABLE IF EXISTS `areas_devices`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `areas_devices` (
  `area_id` int(11) unsigned NOT NULL,
  `device_id` int(11) unsigned NOT NULL,
  `status` char(25) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT 'ACTIVE, INACTIVE, DELETED',
  `options` text COLLATE utf8_unicode_ci COMMENT 'save more settings here as json'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `areas_devices`
--

LOCK TABLES `areas_devices` WRITE;
/*!40000 ALTER TABLE `areas_devices` DISABLE KEYS */;
INSERT INTO `areas_devices` VALUES (1,1,'ACTIVE','{}'),(1,2,'ACTIVE','{}'),(2,2,'ACTIVE','{}'),(1,3,'ACTIVE','{}');
/*!40000 ALTER TABLE `areas_devices` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `configs`
--

DROP TABLE IF EXISTS `configs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `configs` (
  `name` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `value` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `options` text COLLATE utf8_unicode_ci COMMENT 'save more settings here as json',
  `description` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `configs`
--

LOCK TABLES `configs` WRITE;
/*!40000 ALTER TABLE `configs` DISABLE KEYS */;
INSERT INTO `configs` VALUES ('AH_RETRIES_NO','15',NULL,'How many times will AH retry an action until it will set it to ERROR');
/*!40000 ALTER TABLE `configs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `devices`
--

DROP TABLE IF EXISTS `devices`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `devices` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `type` char(15) COLLATE utf8_unicode_ci DEFAULT NULL,
  `description` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `status` char(25) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT 'ACTIVE, INACTIVE, DELETED',
  `options` text COLLATE utf8_unicode_ci COMMENT 'save more settings here as json',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `devices`
--

LOCK TABLES `devices` WRITE;
/*!40000 ALTER TABLE `devices` DISABLE KEYS */;
INSERT INTO `devices` VALUES (1,'DS18B20','DIGITAL','DS18B20 digital humidity sensor','ACTIVE','{\"js_file\":\"ds18b20/read_ds18b20\"}'),(2,'FW1S','ANALOG','FW1S analog humidity sensor','ACTIVE','{\"js_file\":\"fw1s/read_fw1s\"}'),(3,'DHT22','DIGITAL','DHT22 digital temperature/humidity sensor','ACTIVE','{\"js_file\":\"dht22/read_dht22\",\"GPIOpin\":\"22\"}');
/*!40000 ALTER TABLE `devices` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `logs`
--

DROP TABLE IF EXISTS `logs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `logs` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `action_id` int(11) unsigned DEFAULT NULL,
  `area_id` int(11) DEFAULT NULL,
  `device_id` int(11) DEFAULT NULL,
  `type` char(25) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT 'save a code like CREATE_AREA, READ_TEMPERATURE...',
  `description` text COLLATE utf8_unicode_ci NOT NULL,
  `date` timestamp(4) NOT NULL DEFAULT CURRENT_TIMESTAMP(4),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `logs`
--

LOCK TABLES `logs` WRITE;
/*!40000 ALTER TABLE `logs` DISABLE KEYS */;
INSERT INTO `logs` VALUES (1,0,0,0,'AH_START','Start ActionHandler','2018-04-22 07:25:54.9264'),(2,0,0,0,'D_START','/devices server listening on port 3001','2018-04-22 07:25:56.3564');
/*!40000 ALTER TABLE `logs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `stats`
--

DROP TABLE IF EXISTS `stats`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `stats` (
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `type` char(25) COLLATE utf8_unicode_ci NOT NULL COMMENT 'save a code like TEMPERATURE|HUMIDITY',
  `value` decimal(7,3) DEFAULT NULL,
  `area_id` int(11) unsigned NOT NULL,
  `device_id` int(11) unsigned NOT NULL,
  `ext_data` text COLLATE utf8_unicode_ci COMMENT 'save more settings here as s',
  `status` char(25) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT 'ACTIVE|INACTIVE|DELETED'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `stats`
--

LOCK TABLES `stats` WRITE;
/*!40000 ALTER TABLE `stats` DISABLE KEYS */;
/*!40000 ALTER TABLE `stats` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-04-22 11:12:10
