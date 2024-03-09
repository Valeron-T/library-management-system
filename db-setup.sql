SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

CREATE DATABASE IF NOT EXISTS `lmsdb` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `lmsdb`;

CREATE TABLE `books` (
  `id` int(11) NOT NULL PRIMARY KEY,
  `title` varchar(255) NOT NULL,
  `author` varchar(255) NOT NULL,
  `average_rating` float DEFAULT NULL,
  `isbn` varchar(10) NOT NULL,
  `isbn13` varchar(13) NOT NULL,
  `language_code` varchar(10) NOT NULL,
  `num_pages` int(5) NOT NULL,
  `ratings_count` int(11) NOT NULL,
  `text_reviews_count` int(11) NOT NULL,
  `publication_date` date NOT NULL,
  `publisher` varchar(255) NOT NULL,
  `total_qty` int(11) NOT NULL,
  `available_qty` int(11) NOT NULL,
  `currently_rented` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `members` (
  `id` int(11) NOT NULL PRIMARY KEY,
  `name` varchar(100) NOT NULL,
  `phone` varchar(12) DEFAULT NULL,
  `email` varchar(100) NOT NULL,
  `reg_date` timestamp NOT NULL DEFAULT current_timestamp(),
  `debt` float NOT NULL,
  `amount_spent` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `transactions` (
  `id` int(11) NOT NULL PRIMARY KEY,
  `member_id` int(11) DEFAULT NULL,
  `book_id` int(11) DEFAULT NULL,
  `total` float DEFAULT NULL,
  `amount_paid` float DEFAULT NULL,
  `per_day_fee` float NOT NULL,
  `borrowed_date` timestamp NOT NULL DEFAULT current_timestamp(),
  `returned_date` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

ALTER TABLE `transactions`
  ADD KEY `book_fk` (`book_id`),
  ADD KEY `member_fk` (`member_id`);


ALTER TABLE `books`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

ALTER TABLE `members`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

ALTER TABLE `transactions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;


ALTER TABLE `transactions`
  ADD CONSTRAINT `book_fk` FOREIGN KEY (`book_id`) REFERENCES `books` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `member_fk` FOREIGN KEY (`member_id`) REFERENCES `members` (`id`) ON DELETE SET NULL;
COMMIT;


-- Insert 5 records into members 
INSERT INTO `members` (`name`, `phone`, `email`, `reg_date`, `debt`, `amount_spent`)
VALUES
    ('John Doe', '1234567890', 'john.doe@example.com', CURRENT_TIMESTAMP(), 0, 0),
    ('Jane Smith', '9876543210', 'jane.smith@example.com', CURRENT_TIMESTAMP(), 0, 0),
    ('Alice Johnson', '5555555555', 'alice.johnson@example.com', CURRENT_TIMESTAMP(), 0, 0),
    ('Bob Brown', '9999999999', 'bob.brown@example.com', CURRENT_TIMESTAMP(), 0, 0),
    ('Emily Davis', '1111111111', 'emily.davis@example.com', CURRENT_TIMESTAMP(), 0, 0);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
