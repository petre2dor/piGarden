DROP TABLE IF EXISTS `stats`;
CREATE TABLE IF NOT EXISTS `stats` (
    `date`      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `type`      char(25) NOT NULL COMMENT 'save a code like TEMPERATURE|HUMIDITY',
    `value`     int(11) NOT NULL,
    `ext_data`  text COMMENT 'save more settings here as s',
    `status`    char(25) COMMENT 'ACTIVE|INACTIVE|DELETED'
);

-- adding some actions that should be implemented now/next
TRUNCATE actions;

INSERT INTO actions (area_id, verb, object, options, last_run_time, next_run_time, schedule, description, is_running, status)
VALUES (1, 'READ', 'TEMPERATURE', '{}', NOW(), NOW(), '{start: {every: 60}}', 'Read temperature from Area 1', 0, 'ACTIVE');


INSERT INTO actions (area_id, verb, object, options, last_run_time, next_run_time, schedule, description, is_running, status)
VALUES (2, 'READ', 'HUMIDITY', '{}', NOW(), NOW(), '{start: {every: 30}}', 'Read humidity from Area 2', 0, 'ACTIVE');
