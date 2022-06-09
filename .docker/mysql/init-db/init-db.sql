CREATE
DATABASE IF NOT EXISTS `expense_manager`;

SET
SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET
AUTOCOMMIT = 0;
START TRANSACTION;
SET
time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `expense_manager`
--

-- --------------------------------------------------------

--
-- Table structure for table `expenses`
--

CREATE TABLE IF NOT EXISTS `expenses`
(
    `id` bigint
(
    20
) UNSIGNED NOT NULL,
    `name` varchar
(
    191
) COLLATE utf8mb4_unicode_ci NOT NULL,
    `description` mediumtext COLLATE utf8mb4_unicode_ci NOT NULL,
    `amount` bigint
(
    20
) UNSIGNED NOT NULL,
    `created_at` timestamp NULL DEFAULT NULL,
    `updated_at` timestamp NULL DEFAULT NULL
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE =utf8mb4_unicode_ci;

--
-- Dumping data for table `expenses`
--

INSERT
IGNORE INTO `expenses` (`id`, `name`, `description`, `amount`, `created_at`, `updated_at`) VALUES
(1, 'Prof.', 'Illum est nihil sunt illum cupiditate.', 2495823, '2022-03-10 11:43:20', '2022-03-10 11:43:20'),
(2, 'Dr.', 'Fugiat nostrum quia accusamus dolores omnis saepe ea.', 3989918, '2022-03-10 11:43:20', '2022-03-10 11:43:20'),
(5, 'Ms.', 'Voluptatem dolorum nihil in aut eos.', 2171898, '2022-03-10 11:43:21', '2022-03-10 11:43:21'),
(6, 'Prof.', 'Delectus cupiditate mollitia commodi doloribus dicta ut molestiae.', 5062116, '2022-03-10 11:43:21', '2022-03-10 11:43:21'),
(7, 'Mr.', 'Unde quos in est id enim nesciunt.', 822680, '2022-03-10 11:43:21', '2022-03-10 11:43:21'),
(8, 'Dr.', 'Ratione laborum laborum aut exercitationem quisquam tenetur.', 410943, '2022-03-10 11:43:21', '2022-03-10 11:43:21'),
(9, 'Ms.', 'Ducimus dolor tempore repellat.', 3767349, '2022-03-10 11:43:21', '2022-03-10 11:43:21'),
(10, 'Prof.', 'Velit quam itaque dolorem dicta repudiandae eos.', 3782659, '2022-03-10 11:43:21', '2022-03-10 11:43:21'),
(11, 'Dr.', 'Illum ab ratione distinctio qui qui aut.', 1782570, '2022-03-10 11:43:21', '2022-03-10 11:43:21');

-- --------------------------------------------------------

--
-- Table structure for table `failed_jobs`
--

CREATE TABLE IF NOT EXISTS `failed_jobs`
(
    `id` bigint
(
    20
) UNSIGNED NOT NULL,
    `uuid` varchar
(
    40
) COLLATE utf8mb4_unicode_ci NOT NULL,
    `connection` text COLLATE utf8mb4_unicode_ci NOT NULL,
    `queue` text COLLATE utf8mb4_unicode_ci NOT NULL,
    `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
    `exception` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
    `failed_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE =utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE IF NOT EXISTS `migrations`
(
    `id` int
(
    10
) UNSIGNED NOT NULL,
    `migration` varchar
(
    255
) COLLATE utf8mb4_unicode_ci NOT NULL,
    `batch` int
(
    11
) NOT NULL
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE =utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT
IGNORE INTO `migrations` (`id`, `migration`, `batch`) VALUES
(19, '2014_10_12_000000_create_users_table', 1),
(20, '2014_10_12_100000_create_password_resets_table', 1),
(21, '2019_08_19_000000_create_failed_jobs_table', 1),
(22, '2019_12_14_000001_create_personal_access_tokens_table', 1),
(23, '2022_02_24_081909_create_expenses_table', 1);

-- --------------------------------------------------------

--
-- Table structure for table `password_resets`
--

CREATE TABLE IF NOT EXISTS `password_resets`
(
    `email` varchar
(
    40
) COLLATE utf8mb4_unicode_ci NOT NULL,
    `token` varchar
(
    191
) COLLATE utf8mb4_unicode_ci NOT NULL,
    `created_at` timestamp NULL DEFAULT NULL
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE =utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `personal_access_tokens`
--

CREATE TABLE IF NOT EXISTS `personal_access_tokens`
(
    `id` bigint
(
    20
) UNSIGNED NOT NULL,
    `tokenable_type` varchar
(
    191
) COLLATE utf8mb4_unicode_ci NOT NULL,
    `tokenable_id` bigint
(
    20
) UNSIGNED NOT NULL,
    `name` varchar
(
    191
) COLLATE utf8mb4_unicode_ci NOT NULL,
    `token` varchar
(
    64
) COLLATE utf8mb4_unicode_ci NOT NULL,
    `abilities` text COLLATE utf8mb4_unicode_ci,
    `last_used_at` timestamp NULL DEFAULT NULL,
    `created_at` timestamp NULL DEFAULT NULL,
    `updated_at` timestamp NULL DEFAULT NULL
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE =utf8mb4_unicode_ci;

-- --------------------------------------------------------


--
-- Table structure for table `multimedia`
--

CREATE TABLE IF NOT EXISTS `multimedia`
(
    `id`
    bigint
    UNSIGNED
    NOT
    NULL,
    `group_type`
    enum
(
    'I',
    'S',
    'V'
) COLLATE utf8mb4_unicode_ci NOT NULL,
    `title` varchar
(
    191
) COLLATE utf8mb4_unicode_ci NOT NULL,
    `description` varchar
(
    191
) COLLATE utf8mb4_unicode_ci NOT NULL,
    `name` varchar
(
    191
) COLLATE utf8mb4_unicode_ci NOT NULL,
    `is_dir` enum
(
    'T',
    'F'
) COLLATE utf8mb4_unicode_ci NOT NULL,
    `quality` varchar
(
    191
) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
    `created_by` int NOT NULL DEFAULT '0',
    `updated_by` int NOT NULL DEFAULT '0',
    `parent_id` int NOT NULL DEFAULT '0',
    `relation_type` int NOT NULL DEFAULT '0',
    `extra_info` varchar
(
    191
) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
    `created_at` timestamp NULL DEFAULT NULL,
    `updated_at` timestamp NULL DEFAULT NULL
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE =utf8mb4_unicode_ci;

--
-- Dumping data for table `multimedia`
--

INSERT INTO `multimedia` (`id`, `group_type`, `title`, `description`, `name`, `is_dir`, `quality`, `created_by`,
                          `updated_by`, `parent_id`, `relation_type`, `extra_info`, `created_at`, `updated_at`)
VALUES (1, 'V', '', '', 'videos', 'T', NULL, 1, 0, 0, 0, NULL, '2022-05-04 14:53:58', '2022-05-12 12:14:21'),
       (2, 'I', '', '', 'images', 'T', NULL, 1, 0, 0, 0, NULL, '2022-05-05 14:53:58', '2022-05-12 12:14:21'),
       (3, 'S', '', '', 'sounds', 'T', NULL, 1, 0, 0, 0, NULL, '2022-05-05 14:55:16', '2022-05-12 12:14:22'),
       (4, 'I', '', '', 'sport', 'T', NULL, 1, 0, 2, 0, NULL, '2022-05-20 09:50:26', '2022-05-20 09:50:26'),
       (5, 'V', '', '', 'v-sport', 'T', NULL, 1, 0, 1, 0, NULL, '2022-05-20 09:52:49', '2022-05-20 09:52:49');



CREATE TABLE IF NOT EXISTS `continents`
(
    `id`          bigint UNSIGNED NOT NULL,
    `iso2`        char(2) COLLATE utf8mb4_unicode_ci      NOT NULL COMMENT 'alpha-2 code',
    `name_fa`     varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
    `name_en`     varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
    `status`      enum('A','D') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'D',
    `description` text COLLATE utf8mb4_unicode_ci,
    `created_at`  timestamp NULL DEFAULT NULL,
    `updated_at`  timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `continents`
--
ALTER TABLE `continents`
    ADD PRIMARY KEY (`id`),
  ADD KEY `continents_status_index` (`status`);
ALTER TABLE `continents`
    ADD FULLTEXT KEY `continents_iso2_fulltext` (`iso2`);
ALTER TABLE `continents`
    ADD FULLTEXT KEY `continents_name_fa_fulltext` (`name_fa`);
ALTER TABLE `continents`
    ADD FULLTEXT KEY `continents_name_en_fulltext` (`name_en`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `continents`
--
ALTER TABLE `continents`
    MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;
COMMIT;

INSERT INTO `continents` (`iso2`, `name_fa`, `name_en`)
VALUES ('AF', '', 'Africa'),
       ('AS', '', 'Asia'),
       ('EU', '', 'Europe'),
       ('NA', '', 'North America'),
       ('SA', '', 'South America'),
       ('OC', '', 'Oceania'),
       ('AN', '', 'Antarctica');



--
-- Table structure for table `users`
--

CREATE TABLE IF NOT EXISTS `users`
(
    `id`
    bigint
    UNSIGNED
    NOT
    NULL,
    `first_name`
    varchar
(
    191
) COLLATE utf8mb4_unicode_ci NOT NULL,
    `last_name` varchar
(
    191
) COLLATE utf8mb4_unicode_ci NOT NULL,
    `gender` enum
(
    'M',
    'F'
) COLLATE utf8mb4_unicode_ci NOT NULL,
    `birthday` timestamp NOT NULL,
    `email` varchar
(
    40
) COLLATE utf8mb4_unicode_ci NOT NULL,
    `email_verified_at` timestamp NULL DEFAULT NULL,
    `national_code` varchar
(
    191
) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
    `marriage` enum
(
    'M',
    'S'
) COLLATE utf8mb4_unicode_ci NOT NULL,
    `password` varchar
(
    191
) COLLATE utf8mb4_unicode_ci NOT NULL,
    `avatar` varchar
(
    191
) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
    `remember_token` varchar
(
    100
) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
    `created_at` timestamp NULL DEFAULT NULL,
    `updated_at` timestamp NULL DEFAULT NULL
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE =utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `first_name`, `last_name`, `gender`, `birthday`, `email`, `email_verified_at`,
                     `national_code`, `marriage`, `password`, `avatar`, `remember_token`, `created_at`, `updated_at`)
VALUES (1, 'Meysam', '', 'M', '2022-04-02 10:32:29', 'meysam.alavi1990@gmail.com', NULL, NULL, 'S',
        '$2y$10$3Y0XwYQyyWq.xRD2Me.R..eVHYwNSYdXq2TvqJ1svrO9swhljhbba', NULL, NULL, '2022-03-10 11:43:21',
        '2022-03-10 11:43:21');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `expenses`
--
ALTER TABLE `expenses`
    ADD PRIMARY KEY (`id`);

--
-- Indexes for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
    ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
    ADD PRIMARY KEY (`id`);

--
-- Indexes for table `password_resets`
--
ALTER TABLE `password_resets`
    ADD KEY `password_resets_email_index` (`email`);

--
-- Indexes for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
    ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
    ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `expenses`
--
ALTER TABLE `expenses`
    MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
    MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
    MODIFY `id` int (10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
    MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
    MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;


/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
