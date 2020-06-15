const redis = require('redis');

const sub_client = redis.createClient("//redis-15604.c83.us-east-1-2.ec2.cloud.redislabs.com:15604",{
    password:"FoIsMNsVDsP98jf6VdXdU7KhuE1puz9o"
});

sub_client.on("subscribe", (channel, count)=>{
    console.log(`Subscribe, Channel ${channel} Count ${count}`)
});

sub_client.on("message", (channel, message)=>{
    console.log(`Subscribe, Channel ${channel} Message ${message}`)
});

sub_client.subscribe('channel-01');

setTimeout(()=>{
    sub_client.unsubscribe();
    sub_client.quit();
}, 60000);