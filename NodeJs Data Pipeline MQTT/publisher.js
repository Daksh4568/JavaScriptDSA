const mqtt = require("mqtt")

const client = mqtt.connect("mqtt://broker.hivemq.com")

client.on("connect" , ()=>{
    console.log("publisher connected to HiveMQ Broker")
    setInterval(()=>{
        const num = Math.floor(Math.random()*100);
        if(num<50){
            console.log(`Publishing: ${num}`)
            client.publish("test/random" , String(num))
        }else{
            console.log(`Skipped Number >=50 ${num}`)
        }
    }, 5000)
});