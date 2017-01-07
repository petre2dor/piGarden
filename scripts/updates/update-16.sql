-- add area 2
INSERT INTO areas(id, name, description, status, options) VALUES (2, 'Area 2', 'This is area 2', 'ACTIVE', '{}');
-- add device 2 to area 2
INSERT INTO areas_devices(area_id, device_id, status, options) VALUES (2, 2, 'ACTIVE', '{}');
