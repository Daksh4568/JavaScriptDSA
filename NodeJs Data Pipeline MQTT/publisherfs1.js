const fs = require('fs');
const mqtt = require('mqtt');

const client = mqtt.connect('mqtt://broker.hivemq.com');
const topic = 'test/fruit';

const lines = fs.readFileSync('input.txt', 'utf8').split('\n').filter(Boolean);

let index = 0;

client.on('connect', () => {
  console.log('📤 Publisher connected to HiveMQ');

  const interval = setInterval(() => {
    if (index < lines.length) {
      const line = lines[index++];
      client.publish(topic, line);
      console.log(`📤 Sent: ${line}`);
    } else {
      clearInterval(interval);
      console.log('✅ All data published.');
      client.end();
    }
  }, 2000); 
});
