import sys
import RPi.GPIO as GPIO
from pi_sht1x import SHT1x


with SHT1x(24, 23, gpio_mode=GPIO.BCM, vdd='5V') as sensor:
    temperature = sensor.read_temperature()
    humidity = sensor.read_humidity()
    print '{"httpCode": "200", "type": "SUCCESS", "message": "All good.", "data": [{"type": "TEMPERATURE", "value": "'+str(temperature)+'"}, {"type": "HUMIDITY", "value": "'+str(humidity)+'"}]}'
