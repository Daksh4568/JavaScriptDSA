const mqtt = require('mqtt');
const fs = require('fs');

const client = mqtt.connect('mqtt://broker.hivemq.com');
const topic = 'car/sensors';

client.on('connect', () => {
  console.log('📥 Subscriber connected');
  client.subscribe(topic, () => {
    console.log(`📡 Subscribed to topic: ${topic}`);
  });
});

client.on('message', (topic, message) => {
  try {
    const data = JSON.parse(message.toString());
    if (Array.isArray(data)) {
      console.log(`📩 Received batch of ${data.length} records`);
      data.forEach(record => {
        fs.appendFileSync('output.jsonl', JSON.stringify(record) + '\n');
      });
    }
  } catch (err) {
    console.error('❌ Failed to parse incoming data:', err.message);
  }
});
