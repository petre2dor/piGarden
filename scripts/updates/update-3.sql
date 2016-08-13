DROP TABLE IF EXISTS `areas`;
CREATE TABLE IF NOT EXISTS `areas` (
    `id`            int(11) UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `name`          varchar(100) NOT NULL,
    `description`   varchar(255),
    `status`        char(25) COMMENT 'ACTIVE, INACTIVE, DELETED',
    `options`       text COMMENT 'save more settings here as json'
);

DROP TABLE IF EXISTS `devices`;
CREATE TABLE IF NOT EXISTS `devices` (
    `id`            int(11) UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `name`          varchar(100) NOT NULL,
    `type`          char(15),
    `description`   varchar(255),
    `status`        char(25) COMMENT 'ACTIVE, INACTIVE, DELETED',
    `options`       text COMMENT 'save more settings here as json'
);

DROP TABLE IF EXISTS `areas_devices`;
CREATE TABLE IF NOT EXISTS `areas_devices` (
    `area_id`       int(11) NOT NULL,
    `device_id`     int(11) NOT NULL,
    `status`        char(25) COMMENT 'ACTIVE, INACTIVE, DELETED',
    `options`       text COMMENT 'save more settings here as json'
);

DROP TABLE IF EXISTS `logs`;
CREATE TABLE IF NOT EXISTS `logs` (
    `id`            int(11) UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `area_id`       int(11),
    `device_id`     int(11),
    `type`          char(25) COMMENT 'save a code like CREATE_AREA, READ_TEMPERATURE...',
    `description`   text NOT NULL,
    `date`          TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
