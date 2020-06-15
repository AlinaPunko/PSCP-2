const redis = require("redis");
const {performance} = require('perf_hooks');

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

client.set('count', 0);

const time1 = performance.now();
for(var i=0;i<10000;i++){
    client.incr('count', (err, result)=>{
        console.log(result);
        console.log(performance.now()-time1)
    })
}

// const time2 = performance.now();
// for(var i=0;i<10000;i++){
//     client.decr('count',(err, result)=>{
//         console.log(result);
//         console.log(performance.now()-time2)
//     })
// }


client.quit();