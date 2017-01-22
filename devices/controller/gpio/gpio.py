import sys
import RPi.GPIO as GPIO
import time
GPIO.setmode(GPIO.BCM)
GPIO.setwarnings(False)
GPIO.setup(18,GPIO.OUT)

GPIO.output(18,GPIO.HIGH)
time.sleep(0.2)
GPIO.output(18,GPIO.LOW)

print '{"httpCode": "200", "type": "SUCCESS", "message": "Wrote '+sys.argv[2]+' to pin '+sys.argv[1]+'."}'
