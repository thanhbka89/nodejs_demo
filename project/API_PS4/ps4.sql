-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               10.4.6-MariaDB - mariadb.org binary distribution
-- Server OS:                    Win64
-- HeidiSQL Version:             10.2.0.5599
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


-- Dumping database structure for cms_ps_dev
CREATE DATABASE IF NOT EXISTS `cms_ps_dev` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci */;
USE `cms_ps_dev`;

-- Dumping structure for table cms_ps_dev.cham_cong
CREATE TABLE IF NOT EXISTS `cham_cong` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(10) unsigned NOT NULL DEFAULT 0,
  `time` datetime NOT NULL DEFAULT current_timestamp(),
  `type` tinyint(1) NOT NULL DEFAULT 1 COMMENT '{1: checkin, 2: checkout}',
  `created_by` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Du lieu cham cong danh cho nhan vien';

-- Dumping data for table cms_ps_dev.cham_cong: ~0 rows (approximately)
DELETE FROM `cham_cong`;
/*!40000 ALTER TABLE `cham_cong` DISABLE KEYS */;
/*!40000 ALTER TABLE `cham_cong` ENABLE KEYS */;

-- Dumping structure for table cms_ps_dev.giai_dau
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

-- Dumping data for table cms_ps_dev.giai_dau: ~0 rows (approximately)
DELETE FROM `giai_dau`;
/*!40000 ALTER TABLE `giai_dau` DISABLE KEYS */;
/*!40000 ALTER TABLE `giai_dau` ENABLE KEYS */;

-- Dumping structure for table cms_ps_dev.history_customer
CREATE TABLE IF NOT EXISTS `history_customer` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `id_user` int(10) unsigned NOT NULL DEFAULT 1 COMMENT 'Khoa ngoai voi bang users',
  `time` datetime NOT NULL DEFAULT current_timestamp(),
  `created_by` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Lich su choi cua Khach hang';

-- Dumping data for table cms_ps_dev.history_customer: ~0 rows (approximately)
DELETE FROM `history_customer`;
/*!40000 ALTER TABLE `history_customer` DISABLE KEYS */;
/*!40000 ALTER TABLE `history_customer` ENABLE KEYS */;

-- Dumping structure for table cms_ps_dev.inventory
CREATE TABLE IF NOT EXISTS `inventory` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `id_vendor` int(10) unsigned DEFAULT 0 COMMENT 'Ma dai ly',
  `code` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'Ma san pham',
  `name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `gia_nhap` int(10) unsigned NOT NULL DEFAULT 0 COMMENT 'Gia nhap hang',
  `quantity` int(10) unsigned NOT NULL DEFAULT 1 COMMENT 'So luong',
  `category` tinyint(2) unsigned NOT NULL DEFAULT 1 COMMENT '{1: Nuoc uong, 2: Do an, 3: PS, 4: Khac}',
  `status` tinyint(1) unsigned NOT NULL DEFAULT 1 COMMENT '{1: dang ap dung, 0: ko ap dung}',
  `created_by` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_by` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `updated_at` datetime NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=DYNAMIC COMMENT='QL nhap kho, ton kho : nuoc, thuoc, do an';

-- Dumping data for table cms_ps_dev.inventory: ~5 rows (approximately)
DELETE FROM `inventory`;
/*!40000 ALTER TABLE `inventory` DISABLE KEYS */;
INSERT INTO `inventory` (`id`, `id_vendor`, `code`, `name`, `gia_nhap`, `quantity`, `category`, `status`, `created_by`, `created_at`, `updated_by`, `updated_at`) VALUES
	(18, 1, 'PEPSI', 'ABC', 120000, 24, 1, 1, 'thanhnm', '2019-07-08 20:14:25', 'thanhnm', '2019-07-09 20:46:52'),
	(19, 0, 'REDBULL', 'Nhap kho bo huc', 205000, 24, 1, 1, 'SYSTEM', '2019-07-09 20:47:44', 'SYSTEM', '2019-07-09 20:47:44'),
	(20, 0, 'REDBULL', 'nhap khi', 220000, 24, 1, 1, 'SYSTEM', '2019-07-09 21:42:47', 'SYSTEM', '2019-07-09 21:42:47'),
	(21, 0, 'CHANHMUOI', 'Nhap lo 6 chai', 40000, 6, 1, 1, 'SYSTEM', '2019-07-14 18:06:21', 'SYSTEM', '2019-07-14 18:06:21'),
	(22, 0, 'REDBESL', 'Nhap bo huc', 120000, 24, 1, 1, 'SYSTEM', '2019-07-25 21:07:14', 'thanhbka', '2019-07-25 21:07:14');
/*!40000 ALTER TABLE `inventory` ENABLE KEYS */;

-- Dumping structure for table cms_ps_dev.items
CREATE TABLE IF NOT EXISTS `items` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `id_vendor` int(10) unsigned DEFAULT 0 COMMENT 'Ma dai ly',
  `code` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '0' COMMENT 'Ma san pham',
  `name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '0',
  `gia_nhap` int(10) unsigned NOT NULL DEFAULT 0 COMMENT 'Gia nhap hang',
  `gia_ban` int(10) unsigned NOT NULL DEFAULT 0,
  `category` tinyint(2) unsigned NOT NULL DEFAULT 1 COMMENT '{1: Nuoc uong, 2: Do an, 3: PS, 4: Khac}',
  `status` tinyint(2) unsigned NOT NULL DEFAULT 1 COMMENT '{1: dang ap dung, 0: ko ap dung}',
  `created_by` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_by` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `updated_at` datetime NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Cac mat hang ban kem : nuoc, thuoc, do an';

-- Dumping data for table cms_ps_dev.items: ~14 rows (approximately)
DELETE FROM `items`;
/*!40000 ALTER TABLE `items` DISABLE KEYS */;
INSERT INTO `items` (`id`, `id_vendor`, `code`, `name`, `gia_nhap`, `gia_ban`, `category`, `status`, `created_by`, `created_at`, `updated_by`, `updated_at`) VALUES
	(1, 0, 'COCA', 'CocaCola', 8000, 10000, 1, 1, 'thanhnm', '2019-06-16 14:16:30', 'thanhnm', '2019-06-16 14:16:30'),
	(2, 0, 'REDBULL', 'Bo Huc', 10000, 15000, 1, 1, 'SYSTEM', '2019-06-16 14:16:30', 'SYSTEM', '2019-07-01 20:39:26'),
	(3, 0, 'PS4', 'Gio choi PS4', 5000, 20000, 3, 1, 'SYSTEM', '2019-06-16 14:16:30', 'SYSTEM', '2019-07-15 23:30:36'),
	(4, 0, 'REDBESL', 'Xuc xich Duc viet', 10000, 20000, 2, 0, 'SYSTEM', '2019-06-16 14:16:30', 'SYSTEM', '2019-07-07 22:34:17'),
	(5, 0, 'DULICH', 'Thuoc la Du Lich', 8000, 10000, 4, 1, 'SYSTEM', '2019-06-22 17:03:59', 'SYSTEM', '2019-07-01 20:40:05'),
	(7, 0, 'VINA', 'Thuoc la Vina', 20000, 30000, 4, 1, 'SYSTEM', '2019-06-22 17:40:46', 'SYSTEM', '2019-07-01 20:39:11'),
	(8, 0, 'LAVIE', 'Nuoc loc Lavie', 4000, 8000, 1, 1, 'SYSTEM', '2019-07-01 20:40:55', 'SYSTEM', '2019-07-01 20:40:56'),
	(10, 0, 'CHANH', 'Nuoc chanh muoi', 6000, 10000, 1, 1, 'SYSTEM', '2019-07-01 20:42:49', 'SYSTEM', '2019-07-01 20:42:50'),
	(11, 0, 'RONGDO', 'Nuoc ngot rong do', 7000, 10000, 1, 1, 'SYSTEM', '2019-07-01 20:43:16', 'SYSTEM', '2019-07-06 10:05:07'),
	(12, 0, 'PEPSI', 'Pepsi', 7000, 10000, 1, 0, 'SYSTEM', '2019-07-01 20:44:05', 'SYSTEM', '2019-07-26 21:51:01'),
	(13, 0, 'PS5', 'Giờ chơi PS5', 0, 25000, 3, 1, 'SYSTEM', '2019-07-06 10:05:42', 'SYSTEM', '2019-07-06 10:05:43'),
	(16, 0, 'PEPSI', 'Nuoc ngot Pepsi', 5000, 10000, 1, 1, 'SYSTEM', '2019-07-07 22:29:27', 'SYSTEM', '2019-07-07 22:34:42'),
	(17, 0, 'Latte', 'Nuoc ngot Latte', 7000, 10000, 1, 0, 'SYSTEM', '2019-07-07 22:36:00', 'SYSTEM', '2019-07-07 22:36:00'),
	(18, 0, '3SO', '3 số', 38000, 45000, 4, 1, 'SYSTEM', '2019-07-09 21:51:04', 'SYSTEM', '2019-07-09 21:51:04');
/*!40000 ALTER TABLE `items` ENABLE KEYS */;

-- Dumping structure for table cms_ps_dev.list_ps
CREATE TABLE IF NOT EXISTS `list_ps` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `code` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '0' COMMENT 'Ma san pham',
  `name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '0',
  `status` tinyint(2) unsigned NOT NULL DEFAULT 1 COMMENT '{1: dang ap dung, 0: ko ap dung}',
  `created_by` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_by` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `updated_at` datetime NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Danh sach may PS';

-- Dumping data for table cms_ps_dev.list_ps: ~7 rows (approximately)
DELETE FROM `list_ps`;
/*!40000 ALTER TABLE `list_ps` DISABLE KEYS */;
INSERT INTO `list_ps` (`id`, `code`, `name`, `status`, `created_by`, `created_at`, `updated_by`, `updated_at`) VALUES
	(1, 'PS4', '[PS4] Máy 1', 1, 'SYSTEM', '2019-07-20 20:41:17', 'thanhbka', '2019-07-26 21:48:35'),
	(2, 'PS5', 'Máy 2', 1, 'thanhnm', '2019-07-20 20:42:47', 'thanhbka', '2019-07-24 20:58:04'),
	(3, 'PS', '[PS3] Máy 1', 1, 'thanhnm', '2019-07-20 20:53:58', 'thanhbka', '2019-07-24 20:58:10'),
	(4, 'PS4', '[PS4] Máy 2', 1, 'thanhbka', '2019-07-24 20:02:05', 'thanhbka', '2019-07-24 20:02:05'),
	(5, 'PS4', '[PS4] Máy 3', 1, 'thanhbka', '2019-07-24 20:37:23', 'thanhbka', '2019-07-24 20:37:23'),
	(6, 'PS4', '[PS4] Máy 4', 1, 'thanhbka', '2019-07-24 20:37:36', 'thanhbka', '2019-07-24 20:37:36'),
	(7, 'PS4', '[PS4] Máy 5', 1, 'thanhbka', '2019-07-24 20:37:46', 'thanhbka', '2019-07-24 20:37:46');
/*!40000 ALTER TABLE `list_ps` ENABLE KEYS */;

-- Dumping structure for table cms_ps_dev.mastercode
CREATE TABLE IF NOT EXISTS `mastercode` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `code` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` tinyint(1) unsigned NOT NULL DEFAULT 0 COMMENT 'Trang thai {0: inactive, 1: active}',
  `category` tinyint(2) unsigned NOT NULL DEFAULT 1 COMMENT '{1: Nuoc uong, 2: Do an, 3: PS, 4: Khac}',
  `created_by` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='QL ma code';

-- Dumping data for table cms_ps_dev.mastercode: ~13 rows (approximately)
DELETE FROM `mastercode`;
/*!40000 ALTER TABLE `mastercode` DISABLE KEYS */;
INSERT INTO `mastercode` (`id`, `code`, `name`, `status`, `category`, `created_by`, `created_at`) VALUES
	(1, 'PS4', 'Gio choi PS4', 1, 3, 'ThanhNM', '2019-07-07 20:08:53'),
	(2, 'PS5', 'Gio choi PS5', 1, 3, 'ThanhNM', '2019-07-07 20:08:53'),
	(3, 'COCA', 'Coca Cola', 1, 1, 'ThanhBKA', '2019-07-07 20:09:52'),
	(4, 'PEPSI', 'Pepsi', 1, 1, 'ThanhBKA', '2019-07-07 20:09:52'),
	(5, 'REDBULL', 'Bò Húc', 1, 1, 'ThanhBKA', '2019-07-07 20:09:52'),
	(6, 'REDBESL', 'Bo Cung', 1, 1, 'ThanhBKA', '2019-07-07 20:09:52'),
	(7, 'PS3', 'Gio choi PS3', 0, 1, 'SYSTEM', '2019-07-07 20:16:29'),
	(8, 'PS2', 'Gio choi PS2', 0, 1, 'thanhnm', '2019-07-07 20:17:28'),
	(9, 'Lavie', 'Nuoc loc Lavie', 1, 1, 'thanhnm', '2019-07-07 20:19:31'),
	(10, 'Latte', 'Nuoc trai cay Latte', 1, 1, 'SYSTEM', '2019-07-07 20:20:35'),
	(11, '3SO', 'Thuoc lá 3 số', 1, 1, 'SYSTEM', '2019-07-08 21:38:16'),
	(12, 'CHANHMUOI', 'Nuoc chanh muoi', 1, 1, 'SYSTEM', '2019-07-14 18:05:51'),
	(13, 'PS', 'Tro choi PS', 1, 3, 'thanhnm', '2019-07-20 20:33:18');
/*!40000 ALTER TABLE `mastercode` ENABLE KEYS */;

-- Dumping structure for table cms_ps_dev.points
CREATE TABLE IF NOT EXISTS `points` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `id_trans` int(10) unsigned NOT NULL DEFAULT 0,
  `id_user` int(10) unsigned NOT NULL DEFAULT 0,
  `point` int(10) unsigned NOT NULL DEFAULT 0 COMMENT 'So phut tich duoc',
  `type` tinyint(1) unsigned NOT NULL DEFAULT 1 COMMENT '{1: tich, 2: tieu}',
  `created_by` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Quan ly tich, tieu diem cho khach hang';

-- Dumping data for table cms_ps_dev.points: ~1 rows (approximately)
DELETE FROM `points`;
/*!40000 ALTER TABLE `points` DISABLE KEYS */;
INSERT INTO `points` (`id`, `id_trans`, `id_user`, `point`, `type`, `created_by`, `created_at`) VALUES
	(1, 26, 2, 3, 1, 'thanhnm', '2019-07-27 18:46:53');
/*!40000 ALTER TABLE `points` ENABLE KEYS */;

-- Dumping structure for table cms_ps_dev.setting
CREATE TABLE IF NOT EXISTS `setting` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(200) COLLATE utf8mb4_unicode_ci NOT NULL,
  `option` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`option`)),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Bang cau hinh';

-- Dumping data for table cms_ps_dev.setting: ~0 rows (approximately)
DELETE FROM `setting`;
/*!40000 ALTER TABLE `setting` DISABLE KEYS */;
/*!40000 ALTER TABLE `setting` ENABLE KEYS */;

-- Dumping structure for table cms_ps_dev.tai_san
CREATE TABLE IF NOT EXISTS `tai_san` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `code` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '0',
  `name` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '0',
  `so_luong` int(11) DEFAULT 0,
  `gia_nhap` int(11) DEFAULT 0,
  `noted` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_by` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '0',
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_by` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '0',
  `updated_at` datetime NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Quan ly Tai san';

-- Dumping data for table cms_ps_dev.tai_san: ~0 rows (approximately)
DELETE FROM `tai_san`;
/*!40000 ALTER TABLE `tai_san` DISABLE KEYS */;
/*!40000 ALTER TABLE `tai_san` ENABLE KEYS */;

-- Dumping structure for table cms_ps_dev.transactions
CREATE TABLE IF NOT EXISTS `transactions` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `id_ps` int(10) unsigned NOT NULL DEFAULT 1 COMMENT 'May PS nao',
  `id_user` int(10) unsigned NOT NULL DEFAULT 1 COMMENT 'Id Khach hang',
  `total_money` int(10) unsigned NOT NULL DEFAULT 0,
  `diem_tich` int(10) unsigned NOT NULL DEFAULT 0,
  `diem_tieu` int(10) unsigned NOT NULL DEFAULT 0,
  `created_by` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_by` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `updated_at` datetime NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=51 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Giao dich\r\n';

-- Dumping data for table cms_ps_dev.transactions: ~49 rows (approximately)
DELETE FROM `transactions`;
/*!40000 ALTER TABLE `transactions` DISABLE KEYS */;
INSERT INTO `transactions` (`id`, `id_ps`, `id_user`, `total_money`, `diem_tich`, `diem_tieu`, `created_by`, `created_at`, `updated_by`, `updated_at`) VALUES
	(1, 1, 0, 20600, 0, 0, 'SYSTEM', '2019-07-05 18:08:21', 'SYSTEM', '2019-07-05 18:08:21'),
	(2, 1, 0, 30400, 0, 0, 'SYSTEM', '2019-07-05 18:16:09', 'SYSTEM', '2019-07-05 18:16:10'),
	(3, 1, 0, 47000, 0, 0, 'SYSTEM', '2019-07-15 23:47:10', 'SYSTEM', '2019-07-15 23:47:09'),
	(4, 1, 0, 2400, 0, 0, 'SYSTEM', '2019-07-20 16:32:06', 'SYSTEM', '2019-07-20 16:32:06'),
	(5, 1, 0, 146600, 0, 0, 'SYSTEM', '2019-07-20 23:52:09', 'SYSTEM', '2019-07-20 23:52:09'),
	(6, 3, 0, 8400, 0, 0, 'SYSTEM', '2019-07-20 23:52:44', 'SYSTEM', '2019-07-20 23:52:44'),
	(7, 1, 0, 1993601, 0, 0, 'SYSTEM', '2019-07-24 20:05:54', 'thanhbka', '2019-07-24 20:05:54'),
	(8, 1, 0, 1994400, 0, 0, 'SYSTEM', '2019-07-24 20:07:41', 'thanhbka', '2019-07-24 20:07:41'),
	(9, 1, 0, 2036400, 0, 0, 'SYSTEM', '2019-07-24 20:36:08', 'thanhbka', '2019-07-24 20:36:08'),
	(10, 1, 0, 76600, 0, 0, 'SYSTEM', '2019-07-24 21:25:29', 'thanhbka', '2019-07-24 21:25:29'),
	(11, 4, 0, 34600, 0, 0, 'SYSTEM', '2019-07-24 21:39:20', 'thanhbka', '2019-07-24 21:39:20'),
	(12, 7, 0, 13401, 0, 0, 'SYSTEM', '2019-07-24 21:39:31', 'thanhbka', '2019-07-24 21:39:31'),
	(13, 5, 0, 50000, 0, 0, 'SYSTEM', '2019-07-24 22:52:18', 'thanhbka', '2019-07-24 22:52:18'),
	(14, 7, 0, 87400, 0, 0, 'SYSTEM', '2019-07-25 00:36:20', 'thanhbka', '2019-07-25 00:36:20'),
	(15, 1, 0, 15400, 0, 0, 'thanhbka', '2019-07-25 20:51:48', 'thanhbka', '2019-07-25 20:51:48'),
	(16, 7, 0, 24000, 0, 0, 'thanhbka', '2019-07-25 21:02:29', 'thanhbka', '2019-07-25 21:02:29'),
	(17, 1, 0, 23400, 0, 0, 'thai', '2019-07-25 22:11:04', 'thai', '2019-07-25 22:11:04'),
	(18, 4, 0, 99400, 0, 0, 'thai', '2019-07-25 22:14:47', 'thai', '2019-07-25 22:14:47'),
	(19, 5, 26, 45000, 0, 0, 'thanhbka', '2019-07-26 00:03:12', 'thanhbka', '2019-07-26 00:03:12'),
	(20, 7, 0, 35000, 0, 0, 'thanhbka', '2019-07-26 00:12:07', 'thanhbka', '2019-07-26 00:12:07'),
	(21, 6, 1, 53000, 0, 0, 'thai', '2019-07-26 00:34:40', 'thai', '2019-07-26 00:34:40'),
	(22, 7, 1, 55400, 0, 0, 'thanhbka', '2019-07-26 21:55:11', 'thanhbka', '2019-07-26 21:55:11'),
	(23, 7, 1, 1309000, 0, 0, 'thanhnm', '2019-07-25 01:00:30', 'thanhnm', '2019-07-27 18:28:19'),
	(24, 6, 1, 1339000, 0, 0, 'thanhnm', '2019-07-25 00:59:51', 'thanhnm', '2019-07-27 18:33:49'),
	(25, 1, 10, 27400, 0, 0, 'thanhnm', '2019-07-27 17:50:29', 'thanhnm', '2019-07-27 18:43:25'),
	(26, 4, 2, 48600, 0, 0, 'thanhnm', '2019-07-27 17:50:28', 'thanhnm', '2019-07-27 18:46:52'),
	(27, 7, 1, 21000, 1, 0, 'thanhbka', '2019-08-05 20:45:59', 'thanhbka', '2019-08-05 21:04:52'),
	(28, 6, 1, 8000, 2, 0, 'thanhbka', '2019-08-05 20:46:00', 'thanhbka', '2019-08-05 21:10:13'),
	(29, 5, 1, 8400, 2, 0, 'thanhbka', '2019-08-05 20:46:02', 'thanhbka', '2019-08-05 21:11:35'),
	(30, 1, 1, 8600, 2, 0, 'thanhbka', '2019-08-05 20:46:01', 'thanhbka', '2019-08-05 21:13:10'),
	(31, 4, 0, 9000, 2, 0, 'thanhbka', '2019-08-05 20:46:01', 'thanhbka', '2019-08-05 21:13:46'),
	(32, 7, 1, 1600, 1, 0, 'thanhbka', '2019-08-05 21:10:03', 'thanhbka', '2019-08-05 21:16:09'),
	(33, 1, 23, 15000, 0, 0, 'test', '2019-08-06 22:30:52', 'test', '2019-08-06 22:35:04'),
	(34, 1, 1, 23400, 4, 0, 'thanhbka', '2019-08-08 23:30:07', 'thanhbka', '2019-08-09 00:40:52'),
	(35, 1, 1, 28400, 2, 0, 'thanhbka', '2019-08-09 21:25:15', 'thanhbka', '2019-08-09 21:51:20'),
	(36, 4, 0, 13400, 2, 0, 'thanhbka', '2019-08-09 21:25:16', 'thanhbka', '2019-08-09 22:06:06'),
	(37, 5, 1, 14400, 3, 0, 'thanhbka', '2019-08-09 21:25:17', 'thanhbka', '2019-08-09 22:08:53'),
	(38, 6, 1, 51400, 8, 0, 'thanhbka', '2019-08-09 21:47:39', 'thanhbka', '2019-08-10 00:22:15'),
	(39, 7, 1, 1000, 1, 0, 'thanhbka', '2019-08-10 00:22:36', 'thanhbka', '2019-08-10 00:26:06'),
	(40, 6, 2, 11000, 2, 0, 'thanhbka', '2019-08-09 23:52:40', 'thanhbka', '2019-08-10 00:26:18'),
	(41, 4, 1, 11000, 2, 0, 'thanhbka', '2019-08-09 23:52:40', 'thanhbka', '2019-08-10 00:26:32'),
	(42, 5, 2, 40400, 7, 0, 'thanhbka', '2019-08-12 20:28:18', 'thanhbka', '2019-08-12 22:29:32'),
	(43, 4, 11, 41600, 7, 0, 'thanhbka', '2019-08-12 20:28:19', 'thanhbka', '2019-08-12 22:33:29'),
	(44, 4, 1, 31400, 4, 0, 'test', '2019-08-14 20:19:26', 'test', '2019-08-14 21:24:27'),
	(45, 7, 1, 21600, 4, 0, 'test', '2019-08-14 20:19:27', 'test', '2019-08-14 21:24:36'),
	(47, 1, 1, 26400, 2, 0, 'thanhnm', '2019-08-16 19:34:10', 'thanhnm', '2019-08-16 20:08:50'),
	(48, 1, 1, 16600, 1, 0, 'thanhnm', '2019-08-17 14:13:29', 'thanhnm', '2019-08-17 14:19:01'),
	(49, 4, 1, 80000, 8, 15, 'thanhnm', '2019-08-17 14:13:30', 'thanhnm', '2019-08-17 16:59:15'),
	(50, 7, 1, 63000, 8, 20, 'thanhnm', '2019-08-17 14:13:31', 'thanhnm', '2019-08-17 17:13:49');
/*!40000 ALTER TABLE `transactions` ENABLE KEYS */;

-- Dumping structure for table cms_ps_dev.trans_detail
CREATE TABLE IF NOT EXISTS `trans_detail` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `id_trans` int(10) unsigned NOT NULL,
  `id_item` int(10) unsigned NOT NULL,
  `code_item` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `quantity` varchar(10) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '0',
  `price` varchar(10) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '0',
  `discount` tinyint(3) unsigned NOT NULL DEFAULT 0 COMMENT 'Ty le % giam gia cho khach VIP',
  `start` datetime NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=87 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Chi tiet giao dich';

-- Dumping data for table cms_ps_dev.trans_detail: ~86 rows (approximately)
DELETE FROM `trans_detail`;
/*!40000 ALTER TABLE `trans_detail` DISABLE KEYS */;
INSERT INTO `trans_detail` (`id`, `id_trans`, `id_item`, `code_item`, `quantity`, `price`, `discount`, `start`) VALUES
	(1, 1, 3, '', '0.03', '0', 0, '2019-07-05 18:06:04'),
	(2, 2, 1, '', '2', '0', 0, '2019-07-05 18:14:23'),
	(3, 2, 5, '', '1', '0', 0, '2019-07-05 18:14:23'),
	(4, 2, 3, '', '0.02', '0', 0, '2019-07-05 18:14:23'),
	(5, 3, 3, '', '2.35', '0', 0, '2019-07-15 21:23:38'),
	(6, 4, 3, '', '0.12', '0', 0, '2019-07-20 16:24:32'),
	(7, 5, 3, '', '7.33', '0', 0, '2019-07-20 16:31:54'),
	(8, 6, 3, '', '0.42', '0', 0, '2019-07-20 23:26:48'),
	(9, 7, 3, '', '99.68', '0', 0, '2019-07-20 16:24:33'),
	(10, 8, 3, '', '99.72', '0', 0, '2019-07-20 16:24:32'),
	(11, 9, 3, '', '101.82', '0', 0, '2019-07-20 14:46:45'),
	(12, 10, 18, '', '1', '0', 0, '2019-07-24 21:22:23'),
	(13, 10, 2, '', '1', '0', 0, '2019-07-24 21:22:23'),
	(14, 10, 8, '', '2', '0', 0, '2019-07-24 21:22:23'),
	(15, 10, 3, '', '0.03', '0', 0, '2019-07-24 21:22:23'),
	(16, 11, 8, '', '2', '0', 0, '2019-07-24 21:27:52'),
	(17, 11, 2, '', '1', '0', 0, '2019-07-24 21:27:52'),
	(18, 11, 3, '', '0.18', '0', 0, '2019-07-24 21:27:52'),
	(19, 12, 1, '', '1', '0', 0, '2019-07-24 21:28:43'),
	(20, 12, 3, '', '0.17', '0', 0, '2019-07-24 21:28:43'),
	(21, 13, 2, '', '1', '0', 0, '2019-07-24 21:36:26'),
	(22, 13, 5, '', '1', '0', 0, '2019-07-24 21:36:26'),
	(23, 13, 3, '', '1.25', '0', 0, '2019-07-24 21:36:26'),
	(24, 14, 2, '', '3', '0', 0, '2019-07-24 22:52:28'),
	(25, 14, 8, '', '1', '0', 0, '2019-07-24 22:52:28'),
	(26, 14, 3, '', '1.72', '0', 0, '2019-07-24 22:52:28'),
	(27, 15, 1, '', '1', '0', 0, '2019-07-25 20:35:12'),
	(28, 15, 3, '', '0.27', '0', 0, '2019-07-25 20:35:12'),
	(29, 16, 2, '', '1', '0', 0, '2019-07-25 20:35:13'),
	(30, 16, 3, '', '0.45', '0', 0, '2019-07-25 20:35:13'),
	(31, 17, 8, '', '1', '0', 0, '2019-07-25 22:08:59'),
	(32, 17, 2, '', '1', '0', 0, '2019-07-25 22:08:59'),
	(33, 17, 3, '', '0.02', '0', 0, '2019-07-25 22:08:59'),
	(34, 18, 7, '', '2', '0', 0, '2019-07-25 22:12:41'),
	(35, 18, 2, '', '1', '0', 0, '2019-07-25 22:12:41'),
	(36, 18, 8, '', '3', '0', 0, '2019-07-25 22:12:41'),
	(37, 18, 3, '', '0.02', '0', 0, '2019-07-25 22:12:41'),
	(38, 19, 1, '', '1', '0', 0, '2019-07-25 22:17:03'),
	(39, 19, 3, '', '1.75', '0', 0, '2019-07-25 22:17:03'),
	(40, 20, 3, '', '1.75', '0', 0, '2019-07-25 22:25:16'),
	(41, 21, 5, '', '1', '0', 0, '2019-07-25 22:25:17'),
	(42, 21, 3, '', '2.15', '0', 0, '2019-07-25 22:25:17'),
	(43, 22, 7, '', '1', '0', 0, '2019-07-26 21:53:42'),
	(44, 22, 2, '', '1', '0', 0, '2019-07-26 21:53:42'),
	(45, 22, 11, '', '1', '0', 0, '2019-07-26 21:53:42'),
	(46, 22, 3, '', '0.02', '0', 0, '2019-07-26 21:53:42'),
	(47, 23, 3, '', '65.45', '0', 0, '2019-07-25 01:00:30'),
	(48, 24, 1, '', '1', '0', 0, '2019-07-25 00:59:51'),
	(49, 24, 8, '', '1', '0', 0, '2019-07-25 00:59:51'),
	(50, 24, 5, '', '1', '0', 0, '2019-07-25 00:59:51'),
	(51, 24, 3, '', '65.55', '0', 0, '2019-07-25 00:59:51'),
	(52, 25, 1, '', '1', '0', 0, '2019-07-27 17:50:29'),
	(53, 25, 3, '', '0.87', '0', 0, '2019-07-27 17:50:29'),
	(54, 26, 2, '', '2', '0', 0, '2019-07-27 17:50:28'),
	(55, 26, 3, '', '0.93', '0', 0, '2019-07-27 17:50:28'),
	(56, 27, 2, '', '1', '0', 0, '2019-08-05 20:45:59'),
	(57, 27, 3, '', '0.30', '0', 0, '2019-08-05 20:45:59'),
	(58, 28, 3, '', '0.40', '0', 0, '2019-08-05 20:46:00'),
	(59, 29, 3, '', '0.42', '0', 0, '2019-08-05 20:46:02'),
	(60, 30, 3, '', '0.43', '0', 0, '2019-08-05 20:46:01'),
	(61, 31, 3, '', '0.45', '0', 0, '2019-08-05 20:46:01'),
	(62, 32, 3, '', '0.08', '0', 0, '2019-08-05 21:10:03'),
	(63, 33, 2, '', '1', '0', 0, '2019-08-06 22:30:52'),
	(64, 33, 3, '', '0.00', '0', 0, '2019-08-06 22:30:52'),
	(65, 34, 3, '', '1.17', '0', 0, '2019-08-08 23:30:07'),
	(66, 35, 1, '', '1', '0', 0, '2019-08-09 21:25:15'),
	(67, 35, 1, '', '1', '0', 0, '2019-08-09 21:25:15'),
	(68, 35, 3, '', '0.42', '0', 0, '2019-08-09 21:25:15'),
	(69, 36, 3, '', '0.67', '0', 0, '2019-08-09 21:25:16'),
	(70, 37, 3, '', '0.72', '0', 0, '2019-08-09 21:25:17'),
	(71, 38, 3, '', '2.57', '0', 0, '2019-08-09 21:47:39'),
	(72, 39, 3, '', '0.05', '0', 0, '2019-08-10 00:22:36'),
	(73, 40, 3, '', '0.55', '0', 0, '2019-08-09 23:52:40'),
	(74, 41, 3, '', '0.55', '0', 0, '2019-08-09 23:52:40'),
	(75, 42, 3, '', '2.02', '0', 0, '2019-08-12 20:28:18'),
	(76, 43, 3, '', '2.08', '0', 0, '2019-08-12 20:28:19'),
	(77, 44, 1, '', '1', '0', 0, '2019-08-14 20:19:26'),
	(78, 44, 3, '', '1.07', '0', 0, '2019-08-14 20:19:26'),
	(79, 45, 3, '', '1.08', '0', 0, '2019-08-14 20:19:27'),
	(80, 48, 2, 'REDBULL', '1', '15000', 0, '2019-08-17 14:13:29'),
	(81, 48, 3, 'PS4', '0.08', '20000', 0, '2019-08-17 14:13:29'),
	(82, 49, 2, 'REDBULL', '1', '15000', 0, '2019-08-17 14:13:30'),
	(83, 49, 1, 'COCA', '1', '10000', 0, '2019-08-17 14:13:30'),
	(84, 49, 3, 'PS4', '2.50', '20000', 0, '2019-08-17 14:13:30'),
	(85, 50, 5, 'DULICH', '1', '10000', 0, '2019-08-17 14:13:31'),
	(86, 50, 3, 'PS4', '2.65', '20000', 0, '2019-08-17 14:13:31');
/*!40000 ALTER TABLE `trans_detail` ENABLE KEYS */;

-- Dumping structure for table cms_ps_dev.users
CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `fullname` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `nickname` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `passwd` varchar(200) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `phone` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `address` varchar(200) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `diem_tich` int(10) unsigned NOT NULL DEFAULT 0 COMMENT 'Tổng điểm đã tích',
  `diem_tieu` int(10) unsigned NOT NULL DEFAULT 0 COMMENT 'Tổng điểm đã tiêu',
  `role` tinyint(1) unsigned NOT NULL DEFAULT 2 COMMENT '{1: admin, 2: employee, 3: customer}',
  `type` tinyint(1) unsigned NOT NULL DEFAULT 5 COMMENT 'Danh hieu {1: kim cuong, 2: vang, 3: bac, 4: dong, 5: thuong}',
  `status` tinyint(1) unsigned NOT NULL DEFAULT 1 COMMENT 'Trạng thái {0: inactive, 1: active}',
  `created_by` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_by` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `updated_at` datetime NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `phone` (`phone`)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table cms_ps_dev.users: ~20 rows (approximately)
DELETE FROM `users`;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` (`id`, `username`, `fullname`, `nickname`, `passwd`, `phone`, `address`, `diem_tich`, `diem_tieu`, `role`, `type`, `status`, `created_by`, `created_at`, `updated_by`, `updated_at`) VALUES
	(1, 'thanhnm', 'Nguyễn Mai Thành', 'mr.Lun', '$2b$08$Jxl0fBDTxbEjumxvaiyVAuCU2w9vj/Re7wBI5BlbxFZD1iNWoaG0i', '0349617930', 'Gia Lam, Hà Nội', 53, 35, 1, 5, 1, 'SYSTEM', '2019-06-16 14:21:17', 'khach1', '2019-08-14 20:39:31'),
	(2, 'thanhbka', NULL, NULL, '$2b$08$bY0d8RzwaS1SPdJsKSOTve3pnt2T0b3lncGW/WZh/cBXb/odyH7N2', '1', NULL, 9, 0, 1, 5, 1, 'SYSTEM', '2019-06-16 19:04:38', 'SYSTEM', '2019-06-16 19:04:38'),
	(9, 'thanhbka89', NULL, NULL, '$2b$08$a.103X0TBIFqUhZeKs15FeYa/VJSCVPGYoaI8ekNWkpifpYw8ZVAu', '2', NULL, 0, 0, 2, 5, 0, 'SYSTEM', '2019-06-20 20:43:24', 'SYSTEM', '2019-06-20 20:43:24'),
	(10, 'thanhnm90', NULL, NULL, '$2b$08$2J/vnHTpMKQdAnHUuLjJS.4.UrKlutjoqlg4IA.5wtwc4YxsDFucu', '3', NULL, 0, 0, 2, 5, 0, 'SYSTEM', '2019-06-21 23:06:20', 'SYSTEM', '2019-06-21 23:06:20'),
	(11, 'thanhnm1990', 'abc', NULL, '$2b$08$tard1a3J6p8U9hgLJL0SfOSNQ1yfYXUmVZ21lAqvNFD1Da1spztum', '111', NULL, 7, 0, 2, 5, 1, 'SYSTEM', '2019-06-21 23:09:22', 'thanhbka', '2019-08-06 20:01:16'),
	(12, 'test', NULL, NULL, '$2b$08$kvz3j0k2S.d9XCH8CssBleL3GP9/AUzZpNTAhmiHvAy5E3PoQhnSy', '0987987', 'HN', 0, 0, 2, 5, 1, 'SYSTEM', '2019-07-06 11:28:35', 'thanhbka', '2019-08-14 20:36:34'),
	(13, 'test2', NULL, NULL, NULL, '0987789161', 'hn', 0, 0, 2, 5, 1, 'SYSTEM', '2019-07-06 11:33:22', 'SYSTEM', '2019-07-06 11:38:03'),
	(14, 'test3', NULL, NULL, '$2b$08$lYfpwWS/fjMk3VkuIRbjK.G9oT2h3hF8tlftvaynGAwRQUQkspT7K', '123', 'hn', 0, 0, 3, 5, 1, 'SYSTEM', '2019-07-06 11:41:19', 'SYSTEM', '2019-07-06 11:55:19'),
	(16, 'test4', NULL, NULL, '$2b$08$3yWKJvZRLEh8VfGCn6KfPuPd.Xt9/yTCywkslbGznV4SzmFK9stDW', '12', NULL, 0, 0, 3, 5, 0, 'SYSTEM', '2019-07-06 12:38:32', 'thanhnm', '2019-07-20 16:18:20'),
	(17, 'test5', NULL, NULL, '$2b$08$.4m8aqwli9FlAEDy02PbDuTiOnF8wvXH6luVSaqm/AkL7w9nY4GLW', '13', NULL, 0, 0, 2, 5, 1, 'SYSTEM', '2019-07-06 12:38:40', 'SYSTEM', '2019-07-06 12:38:41'),
	(18, 'test6', NULL, NULL, '$2b$08$X.KCUl0hox9yRLOIX2CVaeEPKvP0nI3.GKB96PlljBUyp/xenRm72', '14', NULL, 0, 0, 2, 5, 1, 'SYSTEM', '2019-07-06 12:38:48', 'SYSTEM', '2019-07-06 12:38:49'),
	(19, 'test1', NULL, NULL, '$2b$08$9PLNknvK2E69FGpTpY6U4.RMaZIXqB2WOmYRCw.iaOHbxbYYZGrWq', '21', NULL, 0, 0, 2, 5, 1, 'SYSTEM', '2019-07-06 12:41:08', 'SYSTEM', '2019-07-06 12:41:09'),
	(22, 'test7', NULL, NULL, '$2b$08$9CcoqQ2UIK9LDupmKZ1JBuI3JFyDfa3Mt8cs1ZUwcdsoocHWrVATG', '22', NULL, 0, 0, 3, 5, 1, 'SYSTEM', '2019-07-20 14:48:32', 'SYSTEM', '2019-07-20 14:48:32'),
	(23, 'test8', NULL, NULL, '$2b$08$F.5bLR2RVSzJOEdEDo9qKeDk5s0lNg8oomD720fzojDyA70LKx29O', '23', NULL, 0, 0, 3, 5, 1, 'SYSTEM', '2019-07-20 15:42:33', 'SYSTEM', '2019-07-20 15:42:33'),
	(24, 'test9', NULL, NULL, '$2b$08$3imjNva1D8hwyxrKcMJzKOuMsc2qtFfyE2VyzaXNwPp7poCfwFoGO', '24', NULL, 0, 0, 3, 5, 1, 'SYSTEM', '2019-07-20 15:55:11', 'SYSTEM', '2019-07-20 15:55:11'),
	(25, 'test10', NULL, NULL, '$2b$08$Nfa4nVmF7YbP5cNTiETO3.VdtEQC0a1cKrNbn/t3BSlIKDjKmtgry', '0123987789', 'HN', 0, 0, 3, 5, 1, 'thanhnm', '2019-07-20 15:59:08', 'thanhnm', '2019-07-20 16:14:26'),
	(26, 'test11', NULL, NULL, '$2b$08$7JeA7ct6xLRznUCk1TlVCe6iF4y5r4wniCTidBHo2SULRfjtf6RbC', '0347504904', NULL, 0, 0, 3, 5, 1, 'thanhnm', '2019-07-20 16:13:30', 'thanhbka', '2019-07-26 00:28:50'),
	(27, 'thai', NULL, NULL, '$2b$08$3L2.lw1OVQOkwiIqxCCfNuIrkPTrFP.c.A99kN79an5BZFUYE0Ytq', '34', NULL, 0, 0, 2, 5, 1, 'thanhbka', '2019-07-25 22:08:27', 'thanhbka', '2019-07-25 22:08:27'),
	(28, 'khach1', 'ABC', NULL, '$2b$08$VDuH1gq1nQjZLMIpH5NhMO.ZegceuIGC2din.o3w0a17EJd3bsmv6', '12332', NULL, 0, 0, 3, 5, 1, 'test', '2019-08-14 20:38:01', 'test', '2019-08-14 20:38:36'),
	(31, 'thanh0930', 'Nguyen thanh', NULL, '$2b$08$b8kbu5IuUEsE6atPKo4BbOxh9/H6koCIYywG0Az1j7yRTxpPXzWqO', '0349617938', NULL, 0, 0, 3, 5, 1, 'test', '2019-08-14 21:27:11', 'test', '2019-08-14 21:27:11');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;

-- Dumping structure for table cms_ps_dev.vendors
CREATE TABLE IF NOT EXISTS `vendors` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `address` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(250) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Thong tin dai ly';

-- Dumping data for table cms_ps_dev.vendors: ~26 rows (approximately)
DELETE FROM `vendors`;
/*!40000 ALTER TABLE `vendors` DISABLE KEYS */;
INSERT INTO `vendors` (`id`, `name`, `address`, `phone`, `description`) VALUES
	(1, 'SamSung', 'Bắc Ninh', '0349617930', NULL),
	(2, 'Iphone', 'Bac Ninh', '0349617930', 'Bán điện thoại'),
	(3, 'VSmart', 'Bac Ninh', '0349617930', NULL),
	(4, 'LG', 'Bac Ninh', '0349617930', NULL),
	(5, 'Sony', 'Bac Ninh', '0349617930', NULL),
	(6, 'HKBike', 'Bac Ninh', '0349617930', NULL),
	(7, 'VinFast', 'Bac Ninh', '0349617930', NULL),
	(8, 'Xiaomi', 'Bac Ninh', '0349617930', NULL),
	(10, 'Bphone', 'Bac Ninh', '0349617930', NULL),
	(12, 'Canon', 'Gia Lam, HN', '0349617930', NULL),
	(13, 'Vietel', 'Gia Lam, HN', '0349617930', NULL),
	(14, 'Mobifone', 'Gia Lam, HN', '0349617930', NULL),
	(15, 'Vina', 'Gia Lam, HN', '0349617930', NULL),
	(16, 'FPT', 'Gia Lam, HN', '0349617930', NULL),
	(17, 'Nguyen Kim', 'Gia Lam, HN', '0349617930', NULL),
	(18, 'Adayroi', 'Gia Lam, HN', '0349617930', NULL),
	(19, 'Sendo', 'Gia Lam, HN', '0349617930', NULL),
	(20, 'Tiki', 'Gia Lam, HN', '0349617930', NULL),
	(21, 'Shopee', 'Gia Lam, HN', '0349617930', NULL),
	(22, 'Lazada', 'Gia Lam, HN', '0349617930', NULL),
	(23, 'Be', 'Gia Lam, HN', '0349617930', NULL),
	(24, 'Grap', 'Gia Lam, HN', '0349617930', NULL),
	(25, 'Uber', 'Gia Lam, HN', '0349617930', NULL),
	(26, 'Go', 'Gia Lam, HN', '0349617930', NULL),
	(27, 'TGDD', 'HN', '0987789', NULL),
	(28, 'DMX', 'HN', '0987789789', NULL);
/*!40000 ALTER TABLE `vendors` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
