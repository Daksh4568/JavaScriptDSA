// const mqttSub = require('mqtt');
// const fsSub = require('fs');
// const pathSub = require('path');

// const configSub = require('../config/sensors.json');
// const clientSub = mqttSub.connect('mqtt://broker.hivemq.com');

// clientSub.on('connect',()=>{
//     console.log('Subscriber connected to MQTT broker');
//     configSub.sensors.forEach(sensor =>{
//         const topic = `car/sensors/${sensor.id}`;
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
const mqttSub = require('mqtt');
const fsSub = require('fs');
const pathSub = require('path');
// const yargs = require('yargs');
// const argv = yargs(hideBin(process.argv)).argv

const configSub = require('../config/sensors.json');
const clientSub = mqttSub.connect('mqtt://broker.hivemq.com');

clientSub.on('connect',()=>{
    console.log('Subscriber connected to MQTT broker');
    configSub.sensors.forEach(sensor =>{
        const topic = `car/sensors/${sensor.id}`;
        clientSub.subscribe(topic, (err)=>{
            if(err){
                console.error(`Failed to subscribe to topic ${topic}`, err);
            } else {
                console.log(`Subscribed to topic ${topic}`);
            }
        });
    });
})
clientSub.on('message',(topic, message)=>{
    const data = JSON.parse(message.toString());
   const logFile = pathSub.join(__dirname, '../data/sensor_data.json');
   fsSub.appendFile(logFile, JSON.stringify(data) + '\n', (err)=>{
       if(err){
           console.error(`Failed to write data to file ${logFile}`, err);
       } else {
           console.log(`Data written to file` , data);
       }
   });
})