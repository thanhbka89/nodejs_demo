-- --------------------------------------------------------
-- Host:                         localhost
-- Server version:               5.7.24 - MySQL Community Server (GPL)
-- Server OS:                    Win64
-- HeidiSQL Version:             9.5.0.5332
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


-- Dumping database structure for cms_ps
DROP DATABASE IF EXISTS `cms_ps`;
CREATE DATABASE IF NOT EXISTS `cms_ps` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci */;
USE `cms_ps`;

-- Dumping structure for table cms_ps.cham_cong
DROP TABLE IF EXISTS `cham_cong`;
CREATE TABLE IF NOT EXISTS `cham_cong` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(10) unsigned NOT NULL DEFAULT '0',
  `time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `type` tinyint(1) NOT NULL DEFAULT '1' COMMENT '{1: checkin, 2: checkout}',
  `created_by` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Du lieu cham cong danh cho nhan vien';

-- Dumping data for table cms_ps.cham_cong: ~0 rows (approximately)
DELETE FROM `cham_cong`;
/*!40000 ALTER TABLE `cham_cong` DISABLE KEYS */;
/*!40000 ALTER TABLE `cham_cong` ENABLE KEYS */;

-- Dumping structure for table cms_ps.giai_dau
DROP TABLE IF EXISTS `giai_dau`;
CREATE TABLE IF NOT EXISTS `giai_dau` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(200) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `nha_tai_tro` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `start` datetime NOT NULL,
  `end` datetime NOT NULL,
  `created_by` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='To chuc cac giai dau';

-- Dumping data for table cms_ps.giai_dau: ~0 rows (approximately)
DELETE FROM `giai_dau`;
/*!40000 ALTER TABLE `giai_dau` DISABLE KEYS */;
/*!40000 ALTER TABLE `giai_dau` ENABLE KEYS */;

-- Dumping structure for table cms_ps.history_customer
DROP TABLE IF EXISTS `history_customer`;
CREATE TABLE IF NOT EXISTS `history_customer` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `id_user` int(10) unsigned NOT NULL DEFAULT '1' COMMENT 'Khoa ngoai voi bang users',
  `time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `created_by` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Lich su choi cua Khach hang';

-- Dumping data for table cms_ps.history_customer: ~0 rows (approximately)
DELETE FROM `history_customer`;
/*!40000 ALTER TABLE `history_customer` DISABLE KEYS */;
/*!40000 ALTER TABLE `history_customer` ENABLE KEYS */;

-- Dumping structure for table cms_ps.items
DROP TABLE IF EXISTS `items`;
CREATE TABLE IF NOT EXISTS `items` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `id_vendor` int(10) unsigned DEFAULT '0' COMMENT 'Ma dai ly',
  `code` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '0' COMMENT 'Ma san pham',
  `name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '0',
  `gia_nhap` int(10) unsigned NOT NULL DEFAULT '0' COMMENT 'Gia nhap hang',
  `gia_ban` int(10) unsigned NOT NULL DEFAULT '0',
  `category` enum('1','2','3') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '1' COMMENT '{1: Nuoc uong, 2: Do an, 3: Khac}',
  `status` enum('0','1') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '1' COMMENT '{1: dang ap dung, 0: ko ap dung}',
  `created_by` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_by` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Cac mat hang ban kem : nuoc, thuoc, do an';

-- Dumping data for table cms_ps.items: ~4 rows (approximately)
DELETE FROM `items`;
/*!40000 ALTER TABLE `items` DISABLE KEYS */;
INSERT INTO `items` (`id`, `id_vendor`, `code`, `name`, `gia_nhap`, `gia_ban`, `category`, `status`, `created_by`, `created_at`, `updated_by`, `updated_at`) VALUES
	(1, 0, 'COCA', 'CocaCola', 8000, 10000, '1', '1', 'thanhnm', '2019-06-16 14:16:30', 'thanhnm', '2019-06-16 14:16:30'),
	(2, 0, 'PEPSI', 'Bo huc', 10000, 15000, '1', '1', 'thanhnm', '2019-06-16 14:16:30', 'thanhnm', '2019-06-16 14:16:30'),
	(3, 0, 'PS4', 'Gio choi PS4', 10000, 20000, '3', '1', 'thanhnm', '2019-06-16 14:16:30', 'thanhnm', '2019-06-16 14:16:30'),
	(4, 0, 'XucXich', 'Xuc xich Duc viet', 10000, 20000, '2', '1', 'thanhnm', '2019-06-16 14:16:30', 'thanhnm', '2019-06-16 14:16:30');
/*!40000 ALTER TABLE `items` ENABLE KEYS */;

-- Dumping structure for table cms_ps.tai_san
DROP TABLE IF EXISTS `tai_san`;
CREATE TABLE IF NOT EXISTS `tai_san` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `code` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '0',
  `name` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '0',
  `so_luong` int(11) DEFAULT '0',
  `gia_nhap` int(11) DEFAULT '0',
  `noted` text COLLATE utf8mb4_unicode_ci,
  `created_by` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '0',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_by` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '0',
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Quan ly Tai san';

-- Dumping data for table cms_ps.tai_san: ~0 rows (approximately)
DELETE FROM `tai_san`;
/*!40000 ALTER TABLE `tai_san` DISABLE KEYS */;
/*!40000 ALTER TABLE `tai_san` ENABLE KEYS */;

-- Dumping structure for table cms_ps.transactions
DROP TABLE IF EXISTS `transactions`;
CREATE TABLE IF NOT EXISTS `transactions` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `id_ps` int(10) unsigned NOT NULL DEFAULT '1' COMMENT 'May PS nao',
  `id_user` int(10) unsigned NOT NULL DEFAULT '1' COMMENT 'Id Khach hang',
  `total_money` int(10) unsigned NOT NULL DEFAULT '1',
  `created_by` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_by` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Giao dich\r\n';

-- Dumping data for table cms_ps.transactions: ~0 rows (approximately)
DELETE FROM `transactions`;
/*!40000 ALTER TABLE `transactions` DISABLE KEYS */;
/*!40000 ALTER TABLE `transactions` ENABLE KEYS */;

-- Dumping structure for table cms_ps.trans_detail
DROP TABLE IF EXISTS `trans_detail`;
CREATE TABLE IF NOT EXISTS `trans_detail` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Chi tiet giao dich';

-- Dumping data for table cms_ps.trans_detail: ~0 rows (approximately)
DELETE FROM `trans_detail`;
/*!40000 ALTER TABLE `trans_detail` DISABLE KEYS */;
/*!40000 ALTER TABLE `trans_detail` ENABLE KEYS */;

-- Dumping structure for table cms_ps.users
DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `fullname` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `nickname` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `passwd` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `phone` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `address` varchar(200) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `role` tinyint(1) unsigned NOT NULL DEFAULT '2' COMMENT '{1: admin, 2: employee, 3: customer}',
  `type` tinyint(1) unsigned NOT NULL DEFAULT '5' COMMENT 'Danh hieu {1: kim cuong, 2: vang, 3: bac, 4: dong, 5: thuong}',
  `created_by` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_by` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table cms_ps.users: ~1 rows (approximately)
DELETE FROM `users`;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` (`id`, `username`, `fullname`, `nickname`, `passwd`, `phone`, `address`, `role`, `type`, `created_by`, `created_at`, `updated_by`, `updated_at`) VALUES
	(1, 'thanhnm', NULL, NULL, NULL, NULL, NULL, 1, 5, 'thanhnm', '2019-06-16 14:21:17', 'thanhnm', '2019-06-16 14:21:17');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;

-- Dumping structure for table cms_ps.vendors
DROP TABLE IF EXISTS `vendors`;
CREATE TABLE IF NOT EXISTS `vendors` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `address` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Thong tin dai ly';

-- Dumping data for table cms_ps.vendors: ~0 rows (approximately)
DELETE FROM `vendors`;
/*!40000 ALTER TABLE `vendors` DISABLE KEYS */;
/*!40000 ALTER TABLE `vendors` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
