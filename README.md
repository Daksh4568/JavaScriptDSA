A Node.js-based MQTT pipeline that simulates sensor data publishing with **smart scheduling** and supports attribute-level filtering for **efficient data ingestion**.

⚙️ Features

* ✅ MQTT-based sensor data publishing using [HiveMQ](http://broker.hivemq.com)
* ⏱ Smart timing compensation: adjusts next publish time based on actual delays
* 🧪 Test sensor simulator with artificial network delays
* 🎯 Attribute-level MQTT topic structure (`car/sensors/{sensorId}/{attribute}`)
* 💾 JSON-based sensor configuration
* 📥 CLI-based MQTT subscriber for filtered data viewing



#### 1. **Clone and Install**

```bash
git clone <repo-url>
cd mqtt-smart-pipeline
npm install
```

#### 2. **Project Structure**

```
├── aggregator/               # Handles smart scheduling & publishes to MQTT
├── subscriber/               # CLI MQTT client with attribute filtering
├── utils/
│   └── scheduler.js          # SmartScheduler logic
├── config/
│   └── sensors.json          # Define sensor config (interval, attributes)
├── test/
│   └── testScheduler.js      # Simulates one sensor with network delay
```

---

 ▶️ Run Simulated Sensor Publisher

```bash
node test/testScheduler.js
```

This uses `startSmartScheduler()` to publish data for a test sensor every \~2s, adjusted for delay drift.

---

### 📡 Subscribe to MQTT Data

```bash
node subscriber/subscriber.js --sensor=sensor_test_1 --attribute=temperature
```

Subscribe to a specific sensor and attribute, e.g., `car/sensors/sensor_test_1/temperature`.

---

### 🧠 SmartScheduler Logic

* Computes **drift**: actual delay - expected interval
* Applies **compensation**: next delay = expected - drift
* Ensures consistent interval-based publishing, even with network delay

