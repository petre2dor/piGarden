import sys

print '{"httpCode": "200", "type": "SUCCESS", "message": "All good from data pin '+sys.argv[1]+' and clock pin '+sys.argv[2]+'.", "data": [{"type": "TEMPERATURE", "value": "20.42"}, {"type": "HUMIDITY", "value": "42.20"}]}'
