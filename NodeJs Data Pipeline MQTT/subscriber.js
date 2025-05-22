const mqtt = require("mqtt")
const client = mqtt.connect("mqtt://broker.hivemq.com")

client.on("connect",()=>{
    console.log("Subscriber connected")

    client.subscribe("test/random",(err)=>{
        if(!err){
            console.log("Subscribed to topic")
        }else{
            console.error("Subscription error")
        }
    });
});

client.on("message" , (topic,message)=>{
    console.log(`Received on ${topic}: ${message.toString()}`);
})





