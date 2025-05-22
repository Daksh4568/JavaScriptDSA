const fs = require('fs');
const mqtt = require('mqtt');

const client = mqtt.connect('mqtt://broker.hivemq.com');
const topic = 'test/fruit';

client.on('connect', () => {
  console.log('📥 Subscriber connected');
  client.subscribe(topic, () => {
    console.log(`📥 Subscribed to ${topic}`);
  });
});

client.on('message', (topic, message) => {
  const msg = message.toString();
  console.log(`📩 Received: ${msg}`);

  fs.appendFileSync('output.txt', msg + '\n');
});
