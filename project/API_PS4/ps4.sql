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
CREATE DATABASE IF NOT EXISTS `cms_ps` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci */;
USE `cms_ps`;

-- Dumping structure for table cms_ps.cham_cong
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
/*!40000 ALTER TABLE `cham_cong` DISABLE KEYS */;
/*!40000 ALTER TABLE `cham_cong` ENABLE KEYS */;

-- Dumping structure for table cms_ps.giai_dau
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
/*!40000 ALTER TABLE `giai_dau` DISABLE KEYS */;
/*!40000 ALTER TABLE `giai_dau` ENABLE KEYS */;

-- Dumping structure for table cms_ps.history_customer
CREATE TABLE IF NOT EXISTS `history_customer` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `id_user` int(10) unsigned NOT NULL DEFAULT '1' COMMENT 'Khoa ngoai voi bang users',
  `time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `created_by` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Lich su choi cua Khach hang';

-- Dumping data for table cms_ps.history_customer: ~0 rows (approximately)
/*!40000 ALTER TABLE `history_customer` DISABLE KEYS */;
/*!40000 ALTER TABLE `history_customer` ENABLE KEYS */;

-- Dumping structure for table cms_ps.items
CREATE TABLE IF NOT EXISTS `items` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `id_vendor` int(10) unsigned DEFAULT '0' COMMENT 'Ma dai ly',
  `code` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '0' COMMENT 'Ma san pham',
  `name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '0',
  `gia_nhap` int(10) unsigned NOT NULL DEFAULT '0' COMMENT 'Gia nhap hang',
  `gia_ban` int(10) unsigned NOT NULL DEFAULT '0',
  `category` tinyint(2) unsigned NOT NULL DEFAULT '1' COMMENT '{1: Nuoc uong, 2: Do an, 3: PS, 4: Khac}',
  `status` tinyint(2) unsigned NOT NULL DEFAULT '1' COMMENT '{1: dang ap dung, 0: ko ap dung}',
  `created_by` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_by` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Cac mat hang ban kem : nuoc, thuoc, do an';

-- Dumping data for table cms_ps.items: ~11 rows (approximately)
/*!40000 ALTER TABLE `items` DISABLE KEYS */;
REPLACE INTO `items` (`id`, `id_vendor`, `code`, `name`, `gia_nhap`, `gia_ban`, `category`, `status`, `created_by`, `created_at`, `updated_by`, `updated_at`) VALUES
	(1, 0, 'COCA', 'CocaCola', 8000, 10000, 1, 1, 'thanhnm', '2019-06-16 14:16:30', 'thanhnm', '2019-06-16 14:16:30'),
	(2, 0, 'REDBULL', 'Bo Huc', 10000, 15000, 1, 1, 'SYSTEM', '2019-06-16 14:16:30', 'SYSTEM', '2019-07-01 20:39:26'),
	(3, 0, 'PS4', 'Gio choi PS4', 10000, 20000, 3, 1, 'thanhnm', '2019-06-16 14:16:30', 'thanhnm', '2019-06-16 14:16:30'),
	(4, 0, 'XucXich', 'Xuc xich Duc viet', 10000, 20000, 2, 0, 'thanhnm', '2019-06-16 14:16:30', 'thanhnm', '2019-06-16 14:16:30'),
	(5, 0, 'DULICH', 'Thuoc la Du Lich', 8000, 10000, 4, 1, 'SYSTEM', '2019-06-22 17:03:59', 'SYSTEM', '2019-07-01 20:40:05'),
	(7, 0, 'VINA', 'Thuoc la Vina', 20000, 30000, 4, 1, 'SYSTEM', '2019-06-22 17:40:46', 'SYSTEM', '2019-07-01 20:39:11'),
	(8, 0, 'LAVIE', 'Nuoc loc Lavie', 4000, 8000, 1, 1, 'SYSTEM', '2019-07-01 20:40:55', 'SYSTEM', '2019-07-01 20:40:56'),
	(9, 0, 'LATTE', 'Nuoc ngot Latte', 7000, 10000, 1, 1, 'SYSTEM', '2019-07-01 20:41:23', 'SYSTEM', '2019-07-01 20:41:23'),
	(10, 0, 'CHANH', 'Nuoc chanh muoi', 6000, 10000, 1, 1, 'SYSTEM', '2019-07-01 20:42:49', 'SYSTEM', '2019-07-01 20:42:50'),
	(11, 0, 'RONG', 'Nuoc ngot rong do', 7000, 10000, 1, 1, 'SYSTEM', '2019-07-01 20:43:16', 'SYSTEM', '2019-07-01 20:43:16'),
	(12, 0, 'PEPSI', 'Pepsi', 7000, 10000, 1, 1, 'SYSTEM', '2019-07-01 20:44:05', 'SYSTEM', '2019-07-01 20:44:05');
/*!40000 ALTER TABLE `items` ENABLE KEYS */;

-- Dumping structure for table cms_ps.setting
CREATE TABLE IF NOT EXISTS `setting` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(200) COLLATE utf8mb4_unicode_ci NOT NULL,
  `option` json NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Bang cau hinh';

-- Dumping data for table cms_ps.setting: ~0 rows (approximately)
/*!40000 ALTER TABLE `setting` DISABLE KEYS */;
/*!40000 ALTER TABLE `setting` ENABLE KEYS */;

-- Dumping structure for table cms_ps.tai_san
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
/*!40000 ALTER TABLE `tai_san` DISABLE KEYS */;
/*!40000 ALTER TABLE `tai_san` ENABLE KEYS */;

-- Dumping structure for table cms_ps.transactions
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
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Giao dich\r\n';

-- Dumping data for table cms_ps.transactions: ~20 rows (approximately)
/*!40000 ALTER TABLE `transactions` DISABLE KEYS */;
REPLACE INTO `transactions` (`id`, `id_ps`, `id_user`, `total_money`, `created_by`, `created_at`, `updated_by`, `updated_at`) VALUES
	(1, 1, 1, 30000, 'SYSTEM', '2019-06-24 20:29:09', 'SYSTEM', '2019-06-24 21:14:52'),
	(2, 2, 4, 20000, 'SYSTEM', '2019-06-24 20:29:39', 'SYSTEM', '2019-06-24 21:14:29'),
	(3, 2, 4, 45000, 'SYSTEM', '2019-06-24 21:08:05', 'SYSTEM', '2019-06-24 21:08:06'),
	(4, 3, 1, 50000, 'SYSTEM', '2019-06-24 21:08:54', 'SYSTEM', '2019-06-24 21:08:55'),
	(5, 4, 1, 15000, 'SYSTEM', '2019-06-24 21:09:40', 'SYSTEM', '2019-06-24 21:09:41'),
	(6, 4, 3, 25000, 'SYSTEM', '2019-06-24 21:10:07', 'SYSTEM', '2019-06-24 21:10:07'),
	(8, 4, 2, 55000, 'SYSTEM', '2019-06-24 21:10:15', 'SYSTEM', '2019-06-24 21:10:15'),
	(9, 5, 2, 105000, 'SYSTEM', '2019-06-24 21:10:20', 'SYSTEM', '2019-06-24 21:10:21'),
	(10, 5, 2, 75000, 'SYSTEM', '2019-06-24 21:10:35', 'SYSTEM', '2019-06-24 21:10:35'),
	(11, 5, 1, 85000, 'SYSTEM', '2019-06-24 21:10:38', 'SYSTEM', '2019-06-24 21:10:38'),
	(12, 5, 1, 95000, 'SYSTEM', '2019-06-24 21:10:41', 'SYSTEM', '2019-06-24 21:10:41'),
	(13, 1, 0, 25000, 'SYSTEM', '2019-07-03 17:01:45', 'SYSTEM', '2019-07-03 17:01:46'),
	(14, 1, 0, 0, 'SYSTEM', '2019-07-03 17:03:30', 'SYSTEM', '2019-07-03 17:03:30'),
	(15, 1, 0, 0, 'SYSTEM', '2019-07-03 17:08:22', 'SYSTEM', '2019-07-03 17:08:23'),
	(16, 1, 0, 15000, 'SYSTEM', '2019-07-03 17:08:55', 'SYSTEM', '2019-07-03 17:08:55'),
	(17, 1, 0, 0, 'SYSTEM', '2019-07-03 17:16:02', 'SYSTEM', '2019-07-03 17:16:03'),
	(18, 1, 0, 20000, 'SYSTEM', '2019-07-03 17:22:20', 'SYSTEM', '2019-07-03 17:22:20'),
	(19, 1, 0, 50000, 'SYSTEM', '2019-07-03 17:26:18', 'SYSTEM', '2019-07-03 17:26:19'),
	(20, 1, 0, 70000, 'SYSTEM', '2019-07-03 17:28:45', 'SYSTEM', '2019-07-03 17:28:46'),
	(21, 1, 0, 50400, 'SYSTEM', '2019-07-03 17:35:00', 'SYSTEM', '2019-07-03 17:35:01');
/*!40000 ALTER TABLE `transactions` ENABLE KEYS */;

-- Dumping structure for table cms_ps.trans_detail
CREATE TABLE IF NOT EXISTS `trans_detail` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `id_trans` int(10) unsigned NOT NULL,
  `id_item` int(10) unsigned NOT NULL,
  `quantity` varchar(10) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '0',
  `start` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Chi tiet giao dich';

-- Dumping data for table cms_ps.trans_detail: ~9 rows (approximately)
/*!40000 ALTER TABLE `trans_detail` DISABLE KEYS */;
REPLACE INTO `trans_detail` (`id`, `id_trans`, `id_item`, `quantity`, `start`) VALUES
	(1, 1, 1, '0', '2019-07-03 18:04:18'),
	(2, 1, 2, '0', '2019-07-03 18:04:18'),
	(3, 1, 5, '0', '2019-07-03 18:04:18'),
	(4, 20, 1, '1', '2019-07-03 18:04:18'),
	(5, 20, 7, '2', '2019-07-03 18:04:18'),
	(6, 21, 1, '1', '2019-07-03 18:04:18'),
	(7, 21, 2, '2', '2019-07-03 18:04:18'),
	(8, 21, 5, '1', '2019-07-03 18:04:18'),
	(9, 21, 3, '0.02', '2019-07-03 18:04:18');
/*!40000 ALTER TABLE `trans_detail` ENABLE KEYS */;

-- Dumping structure for table cms_ps.users
CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `fullname` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `nickname` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `passwd` varchar(200) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `phone` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `address` varchar(200) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `role` tinyint(1) unsigned NOT NULL DEFAULT '2' COMMENT '{1: admin, 2: employee, 3: customer}',
  `type` tinyint(1) unsigned NOT NULL DEFAULT '5' COMMENT 'Danh hieu {1: kim cuong, 2: vang, 3: bac, 4: dong, 5: thuong}',
  `created_by` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_by` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table cms_ps.users: ~5 rows (approximately)
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
REPLACE INTO `users` (`id`, `username`, `fullname`, `nickname`, `passwd`, `phone`, `address`, `role`, `type`, `created_by`, `created_at`, `updated_by`, `updated_at`) VALUES
	(1, 'thanhnm', NULL, NULL, '123456a@', NULL, NULL, 1, 5, 'thanhnm', '2019-06-16 14:21:17', 'thanhnm', '2019-06-16 14:21:17'),
	(2, 'thanhbka', NULL, NULL, '$2b$08$bY0d8RzwaS1SPdJsKSOTve3pnt2T0b3lncGW/WZh/cBXb/odyH7N2', NULL, NULL, 1, 5, 'SYSTEM', '2019-06-16 19:04:38', 'SYSTEM', '2019-06-16 19:04:38'),
	(9, 'thanhbka89', NULL, NULL, '$2b$08$a.103X0TBIFqUhZeKs15FeYa/VJSCVPGYoaI8ekNWkpifpYw8ZVAu', NULL, NULL, 2, 5, 'SYSTEM', '2019-06-20 20:43:24', 'SYSTEM', '2019-06-20 20:43:24'),
	(10, 'thanhnm90', NULL, NULL, '$2b$08$2J/vnHTpMKQdAnHUuLjJS.4.UrKlutjoqlg4IA.5wtwc4YxsDFucu', NULL, NULL, 2, 5, 'SYSTEM', '2019-06-21 23:06:20', 'SYSTEM', '2019-06-21 23:06:20'),
	(11, 'thanhnm1990', NULL, NULL, '$2b$08$tard1a3J6p8U9hgLJL0SfOSNQ1yfYXUmVZ21lAqvNFD1Da1spztum', NULL, NULL, 2, 5, 'SYSTEM', '2019-06-21 23:09:22', 'SYSTEM', '2019-06-21 23:09:22');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;

-- Dumping structure for table cms_ps.vendors
CREATE TABLE IF NOT EXISTS `vendors` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `address` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Thong tin dai ly';

-- Dumping data for table cms_ps.vendors: ~26 rows (approximately)
/*!40000 ALTER TABLE `vendors` DISABLE KEYS */;
REPLACE INTO `vendors` (`id`, `name`, `address`, `phone`) VALUES
	(1, 'SamSung', 'Bac Ninh', '0349617930'),
	(2, 'Iphone', 'Bac Ninh', '0349617930'),
	(3, 'VSmart', 'Bac Ninh', '0349617930'),
	(4, 'LG', 'Bac Ninh', '0349617930'),
	(5, 'Sony', 'Bac Ninh', '0349617930'),
	(6, 'HKBike', 'Bac Ninh', '0349617930'),
	(7, 'VinFast', 'Bac Ninh', '0349617930'),
	(8, 'Xiaomi', 'Bac Ninh', '0349617930'),
	(10, 'Bphone', 'Bac Ninh', '0349617930'),
	(12, 'Canon', 'Gia Lam, HN', '0349617930'),
	(13, 'Vietel', 'Gia Lam, HN', '0349617930'),
	(14, 'Mobifone', 'Gia Lam, HN', '0349617930'),
	(15, 'Vina', 'Gia Lam, HN', '0349617930'),
	(16, 'FPT', 'Gia Lam, HN', '0349617930'),
	(17, 'Nguyen Kim', 'Gia Lam, HN', '0349617930'),
	(18, 'Adayroi', 'Gia Lam, HN', '0349617930'),
	(19, 'Sendo', 'Gia Lam, HN', '0349617930'),
	(20, 'Tiki', 'Gia Lam, HN', '0349617930'),
	(21, 'Shopee', 'Gia Lam, HN', '0349617930'),
	(22, 'Lazada', 'Gia Lam, HN', '0349617930'),
	(23, 'Be', 'Gia Lam, HN', '0349617930'),
	(24, 'Grap', 'Gia Lam, HN', '0349617930'),
	(25, 'Uber', 'Gia Lam, HN', '0349617930'),
	(26, 'Go', 'Gia Lam, HN', '0349617930'),
	(27, 'TGDD', 'HN', '0987789'),
	(28, 'DMX', 'HN', '0987789789');
/*!40000 ALTER TABLE `vendors` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
