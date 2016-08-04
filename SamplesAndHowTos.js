
// logModel.setAreaId(1)
// logModel.setDeviceId(1)
// logModel.setType('ACTION_RUNNER')
// logModel.setDescription('Starting ActionRunner')
// logModel.insert()

INSERT INTO actions (area_id, verb, object, options, last_run_time, next_run_time, schedule, description, is_running, status)
VALUES (1, 'READ', 'TEMPERATURE', '{}', NOW(), NOW(), '{start: {every: 60}}', 'Read temperature from Area 1', 0, 'ACTIVE');


INSERT INTO actions (area_id, verb, object, options, last_run_time, next_run_time, schedule, description, is_running, status)
VALUES (2, 'WRITE', 'HUMIDITY', '{}', NOW(), NOW(), '{start: {every: 30}}', 'Read humidity from Area 2', 0, 'ACTIVE');


INSERT INTO actions (area_id, verb, object, options, last_run_time, next_run_time, schedule, description, is_running, status)
VALUES (3, 'SLEEP', 'HUMIDITY', '{}', NOW(), NOW(), '{start: {every: 30}}', 'Read humidity from Area 2', 0, 'ACTIVE');


INSERT INTO actions (area_id, verb, object, options, last_run_time, next_run_time, schedule, description, is_running, status)
VALUES (4, 'WALK', 'TEMPERATURE', '{}', NOW(), NOW(), '{start: {every: 60}}', 'Read temperature from Area 1', 0, 'ACTIVE');


INSERT INTO actions (area_id, verb, object, options, last_run_time, next_run_time, schedule, description, is_running, status)
VALUES (5, 'WASH', 'HUMIDITY', '{}', NOW(), NOW(), '{start: {every: 30}}', 'Read humidity from Area 2', 0, 'ACTIVE');


INSERT INTO actions (area_id, verb, object, options, last_run_time, next_run_time, schedule, description, is_running, status)
VALUES (6, 'REPEAT', 'HUMIDITY', '{}', NOW(), NOW(), '{start: {every: 30}}', 'Read humidity from Area 2', 0, 'ACTIVE');
