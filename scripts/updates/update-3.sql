CREATE TABLE IF NOT EXISTS `areas` (
    `id`            int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `name`          varchar(100) NOT NULL,
    `description`   varchar(255),
    `data`          text COMMENT 'save random data here as json'
);
