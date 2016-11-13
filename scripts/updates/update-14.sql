ALTER TABLE actions DROP COLUMN `area_id`;
ALTER TABLE actions ADD COLUMN `device_id` int(11) NOT NULL AFTER `id`;


-- inactivate all actions
UPDATE actions SET status = 'INACTIVE';



--
-- insert area
INSERT INTO areas
(id, name, description, status, options)
VALUES
(1, 'Area 1', 'This is area 1', 'ACTIVE', '{}');



-- clear device table
TRUNCATE TABLE devices;

--
-- insert TMP36 analog temperature sensor
INSERT INTO devices
(id, name, type, description, status, options)
VALUES
(1, 'TMP36', 'ANALOG', 'TMP36 analog temperature sensor', 'ACTIVE', '{}');

-- set this device in area 1
INSERT INTO areas_devices
(area_id, device_id, status, options)
VALUES
(1, 1, 'ACTIVE', '{}');

-- set this device to an action
UPDATE actions
SET device_id = 1, status = 'INACTIVE', description = 'Read temperature from device 1'
WHERE verb = 'READ' AND object = 'TEMPERATURE';






--
-- insert FW1S analog humidity sensor
INSERT INTO devices
(id, name, type, description, status, options)
VALUES
(2, 'FW1S', 'ANALOG', 'FW1S analog humidity sensor', 'ACTIVE', '{}');

-- set this device in area 1
INSERT INTO areas_devices
(area_id, device_id, status, options)
VALUES
(1, 2, 'ACTIVE', '{}');


-- set this device to an action
UPDATE actions
SET device_id = 2, status = 'INACTIVE', description = 'Read humidity from device 2'
WHERE verb = 'READ' AND object = 'HUMIDITY';






--
-- insert DS18B20 digital humidity sensor
INSERT INTO devices
(id, name, type, description, status, options)
VALUES
(3, 'DS18B20', 'DIGITAL', 'DS18B20 digital humidity sensor', 'ACTIVE', '{}');

-- set this device in area 1
INSERT INTO areas_devices
(area_id, device_id, status, options)
VALUES
(1, 3, 'ACTIVE', '{}');

-- insert action for reading this device
INSERT INTO actions
(device_id, verb, object, options, last_run_time, next_run_time, schedule, description, is_running, status)
VALUES
(3, 'READ', 'TEMPERATURE', '{}', NOW(), NOW(), '{"type": "cyclic", "every": "PT30S"}', 'Read temperature from device 2', 0, 'INACTIVE');
