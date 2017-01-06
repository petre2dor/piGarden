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
    `area_id`       int(11) UNSIGNED NOT NULL,
    `device_id`     int(11) UNSIGNED NOT NULL,
    `status`        char(25) COMMENT 'ACTIVE, INACTIVE, DELETED',
    `options`       text COMMENT 'save more settings here as json'
);

DROP TABLE IF EXISTS `logs`;
CREATE TABLE IF NOT EXISTS `logs` (
    `id`            int(11) UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `action_id`     int(11) UNSIGNED,
    `area_id`       int(11),
    `device_id`     int(11),
    `type`          char(25) COMMENT 'save a code like CREATE_AREA, READ_TEMPERATURE...',
    `description`   text NOT NULL,
    `date`          TIMESTAMP(4) DEFAULT CURRENT_TIMESTAMP
);


DROP TABLE IF EXISTS `actions`;
CREATE TABLE IF NOT EXISTS `actions` (
    `id`            int(11) UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `device_id`     int(11) UNSIGNED NOT NULL,
    `verb`          char(25) COMMENT 'save a verb like READ, WRITE, START, OPEN, STOP, CHECK_PROGRESS..',
    `object`        char(25) COMMENT 'save a code like AREA, TEMPERATURE...',
    `options`       text COMMENT 'a json with options',
    `last_run_time` TIMESTAMP DEFAULT 0,
    `next_run_time` TIMESTAMP DEFAULT 0,
    `schedule`      text NOT NULL COMMENT 'json {start: {every: 60}/{at:[7:10:11, 13:01:00]}, CHECK_PROGRESS: {every: 60}}',
    `description`   text NOT NULL,
    `is_running`    boolean,
    `status`        char(25) COMMENT 'ACTIVE, COMPLETED, WARNING, ERROR, INACTIVE, DELETED',
    `retries`       SMALLINT DEFAULT 0
);

DROP TABLE IF EXISTS `stats`;
CREATE TABLE IF NOT EXISTS `stats` (
    `date`      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `type`      char(25) NOT NULL COMMENT 'save a code like TEMPERATURE|HUMIDITY',
    `value`     DECIMAL(7,3),
    `area_id`   int(11) UNSIGNED NOT NULL,
    `device_id` int(11) UNSIGNED NOT NULL,
    `ext_data`  text COMMENT 'save more settings here as s',
    `status`    char(25) COMMENT 'ACTIVE|INACTIVE|DELETED'
);


----------------------------------------------------
----------------------------------------------------
-- adding some actions
TRUNCATE actions;

INSERT INTO actions (device_id, verb, object, options, last_run_time, next_run_time, schedule, description, is_running, status)
VALUES (1, 'READ', 'TEMPERATURE', '{}', NOW(), NOW(), '{"type": "cyclic", "every": "PT20S"}', 'Read temperature from device 1', 0, 'INACTIVE');


INSERT INTO actions (device_id, verb, object, options, last_run_time, next_run_time, schedule, description, is_running, status)
VALUES (2, 'READ', 'HUMIDITY', '{}', NOW(), NOW(), '{"type": "cyclic", "every": "PT10S"}', 'Read humidity from device 2', 0, 'INACTIVE');


----------------------------------------------------
----------------------------------------------------
DROP TABLE IF EXISTS `configs`;
CREATE TABLE `configs`(
    `name`          varchar(100) NOT NULL PRIMARY KEY,
    `value`         varchar(255) NOT NULL,
    `options`       text COMMENT 'save more settings here as json',
    `description`   varchar(255)
);

INSERT INTO `configs` (name, value, description)
VALUES ('AH_RETRIES_NO', '15', 'How many times will AH retry an action until it will set it to ERROR');




----------------------------------------------------
----------------------------------------------------
-- insert area
INSERT INTO areas (id, name, description, status, options) VALUES (1, 'Area 1', 'This is area 1', 'ACTIVE', '{}');


----------------------------------------------------
----------------------------------------------------
-- insert devices
--
-- insert DS18B20 digital humidity sensor
INSERT INTO devices  (id, name, type, description, status, options)
VALUES (1, 'DS18B20', 'DIGITAL', 'DS18B20 digital humidity sensor', 'ACTIVE', '{"js_file":"ds18b20/read_ds18b20"}');

-- set this device in area 1
INSERT INTO areas_devices (area_id, device_id, status, options) VALUES (1, 1, 'ACTIVE', '{}');


--
-- insert FW1S analog humidity sensor
INSERT INTO devices (id, name, type, description, status, options)
VALUES (2, 'FW1S', 'ANALOG', 'FW1S analog humidity sensor', 'ACTIVE', '{"js_file":"fw1s/read_fw1s"}');

-- set this device in area 1
INSERT INTO areas_devices (area_id, device_id, status, options) VALUES (1, 2, 'ACTIVE', '{}');


-- add area 2
INSERT INTO areas(id, name, description, status, options) VALUES (2, 'Area 2', 'This is area 2', 'ACTIVE', '{}');
-- add device 2 to area 2
INSERT INTO areas_devices(area_id, device_id, status, options) VALUES (2, 2, 'ACTIVE', '{}');


--
-- insert DHT22 analog temperature and humidity sensor
INSERT INTO devices (id, name, type, description, status, options)
VALUES (3, 'DHT22', 'DIGITAL', 'DHT22 digital temperature/humidity sensor', 'ACTIVE', '{"js_file":"dht22/read_dht22","GPIOpin":"22"}');

-- set this device in area 1
INSERT INTO areas_devices (area_id, device_id, status, options)
VALUES (1, 3, 'ACTIVE', '{}');

-- insert an action for this device
INSERT INTO actions (device_id, verb, object, options, last_run_time, next_run_time, schedule, description, is_running, status)
VALUES (3, 'READ', 'TEMPERATURE_HUMIDITY', '{}', NOW(), NOW(), '{"type": "cyclic", "every": "PT30S"}', 'Read temperature and humidity from device 3', 0, 'INACTIVE');
