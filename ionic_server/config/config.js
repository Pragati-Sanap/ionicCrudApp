var config={
    port:1200,
     mongo:{
        hostname: 'localhost',
        port: '27017',
        db: 'classroom'
    }
};
config.mongo.url= 'mongodb://'+config.mongo.hostname+':'+config.mongo.port+'/'+config.mongo.db;

module.exports=config;