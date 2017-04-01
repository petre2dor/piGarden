import time
import sys
import RPi.GPIO as GPIO
#set up GPIO using BCM numbering

PIN = int(sys.argv[1])

GPIO.setmode(GPIO.BCM)
GPIO.setup(PIN, GPIO.IN)

readTime = 3 #sec
readEvery = 0.25 #sec
timePassed = 0

watherDetected = False
while timePassed < readTime:
        pin = GPIO.input(PIN)
        if pin < 1:
                watherDetected = True
        timePassed += readEvery
        time.sleep(readEvery)
GPIO.cleanup(PIN)
print '{"httpCode": "200", "type": "SUCCESS", "message": "All good.", "data": {"type": "RAINING", "value": "'+str(int(watherDetected))+'"}}'
