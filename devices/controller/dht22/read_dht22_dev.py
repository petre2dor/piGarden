import sys

print '{"httpCode": "200", "type": "SUCCESS", "message": "All good from pin '+sys.argv[1]+'.", "data": [{"type": "TEMPERATURE", "value": "23.44"}, {"type": "HUMIDITY", "value": "43.34"}]}'
