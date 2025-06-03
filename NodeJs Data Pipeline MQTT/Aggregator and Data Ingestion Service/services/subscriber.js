// const mqttSub = require('mqtt');
// const fsSub = require('fs');
// const pathSub = require('path');
// // const yargs = require('yargs');
// // const argv = yargs(hideBin(process.argv)).argv

// const configSub = require('../config/sensors.json');
// const clientSub = mqttSub.connect('mqtt://broker.hivemq.com');

// clientSub.on('connect',()=>{
//     console.log('Subscriber connected to MQTT broker');
//     configSub.sensors.forEach(sensor =>{
//         const topic = `car/test/${sensor.id}`;
//         clientSub.subscribe(topic, (err)=>{
//             if(err){
//                 console.error(`Failed to subscribe to topic ${topic}`, err);
//             } else {
//                 console.log(`Subscribed to topic ${topic}`);
//             }
//         });
//     });
// })
// clientSub.on('message',(topic, message)=>{
//     const data = JSON.parse(message.toString());
//    const logFile = pathSub.join(__dirname, '../data/sensor_data.json');
//    fsSub.appendFile(logFile, JSON.stringify(data) + '\n', (err)=>{
//        if(err){
//            console.error(`Failed to write data to file ${logFile}`, err);
//        } else {
//            console.log(`Data written to file` , data);
//        }
//    });
// })
const mqtt = require('mqtt');
const fs = require('fs');
const path = require('path');

const client = mqtt.connect('mqtt://broker.hivemq.com');

// Replace with the actual test sensor ID you're using in testScheduler
const testSensorId = 'sensor_test_1';
const topic = `car/test/${testSensorId}`;

client.on('connect', () => {
    console.log('Subscriber connected to MQTT broker');

    client.subscribe(topic, (err) => {
        if (err) {
            console.error(`Failed to subscribe to topic ${topic}`, err);
        } else {
            console.log(`Subscribed to topic ${topic}`);
        }
    });
});

client.on('message', (topic, message) => {
    try {
        const data = JSON.parse(message.toString());
        const logFile = path.join(__dirname, '../data/test_sensor_data.json');

        fs.appendFile(logFile, JSON.stringify(data) + '\n', (err) => {
            if (err) {
                console.error(`Failed to write data to file ${logFile}`, err);
            } else {
                console.log(`[${new Date().toLocaleTimeString()}] Received and saved data:`, data);
            }
        });
    } catch (err) {
        console.error('Error parsing message:', err);
    }
});
