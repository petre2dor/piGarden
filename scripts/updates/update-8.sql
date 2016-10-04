
DROP TABLE IF EXISTS `configs`;
CREATE TABLE `configs`(
    `name`          varchar(100) NOT NULL PRIMARY KEY,
    `value`         varchar(255) NOT NULL,
    `options`       text COMMENT 'save more settings here as json',
    `description`   varchar(255)
);

INSERT INTO `configs` (name, value, description)
VALUES ('AH_RETRIES_NO', '15', 'How many times will AH retry an action until it will set it to ERROR');

ALTER TABLE actions ADD COLUMN retries SMALLINT DEFAULT 0;
