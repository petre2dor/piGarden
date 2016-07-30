
// logModel.setAreaId(1)
// logModel.setDeviceId(1)
// logModel.setType('ACTION_RUNNER')
// logModel.setDescription('Starting ActionRunner')
// logModel.insert()

INSERT INTO actions (area_id, verb, object, options, last_run_time, next_run_time, schedule, description, is_running, status)
VALUES (1, 'READ', 'TEMPERATURE', '{}', NOW(), NOW(), '{start: {every: 60}}', 'Read temperature from Area 1', 0, 'ACTIVE');


INSERT INTO actions (area_id, verb, object, options, last_run_time, next_run_time, schedule, description, is_running, status)
VALUES (2, 'READ', 'HUMIDITY', '{}', NOW(), NOW(), '{start: {every: 30}}', 'Read humidity from Area 2', 0, 'ACTIVE');
