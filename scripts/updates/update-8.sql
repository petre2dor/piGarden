

INSERT INTO actions (area_id, verb, object, options, last_run_time, next_run_time, schedule, description, is_running, status)
VALUES (2, 'OPEN', 'VALVE', '{"DURATION": "1M"}', NOW(), NOW(), '{"type": "fixed"}', 'Open VALVE in area 2', 0, 'ACTIVE');

INSERT INTO actions (area_id, verb, object, options, last_run_time, next_run_time, schedule, description, is_running, status)
VALUES (2, 'CLOSE', 'VALVE', '{}', NOW(), NOW(), '{"type": "fixed"}', 'Close VALVE in area 2', 0, 'DISABLED');



INSERT INTO actions (area_id, verb, object, options, last_run_time, next_run_time, schedule, description, is_running, status)
VALUES (3, 'OPEN', 'VALVE', '{"DURATION": "15M"}', NOW(), NOW(), '{"type": "cyclic", "every": "P2D"}', 'Open VALVE in area 2', 0, 'ACTIVE');

INSERT INTO actions (area_id, verb, object, options, last_run_time, next_run_time, schedule, description, is_running, status)
VALUES (3, 'CLOSE', 'VALVE', '{}', NOW(), NOW(), '{"type": "fixed"}', 'Close VALVE in area 2', 0, 'DISABLED');
