DROP TABLE IF EXISTS `likes_per_comment`;
DROP TABLE IF EXISTS `comments`;
DROP TABLE IF EXISTS `users_articles_ratings`;
DROP TABLE IF EXISTS `articles_tags`;
DROP TABLE IF EXISTS `tags`;
DROP TABLE IF EXISTS `articles`;
DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
    `id` INT AUTO_INCREMENT,
    `email` VARCHAR(40) NOT NULL UNIQUE CHECK (`email` REGEXP '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}$'),
    `username` VARCHAR(20) NOT NULL UNIQUE,
    `password` TEXT NOT NULL,
    `role` ENUM('admin', 'editor', 'user') NOT NULL,
    `email_is_confirmed` BOOLEAN NOT NULL DEFAULT FALSE,
    `join_date` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `last_online` DATETIME,
    PRIMARY KEY(`id`)
);

CREATE TABLE `articles` (
    `id` INT AUTO_INCREMENT,
    `title` VARCHAR(50) NOT NULL,
    `text` TEXT NOT NULL,
    `header_image` VARCHAR(50), 
    `post_datetime` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `author_id` INT NOT NULL,
    PRIMARY KEY(`id`),
    FOREIGN KEY (`author_id`) REFERENCES `users`(`id`)
);

CREATE TABLE `tags` (
    `id` INT AUTO_INCREMENT,
    `name` VARCHAR(50) NOT NULL UNIQUE,
    PRIMARY KEY(`id`)
);

CREATE TABLE `articles_tags` (
    `id` INT AUTO_INCREMENT,
    `article_id` INT,
    `tag_id` INT,
    PRIMARY KEY (`id`),
    UNIQUE (`article_id`, `tag_id`),
    FOREIGN KEY (`article_id`) REFERENCES `articles`(`id`) ON DELETE CASCADE,
    FOREIGN KEY (`tag_id`) REFERENCES `tags`(`id`) ON DELETE CASCADE
);

CREATE TABLE users_articles_ratings (
    `id` INT AUTO_INCREMENT,
    `article_id` INT,
    `user_id` INT,
    `rating` INT NOT NULL CHECK (`rating` >= 1 AND `rating` <= 5),
    PRIMARY KEY (`id`),
    UNIQUE (`article_id`, `user_id`),
    FOREIGN KEY (`article_id`) REFERENCES `articles`(`id`),
    FOREIGN KEY (`user_id`) REFERENCES `users`(`id`)
);

CREATE TABLE `comments` (
    `id` INT AUTO_INCREMENT,
    `user_id` INT NOT NULL,
    `article_id` INT NOT NULL,
    `parent_comment_id` INT DEFAULT NULL,
    `content` TEXT NOT NULL CHECK (LENGTH(`content`) >= 5 AND LENGTH(`content`) <= 500),
    `commented_on` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY(`id`),
    FOREIGN KEY (`user_id`) REFERENCES `users`(`id`),
    FOREIGN KEY (`article_id`) REFERENCES `articles`(`id`),
    FOREIGN KEY (`parent_comment_id`) REFERENCES `comments`(`id`)
);

CREATE TABLE `likes_per_comment` (
    `id` INT AUTO_INCREMENT,
    `comment_id` INT,
    `user_id` INT,
    PRIMARY KEY(`id`),
    UNIQUE (`comment_id`, `user_id`),
    FOREIGN KEY (`comment_id`) REFERENCES `comments`(`id`),
    FOREIGN KEY (`user_id`) REFERENCES `users`(`id`)
);
