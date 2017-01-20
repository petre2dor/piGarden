
// logModel.setAreaId(1)
// logModel.setDeviceId(1)
// logModel.setType('ACTION_RUNNER')
// logModel.setDescription('Starting ActionRunner')
// logModel.insert()

----------------------------------------------------
----------------------------------------------------
-- add dummy valve actions
--
-- first a fixed action
-- INSERT INTO actions (device_id, verb, object, options, last_run_time, next_run_time, schedule, description, is_running, status)
-- VALUES (2, 'OPEN', 'VALVE', '{"DURATION": "PT1M"}', NOW(), NOW(), '{"type": "fixed"}', 'Open VALVE in area 2', 0, 'ACTIVE');
--
-- INSERT INTO actions (device_id, verb, object, options, last_run_time, next_run_time, schedule, description, is_running, status)
-- VALUES (2, 'CLOSE', 'VALVE', '{}', NOW(), NOW(), '{"type": "fixed"}', 'Close VALVE in area 2', 0, 'INACTIVE');


-- and a cyclic one
-- INSERT INTO actions (device_id, verb, object, options, last_run_time, next_run_time, schedule, description, is_running, status)
-- VALUES (3, 'OPEN', 'VALVE', '{"DURATION": "PT15M"}', NOW(), NOW(), '{"type": "cyclic", "every": "P2D"}', 'Open VALVE in area 3', 0, 'ACTIVE');
--
-- INSERT INTO actions (device_id, verb, object, options, last_run_time, next_run_time, schedule, description, is_running, status)
-- VALUES (3, 'CLOSE', 'VALVE', '{}', NOW(), NOW(), '{"type": "fixed"}', 'Close VALVE in area 3', 0, 'INACTIVE');


-- add a fixed quatity
-- INSERT INTO actions (device_id, verb, object, options, last_run_time, next_run_time, schedule, description, is_running, status)
-- VALUES (4, 'OPEN', 'VALVE', '{"QUATITY": "15L"}', NOW(), NOW(), '{"type": "fixed"}', 'Open VALVE in area 4', 0, 'ACTIVE');
--
-- INSERT INTO actions (device_id, verb, object, options, last_run_time, next_run_time, schedule, description, is_running, status)
-- VALUES (4, 'CHECK_PROGRESS', 'VALVE', '{}', NOW(), NOW(), '{"type": "cyclic", "every": "PT5S"}', 'Check progress VALVE in area 4', 0, 'INACTIVE');
--
-- INSERT INTO actions (device_id, verb, object, options, last_run_time, next_run_time, schedule, description, is_running, status)
-- VALUES (4, 'CLOSE', 'VALVE', '{}', NOW(), NOW(), '{"type": "fixed"}', 'Close VALVE in area 4', 0, 'INACTIVE');



// -- insert devices
// -- insert TMP36 analog temperature sensor
// INSERT INTO devices
// (id, name, type, description, status, options)
// VALUES
// (1, 'TMP36', 'ANALOG', 'TMP36 analog temperature sensor', 'ACTIVE', '{"js_file":"read_tmp36"}');
//
// -- set this device in area 1
// INSERT INTO areas_devices (area_id, device_id, status, options) VALUES (1, 1, 'ACTIVE', '{}');



var Duration        = require('js-joda').Duration
var LocalDateTime   = require('js-joda').LocalDateTime

// obtain a Duration of 10 hours
// console.log(Duration.parse("PT10H")) // "PT10H"


var dt = LocalDateTime.parse('2012-12-24T12:00')

console.log(dt.dayOfWeek().toString())


// add a new device
INSERT INTO actions (id, device_id, verb, object, options, last_run_time, next_run_time, schedule, description, is_running, status)
VALUES (4, 4, 'READ', 'TEMPERATURE', '{}', NOW(), NOW(), '{"type": "cyclic", "every": "PT20S"}', 'Read inside temperature', 0, 'INACTIVE');

INSERT INTO devices  (id, name, type, description, status, options)
VALUES (4, 'Inside DS18B20', 'DIGITAL', 'DS18B20 digital temperature sensor', 'ACTIVE', '{"js_file":"ds18b20/read_ds18b20","id":"28-0416800cffff"}');

INSERT INTO areas_devices (area_id, device_id, status, options) VALUES (2, 4, 'ACTIVE', '{}');



// add a led
--
-- insert LED
INSERT INTO devices (id, name, type, description, status, options)
VALUES (4, 'LED', 'GPIO', 'Standard LED', 'ACTIVE', '{"js_file":"gpio/write","GPIOpin":"18","value":"1"}');

-- set this device in area 2
INSERT INTO areas_devices (area_id, device_id, status, options) VALUES (2, 4, 'ACTIVE', '{}');


-- insert an action to turn on the LED
INSERT INTO actions (device_id, verb, object, options, last_run_time, next_run_time, schedule, description, is_running, status)
VALUES (4, 'WRITE', 'LED', '{}', NOW(), NOW(), '{"type": "cyclic", "every": "PT3S"}', 'Blink LED', 0, 'INACTIVE');
