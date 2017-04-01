import sys
import RPi.GPIO as GPIO
import time
GPIO.setmode(GPIO.BCM)
GPIO.setwarnings(False)

PIN = int(sys.argv[1])

GPIO.setup(PIN, GPIO.OUT)

GPIO.output(PIN, GPIO.HIGH)
time.sleep(0.2)
GPIO.output(PIN, GPIO.LOW)

print '{"httpCode": "200", "type": "SUCCESS", "message": "Blick successful (pin '+str(PIN)+')."}'
