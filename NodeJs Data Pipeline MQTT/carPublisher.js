const mqtt = require('mqtt');
const client = mqtt.connect('mqtt://broker.hivemq.com');
const topic = 'car/sensors';

function generateSensorData(carId) {
  return {
    carId,
    speed: Math.floor(Math.random() * 120),       
    engineTemp: (70 + Math.random() * 50).toFixed(2), 
    fuelLevel: Math.floor(Math.random() * 100), 
    gps: {
      lat: (37 + Math.random()).toFixed(6),
      lon: (-122 + Math.random()).toFixed(6),
    },
    timestamp: new Date().toISOString()
  };
}

client.on('connect', () => {
  console.log('🚗 Publisher connected to MQTT broker');

  const interval = setInterval(() => {
    const bulkData = [];

    for (let i = 0; i < 20; i++) {
      const carId = `car-${Math.floor(Math.random() * 100) + 1}`;
      bulkData.push(generateSensorData(carId));
    }

    const payload = JSON.stringify(bulkData);
    client.publish(topic, payload);
    console.log(`📤 Published batch of ${bulkData.length} records`);
  }, 3000);
});
