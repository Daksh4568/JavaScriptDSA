const mqtt = require('mqtt');
const fs = require('fs');
const path = require('path');
const {generateSensorData} = require('../utils/dataGenerator');

const config = require('../config/sensors.json');
const client = mqtt.connect('mqtt://broker.hivemq.com');

client.on('connect', ()=>{
    console.log('Aggregator connected to MQTT broker');

    config.sensors.forEach(sensor =>{
        setInterval(()=>{
            const data = {
                sensorId: sensor.id,
                type: sensor.type,
                timeStamp: new Date().toISOString(),
            };

            for(const [attr , type] of Object.entries(sensor.attributes)){
                data[attr] = generateSensorData(type);
            }
            const topic = `car/sensors/${sensor.id}`;
            client.publish(topic, JSON.stringify(data))
                console.log(`Published from ${sensor.id} to topic ${topic}` , data);
        } ,sensor.interval);    
    });
});

//ptp




