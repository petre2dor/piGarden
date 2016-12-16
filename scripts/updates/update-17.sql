
--
-- insert DHT22 analog temperature sensor
INSERT INTO devices
(id, name, type, description, status, options)
VALUES
(6, 'DHT22', 'DIGITAL', 'DHT22 digital temperature/humidity sensor', 'ACTIVE', '{"js_file":"read_dht22"}');

-- set this device in area 1
INSERT INTO areas_devices
(area_id, device_id, status, options)
VALUES
(1, 6, 'ACTIVE', '{}');

-- insert an action for this device
INSERT INTO actions
(device_id, verb, object, options, last_run_time, next_run_time, schedule, description, is_running, status)
VALUES
(6, 'READ', 'TEMPERATURE_HUMIDITY', '{}', NOW(), NOW(), '{"type": "cyclic", "every": "PT30S"}', 'Read temperature and humidity from device 6', 0, 'ACTIVE');



-- update js_file for other devices
UPDATE devices
SET options = '{"js_file":"tmp36/read_tmp36"}'
WHERE id = 1;

UPDATE devices
SET options = '{"js_file":"fw1s/read_fw1s"}'
WHERE id = 2;

UPDATE devices
SET options = '{"js_file":"ds18b20/read_ds18b20"}'
WHERE id = 3;
