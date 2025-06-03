// const mqtt = require('mqtt');
// const { startSmartScheduler } = require('../utils//scheduler');

// const client = mqtt.connect('mqtt://broker.hivemq.com');

// // Simulate sensor data
// const testSensor = {
//   id: 'sensor_test_1',
//   interval: 2000,  // Every 2 seconds
//   attributes: {
//     temperature: 'int',
//     status: 'string',
//   }
// };

// // Function to generate random sensor data
// function generateRandomData(sensor) {
//   return {
//     sensorId: sensor.id,
//     timestamp: new Date().toISOString(),
//     temperature: Math.floor(Math.random() * 100),
//     status: Math.random() > 0.5 ? 'OK' : 'FAIL',
//   };
// }

// // Simulate network or processing delay (in ms)
// async function simulateDelay(min = 0, max = 400) {
//     const delay = Math.floor(Math.random() * (max - min + 1)) + min;
//     console.log(`[DelaySimulator] Introducing artificial delay: ${delay} ms`);
//     return new Promise(resolve => setTimeout(resolve, delay));
// }
// // When MQTT client connects
// client.on('connect', () => {
//   console.log('Connected to MQTT broker');

//   startSmartScheduler(testSensor, async (sensor) => {
//     // Simulate network delay before publishing the sensor data
    
//     const start = Date.now(); 
//     await simulateDelay(); 
//   const end = Date.now();
//   const delayApplied = end - start;

//   const data = generateRandomData(sensor);
//   const topic = `car/test/${sensor.id}`;

//     client.publish(topic, JSON.stringify(data), {}, (err) => {
//       if (!err) {
//         console.log(`[${new Date().toLocaleTimeString()}] Published to ${topic}:`, data);
//          console.log(`[Publish Delay Info] Artificial delay was ${delayApplied} ms`);

//       } else {
//         console.error('MQTT Publish Error:', err);
//       }
//     });
//   });
// });

const mqtt = require('mqtt');
const { startSmartScheduler } = require('../utils/scheduler'); // fixed double slash

const client = mqtt.connect('mqtt://broker.hivemq.com');

// Simulate sensor config
const testSensor = {
  id: 'sensor_test_1',
  interval: 2000,  // Expected to publish every 2 seconds
  attributes: {
    temperature: 'int',
    status: 'string',
  }
};

// Generate random data
function generateRandomData(sensor) {
  return {
    sensorId: sensor.id,
    timestamp: new Date().toISOString(),
    temperature: Math.floor(Math.random() * 100),
    status: Math.random() > 0.5 ? 'OK' : 'FAIL',
  };
}

// Simulate artificial delay
async function simulateDelay(min = 0, max = 400) {
  const delay = Math.floor(Math.random() * (max - min + 1)) + min;
  console.log(`[DelaySimulator] Introducing artificial delay: ${delay} ms`);
  return new Promise(resolve => setTimeout(resolve, delay));
}

client.on('connect', () => {
  console.log('Connected to MQTT broker');

  // Inside the callback of startSmartScheduler, we will introduce an artificial delay
  // before publishing the sensor data to simulate network or processing delays
  // Generate sensor data using the testSensor configuration
  // and publish it to the MQTT broker at the specified interval
  // Logs the results and delay information
  // This function is called by bthe smart scheduler at the interval defined in the sensor configuration - not just blindly every 2 seconds
  
  startSmartScheduler(testSensor, async (sensor) => {
    // Introduce artificial network delay
    const delayStart = Date.now();
    await simulateDelay();
    const delayEnd = Date.now();
    const delayApplied = delayEnd - delayStart;

    const data = generateRandomData(sensor);
    const topic = `car/test/${sensor.id}`;

    // Publish data to MQTT broker
    client.publish(topic, JSON.stringify(data), {}, (err) => {
      if (!err) {
        console.log(`[${new Date().toLocaleTimeString()}] Published to ${topic}:`, data);
        console.log(`[Publish Delay Info] Artificial delay was ${delayApplied} ms`);
      } else {
        console.error('MQTT Publish Error:', err);
      }
    });
  });
});
