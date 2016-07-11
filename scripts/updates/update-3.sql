CREATE TABLE IF NOT EXISTS `areas` (
    `id`            int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `name`          varchar(100) NOT NULL,
    `description`   varchar(255),
    `data`          text COMMENT 'save more settings here as json'
);


CREATE TABLE IF NOT EXISTS `devices` (
    `id`            int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `name`          varchar(100) NOT NULL,
    `type`          char(15),
    `description`   varchar(255),
    `data`          text COMMENT 'save more settings here as json'
);

CREATE TABLE IF NOT EXISTS `areas_devices` (
    `area_id`       int(11) NOT NULL,
    `device_id`     int(11) NOT NULL,
    `data`          text COMMENT 'save more settings here as json'
);


CREATE TABLE IF NOT EXISTS `logs` (
    `id`            int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `area_id`       int(11),
    `device_id`     int(11),
    `type`          char(25) COMMENT 'save a code like CREATE_AREA, READ_TEMPERATURE...',
    `description`   text NOT NULL,
    `date`          TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
);

CREATE TABLE IF NOT EXISTS `stats` (
    `time_range_type` char(10) NOT NULL COMMENT 'DAY, MOUNTH, YEAR...',
    `time_range_end` TIMESTAMP NOT NULL,
    `type` char(25) NOT NULL COMMENT 'save a code like TEMPERATURE, HUMIDITY',
    `value` int(11) NOT NULL
);
