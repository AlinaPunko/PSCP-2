const redis = require('redis');

const pub_client = redis.createClient("//redis-15604.c83.us-east-1-2.ec2.cloud.redislabs.com:15604",{
    password:"FoIsMNsVDsP98jf6VdXdU7KhuE1puz9o"
});

setTimeout(()=>pub_client.publish('channel-01', 'from pub_client message 3'), 10000);
setTimeout(()=>pub_client.publish('channel-01', 'from pub_client message 4'), 20000);
setTimeout(()=>pub_client.publish('channel-01', 'from pub_client message 5'), 30000);
setTimeout(()=>pub_client.publish('channel-01', 'from pub_client message 6'), 40000);

setTimeout(()=>{
    pub_client.quit();
}, 60000);