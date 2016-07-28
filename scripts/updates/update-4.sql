
DROP TABLE IF EXISTS `actions`;
CREATE TABLE IF NOT EXISTS `actions` (
    `id`            int(11) UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `area_id`       int(11),
    `verb`          char(25) COMMENT 'save a verb like READ, WRITE, START, OPEN, STOP, CHECK_PROGRESS..',
    `object`        char(25) COMMENT 'save a code like AREA, TEMPERATURE...',
    `options`       text COMMENT 'a json with options',
    `last_run_time` TIMESTAMP DEFAULT 0,
    `next_run_time` TIMESTAMP DEFAULT 0,
    `schedule`      text NOT NULL COMMENT 'json {start: {every: 60}/{at:[7:10:11, 13:01:00]}, CHECK_PROGRESS: {every: 60}}',
    `description`   text NOT NULL,
    `is_running`    boolean,
    `status`        char(25) COMMENT 'ACTIVE, INACTIVE, DELETED'
);


-- id      => 1
-- area_id => 12
-- verb    => CHECK
-- object  => IRRIGATION
-- options => 5min and/or 100l
-- next_run_time => 7:01:00
-- is_running => 1
