const redis = require("redis");

const client = redis.createClient("//redis-15604.c83.us-east-1-2.ec2.cloud.redislabs.com:15604",{
    password:"FoIsMNsVDsP98jf6VdXdU7KhuE1puz9o"
});

client.on("ready", ()=>{
    console.log("Ready")
});
client.on("error", ()=>{
    console.log("error")
});
client.on("connect", ()=>{
    console.log("connect");
});
client.on("end", ()=>{
    console.log("end");
})

client.quit();