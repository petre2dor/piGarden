ALTER TABLE stats ADD COLUMN `area_id` int(11) NOT NULL FIRST;
ALTER TABLE stats ADD COLUMN `device_id` int(11) NOT NULL AFTER area_id;
