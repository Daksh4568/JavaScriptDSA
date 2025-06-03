// const mqtt = require('mqtt');
// const fs = require('fs');
// const path = require('path');
// const {generateSensorData} = require('../utils/dataGenerator');

// const config = require('../config/sensors.json');
// const client = mqtt.connect('mqtt://broker.hivemq.com');

// client.on('connect', ()=>{
//     console.log('Aggregator connected to MQTT broker');

//     config.sensors.forEach(sensor =>{
//         setInterval(()=>{
//             const data = {
//                 sensorId: sensor.id,
//                 type: sensor.type,
//                 timeStamp: new Date().toISOString(),
//             };

//             for(const [attr , type] of Object.entries(sensor.attributes)){
//                 data[attr] = generateSensorData(type);
//             }
//             const topic = `car/sensors/${sensor.id}`;
//             client.publish(topic, JSON.stringify(data))
//                 console.log(`Published from ${sensor.id} to topic ${topic}` , data);
//         } ,sensor.interval);    
//     });
// });
const mqtt = require('mqtt');
const { generateSensorData } = require('./utils/dataGenerator');
const config = require('./config/sensors.json');
const { startSmartScheduler } = require('./scheduler/scheduler');

const client = mqtt.connect('mqtt://broker.hivemq.com');

client.on('connect', () => {
  console.log('Publisher connected to MQTT broker');

  config.sensors.forEach(sensor => {
    startSmartScheduler(sensor, (sensorConfig) => {
      const data = {
        sensorId: sensorConfig.id,
        type: sensorConfig.type,
        timestamp: new Date().toISOString()
      };

      for (const [attr, type] of Object.entries(sensorConfig.attributes)) {
        data[attr] = generateSensorData(type);
      }

      const topic = `car/sensors/${sensorConfig.id}`;
      client.publish(topic, JSON.stringify(data));
      console.log(`Published to ${topic}:`, data);
    });
  });
});
