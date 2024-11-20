-- MySQL dump 10.13  Distrib 8.0.20, for macos10.15 (x86_64)
--
-- Host: localhost    Database: asm3_prj
-- ------------------------------------------------------
-- Server version	8.0.20

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `cart_item`
--

DROP TABLE IF EXISTS `cart_item`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cart_item` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) NOT NULL,
  `order_id` bigint DEFAULT NULL,
  `quantity` int DEFAULT NULL,
  `size_id` bigint DEFAULT NULL,
  `updated_at` datetime(6) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK5t7djy82h9urce3f5ce7p3485` (`size_id`),
  KEY `FK3mu9lcrqocn2rdcm6xhbqrg3b` (`order_id`),
  CONSTRAINT `FK3mu9lcrqocn2rdcm6xhbqrg3b` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`),
  CONSTRAINT `FK5t7djy82h9urce3f5ce7p3485` FOREIGN KEY (`size_id`) REFERENCES `product_size` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cart_item`
--

LOCK TABLES `cart_item` WRITE;
/*!40000 ALTER TABLE `cart_item` DISABLE KEYS */;
INSERT INTO `cart_item` VALUES (9,'2024-11-15 23:22:56.536465',6,1,18,'2024-11-15 23:22:56.536486');
/*!40000 ALTER TABLE `cart_item` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `comments`
--

DROP TABLE IF EXISTS `comments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comments` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) DEFAULT NULL,
  `product_id` bigint NOT NULL,
  `rate` int NOT NULL,
  `text` text NOT NULL,
  `user_id` bigint NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comments`
--

LOCK TABLES `comments` WRITE;
/*!40000 ALTER TABLE `comments` DISABLE KEYS */;
INSERT INTO `comments` VALUES (1,'2024-11-18 15:42:25.224834',1,4,'Great!',5),(2,'2024-11-18 15:43:43.834865',1,4,'Great',5);
/*!40000 ALTER TABLE `comments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `consignee` varchar(255) DEFAULT NULL,
  `consignee_phone` varchar(255) DEFAULT NULL,
  `created_at` datetime(6) NOT NULL,
  `delivery_address` varchar(255) DEFAULT NULL,
  `delivery_status` varchar(255) DEFAULT NULL,
  `payment_method` varchar(255) DEFAULT NULL,
  `payment_status` varchar(255) DEFAULT NULL,
  `sent_mail` bit(1) DEFAULT NULL,
  `total_amount` bigint DEFAULT NULL,
  `updated_at` datetime(6) NOT NULL,
  `user_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FKel9kyl84ego2otj2accfd8mr7` (`user_id`),
  CONSTRAINT `FKel9kyl84ego2otj2accfd8mr7` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES (5,'ASM3','0911111111','2024-11-15 23:17:29.153470','123123','CHO_GIAO_HANG','COD','CHUA_THANH_TOAN',_binary '\0',200000,'2024-11-16 19:58:21.235737',5),(6,'ASM3_1','0911111112','2024-11-15 23:22:56.532994','321 Nguyen Thi Thap','CHUA_XET_DUYET','COD','DA_HUY_BO',_binary '\0',1390000,'2024-11-16 23:39:38.688807',5);
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product`
--

DROP TABLE IF EXISTS `product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) NOT NULL,
  `description` varchar(500) DEFAULT NULL,
  `is_delete` bit(1) NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `price` bigint DEFAULT NULL,
  `status` varchar(50) DEFAULT NULL,
  `updated_at` datetime(6) NOT NULL,
  `image_path` varchar(100) DEFAULT NULL,
  `brand` enum('ADIDAS','NIKE','PUMA','REEBOK','UNDER_ARMOUR') DEFAULT NULL,
  `category` tinyint DEFAULT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `product_chk_1` CHECK ((`category` between 0 and 1))
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product`
--

LOCK TABLES `product` WRITE;
/*!40000 ALTER TABLE `product` DISABLE KEYS */;
INSERT INTO `product` VALUES (1,'2024-10-31 17:40:00.728000','<p><span style=\"color: rgb(156, 163, 175);\">Giày nay xin lam</span></p>',_binary '\0','Nike Air Max One',200000,'unavailable','2024-11-20 16:17:18.946736','/20241031174000_PC.png','NIKE',0),(4,'2024-11-06 13:57:01.899755','<p><span style=\"color: rgb(156, 163, 175);\">Giày cho đẳng cấp</span></p>',_binary '\0','Adidas All Star 1',1899000,'available','2024-11-20 09:27:57.482057','/20241106135701_800x800.png','ADIDAS',0),(5,'2024-11-06 14:01:01.038041','<p><span style=\"color: rgb(156, 163, 175);\">Giày cho đẳng cấp 1</span></p>',_binary '\0','Nike AirForce 1',1390000,'available','2024-11-07 16:37:22.215861','/20241106140101_6ee0be7a-e1ba-48ff-bcd2-15cdbaf6994a.jpeg','NIKE',0),(6,'2024-11-06 14:05:50.108396','<p><span style=\"color: rgb(156, 163, 175);\">Giày cho đẳng cấp 10</span></p>',_binary '\0','Nike AirForce 2',1990000,'available','2024-11-20 09:54:12.004362','/20241106140550_2023-01-10 14_24_54.635023.png','NIKE',0),(7,'2024-11-20 09:55:37.118083','<p><span style=\"color: rgb(156, 163, 175);\">Giày cho đẳng cấp</span></p>',_binary '\0','Nike AirMax 1',3100000,'available','2024-11-20 09:55:37.118101','/20241120095537_2023-01-10 14_24_54.635023.png','ADIDAS',0);
/*!40000 ALTER TABLE `product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_color`
--

DROP TABLE IF EXISTS `product_color`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_color` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `color` varchar(255) DEFAULT NULL,
  `created_at` datetime(6) NOT NULL,
  `product_id` bigint DEFAULT NULL,
  `updated_at` datetime(6) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_color`
--

LOCK TABLES `product_color` WRITE;
/*!40000 ALTER TABLE `product_color` DISABLE KEYS */;
/*!40000 ALTER TABLE `product_color` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_image`
--

DROP TABLE IF EXISTS `product_image`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_image` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) NOT NULL,
  `data` tinyblob,
  `is_primary` bit(1) NOT NULL,
  `path` varchar(500) DEFAULT NULL,
  `product_id` bigint DEFAULT NULL,
  `size` int DEFAULT NULL,
  `updated_at` datetime(6) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_image`
--

LOCK TABLES `product_image` WRITE;
/*!40000 ALTER TABLE `product_image` DISABLE KEYS */;
/*!40000 ALTER TABLE `product_image` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_size`
--

DROP TABLE IF EXISTS `product_size`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_size` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) NOT NULL,
  `product_id` bigint DEFAULT NULL,
  `quantity` int DEFAULT NULL,
  `size` int DEFAULT NULL,
  `updated_at` datetime(6) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK8i3jm2ctt0lsyeik2wt76yvv0` (`product_id`),
  CONSTRAINT `FK8i3jm2ctt0lsyeik2wt76yvv0` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_size`
--

LOCK TABLES `product_size` WRITE;
/*!40000 ALTER TABLE `product_size` DISABLE KEYS */;
INSERT INTO `product_size` VALUES (9,'2024-11-06 13:57:01.929505',4,3,38,'2024-11-06 13:57:01.929541'),(10,'2024-11-06 13:57:01.932601',4,4,39,'2024-11-06 13:57:01.932618'),(11,'2024-11-06 13:57:01.934216',4,1,40,'2024-11-06 13:57:01.934235'),(12,'2024-11-06 13:57:01.936472',4,5,41,'2024-11-06 13:57:01.936496'),(13,'2024-11-06 13:57:01.937861',4,5,42,'2024-11-06 13:57:01.937879'),(14,'2024-11-06 14:01:01.049229',5,1,38,'2024-11-06 14:01:01.049270'),(15,'2024-11-06 14:01:01.052195',5,1,39,'2024-11-06 14:01:01.052219'),(16,'2024-11-06 14:01:01.054396',5,2,40,'2024-11-06 14:01:01.054422'),(17,'2024-11-06 14:01:01.056830',5,2,41,'2024-11-06 14:01:01.056853'),(18,'2024-11-06 14:01:01.058431',5,5,42,'2024-11-06 14:01:01.058448'),(19,'2024-11-06 14:05:50.112782',6,1,38,'2024-11-06 14:05:50.112822'),(20,'2024-11-06 14:05:50.114130',6,2,39,'2024-11-06 14:05:50.114145'),(21,'2024-11-06 14:05:50.116423',6,2,40,'2024-11-06 14:05:50.116439'),(22,'2024-11-06 14:05:50.117840',6,4,42,'2024-11-06 14:05:50.117855'),(23,'2024-11-07 14:32:16.336696',1,3,38,'2024-11-07 14:32:16.336734'),(24,'2024-11-07 14:32:16.353482',1,1,39,'2024-11-07 14:32:16.353504'),(25,'2024-11-07 14:32:16.355702',1,2,40,'2024-11-07 14:32:16.355720'),(26,'2024-11-07 14:32:16.357197',1,1,42,'2024-11-07 14:32:16.357220'),(27,'2024-11-20 09:55:37.121628',7,1,38,'2024-11-20 09:55:37.121642'),(28,'2024-11-20 09:55:37.128411',7,1,39,'2024-11-20 09:55:37.128425'),(29,'2024-11-20 09:55:37.129708',7,2,40,'2024-11-20 09:55:37.129719'),(30,'2024-11-20 09:55:37.130871',7,3,41,'2024-11-20 09:55:37.130881');
/*!40000 ALTER TABLE `product_size` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `address` varchar(255) DEFAULT NULL,
  `created_at` datetime(6) NOT NULL,
  `date_of_birth` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `gender` bit(1) DEFAULT NULL,
  `image_data` varbinary(255) DEFAULT NULL,
  `image_path` varchar(255) DEFAULT NULL,
  `is_delete` bit(1) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `role` varchar(255) DEFAULT NULL,
  `updated_at` datetime(6) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,NULL,'2024-10-30 13:32:24.376423',NULL,'admin@example.com',NULL,NULL,NULL,NULL,'Admin','123123','1234567890','ADMIN','2024-10-30 13:32:24.376785'),(2,NULL,'2024-11-10 22:07:40.664871',NULL,'huynqFX18838@funix.edu.vn',NULL,NULL,NULL,NULL,'asm3-shop','123123',NULL,'CUSTOMER','2024-11-10 22:07:40.664942'),(5,NULL,'2024-11-10 22:33:48.884964',NULL,'anlene.vn@fonterra.com',NULL,NULL,NULL,NULL,'asm3-shop','123123',NULL,'CUSTOMER','2024-11-10 22:33:48.885013');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_wishlist`
--

DROP TABLE IF EXISTS `user_wishlist`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_wishlist` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) NOT NULL,
  `customer_id` bigint DEFAULT NULL,
  `product_id` bigint DEFAULT NULL,
  `updated_at` datetime(6) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_wishlist`
--

LOCK TABLES `user_wishlist` WRITE;
/*!40000 ALTER TABLE `user_wishlist` DISABLE KEYS */;
INSERT INTO `user_wishlist` VALUES (4,'2024-11-18 15:04:42.682497',5,5,'2024-11-18 15:04:42.682520'),(6,'2024-11-20 10:08:12.085877',2,4,'2024-11-20 10:08:12.085909');
/*!40000 ALTER TABLE `user_wishlist` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-11-20 16:27:33
