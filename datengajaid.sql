-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 02, 2021 at 05:37 PM
-- Server version: 10.4.19-MariaDB
-- PHP Version: 8.0.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `datengajaid`
--

-- --------------------------------------------------------

--
-- Table structure for table `buyer_product`
--

CREATE TABLE `buyer_product` (
  `id` bigint(255) NOT NULL,
  `user_id` bigint(255) NOT NULL,
  `product_id` int(11) NOT NULL,
  `bride_couple_img` varchar(100) NOT NULL,
  `bridegroom_full_name` tinytext NOT NULL,
  `bride_full_name` tinytext NOT NULL,
  `bridegroom_call_name` tinytext NOT NULL,
  `bride_call_name` tinytext NOT NULL,
  `bridegroom_mother` tinytext NOT NULL,
  `bridegroom_father` tinytext NOT NULL,
  `bride_woman_mother` tinytext NOT NULL,
  `bride_woman_father` tinytext NOT NULL,
  `bride_date` date NOT NULL,
  `bride_start_time` time NOT NULL,
  `bride_end_time` time NOT NULL,
  `bride_location` varchar(255) NOT NULL,
  `reception_date` date NOT NULL,
  `reception_start_time` time NOT NULL,
  `reception_end_time` time DEFAULT NULL,
  `reception_location` varchar(255) NOT NULL,
  `reception_location_google_maps` varchar(255) NOT NULL,
  `gallery` varchar(255) NOT NULL,
  `live_streaming_zoom` varchar(100) NOT NULL,
  `live_streaming_zoom_meeting_id` varchar(100) NOT NULL,
  `live_streaming_zoom_password` varchar(100) NOT NULL,
  `live_streaming_ig_account` varchar(100) NOT NULL,
  `handphone_wa` varchar(20) NOT NULL,
  `rekening_qr_img` varchar(50) NOT NULL,
  `rekening` varchar(50) NOT NULL,
  `is_publish` varchar(20) NOT NULL,
  `expired_at` datetime NOT NULL,
  `status_paid` varchar(50) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `status` char(20) NOT NULL DEFAULT 'AKTIF'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `invitations`
--

CREATE TABLE `invitations` (
  `id` int(11) NOT NULL,
  `invitation_category_id` int(11) NOT NULL,
  `fullname` text NOT NULL,
  `phone_wa` char(20) NOT NULL,
  `attend_status` char(30) NOT NULL DEFAULT 'menunggu konfirmasi',
  `greetings` longtext NOT NULL,
  `attend_qty` int(11) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `status` char(255) NOT NULL DEFAULT 'AKTIF',
  `present_time` time NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `invitations`
--

INSERT INTO `invitations` (`id`, `invitation_category_id`, `fullname`, `phone_wa`, `attend_status`, `greetings`, `attend_qty`, `created_at`, `updated_at`, `status`, `present_time`) VALUES
(1, 1, 'Affiasca', '081294923207', 'menunggu konfirmasi', '', 0, '2021-06-02 17:25:56', '2021-06-02 17:25:56', 'AKTIF', '00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `invitation_categories`
--

CREATE TABLE `invitation_categories` (
  `id` int(255) NOT NULL,
  `buyer_product_id` bigint(255) NOT NULL,
  `desc` char(50) NOT NULL,
  `session` char(50) DEFAULT NULL,
  `time_start` time DEFAULT NULL,
  `time_end` time DEFAULT NULL,
  `status` char(50) NOT NULL DEFAULT 'AKTIF'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `invitation_categories`
--

INSERT INTO `invitation_categories` (`id`, `buyer_product_id`, `desc`, `session`, `time_start`, `time_end`, `status`) VALUES
(1, 1, 'Teman Kuliah Mempelai Laki-laki', NULL, NULL, NULL, 'AKTIF'),
(2, 1, 'Teman SD Mempelai Laki-laki', 'I', '10:00:00', '12:00:00', 'AKTIF'),
(3, 1, 'Teman SMK Mempelai Laki-laki', 'I', '10:00:00', '12:00:00', 'AKTIF');

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int(50) NOT NULL,
  `name` char(50) NOT NULL,
  `status` char(30) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `name`, `status`, `created_at`, `updated_at`) VALUES
(1, 'design01', 'AKTIF', '2021-06-02 22:03:58', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(255) NOT NULL,
  `email` char(50) NOT NULL,
  `phone` char(50) NOT NULL,
  `password` varchar(30) NOT NULL,
  `type` char(20) NOT NULL,
  `status` char(50) NOT NULL DEFAULT '''AKTIF''',
  `created_at` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `updated_at` datetime(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `email`, `phone`, `password`, `type`, `status`, `created_at`, `updated_at`) VALUES
(1, 'hlmifzi@gmail.com', '081294923207', 'SMKN26Pembangunan', 'ADMIN', 'AKTIF', '2021-06-16 08:25:32.000000', '2021-06-02 22:04:44.000000');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `buyer_product`
--
ALTER TABLE `buyer_product`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `invitations`
--
ALTER TABLE `invitations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `invitation_categories`
--
ALTER TABLE `invitation_categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `buyer_product`
--
ALTER TABLE `buyer_product`
  MODIFY `id` bigint(255) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `invitations`
--
ALTER TABLE `invitations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `invitation_categories`
--
ALTER TABLE `invitation_categories`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(50) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
