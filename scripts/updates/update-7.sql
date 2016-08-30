
-- add dummy valve actions

-- first a fixed action
INSERT INTO actions (area_id, verb, object, options, last_run_time, next_run_time, schedule, description, is_running, status)
VALUES (2, 'OPEN', 'VALVE', '{"DURATION": "PT1M"}', NOW(), NOW(), '{"type": "fixed"}', 'Open VALVE in area 2', 0, 'ACTIVE');

INSERT INTO actions (area_id, verb, object, options, last_run_time, next_run_time, schedule, description, is_running, status)
VALUES (2, 'CLOSE', 'VALVE', '{}', NOW(), NOW(), '{"type": "fixed"}', 'Close VALVE in area 2', 0, 'INACTIVE');


-- and a cyclic one
-- INSERT INTO actions (area_id, verb, object, options, last_run_time, next_run_time, schedule, description, is_running, status)
-- VALUES (3, 'OPEN', 'VALVE', '{"DURATION": "PT15M"}', NOW(), NOW(), '{"type": "cyclic", "every": "P2D"}', 'Open VALVE in area 3', 0, 'ACTIVE');
--
-- INSERT INTO actions (area_id, verb, object, options, last_run_time, next_run_time, schedule, description, is_running, status)
-- VALUES (3, 'CLOSE', 'VALVE', '{}', NOW(), NOW(), '{"type": "fixed"}', 'Close VALVE in area 3', 0, 'INACTIVE');


-- add a fixed quatity
-- INSERT INTO actions (area_id, verb, object, options, last_run_time, next_run_time, schedule, description, is_running, status)
-- VALUES (4, 'OPEN', 'VALVE', '{"QUATITY": "15L"}', NOW(), NOW(), '{"type": "fixed"}', 'Open VALVE in area 4', 0, 'ACTIVE');
--
-- INSERT INTO actions (area_id, verb, object, options, last_run_time, next_run_time, schedule, description, is_running, status)
-- VALUES (4, 'CHECK_PROGRESS', 'VALVE', '{}', NOW(), NOW(), '{"type": "cyclic", "every": "PT5S"}', 'Check progress VALVE in area 4', 0, 'INACTIVE');
--
-- INSERT INTO actions (area_id, verb, object, options, last_run_time, next_run_time, schedule, description, is_running, status)
-- VALUES (4, 'CLOSE', 'VALVE', '{}', NOW(), NOW(), '{"type": "fixed"}', 'Close VALVE in area 4', 0, 'INACTIVE');
