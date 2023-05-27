const {Server}=require('./server/Server');
const {Socket}= require('./server/Socket')
const {Tmi}=require('./server/Tmi');
const {routes}=require('./server/routes')
const eventHandlerTMI=require('./server/eventsClient')
const eventHandlerSocket=require('./server/eventsSocket')
const path=require('path');
const {PORT,USERNAME_TMI,PASSWORD_TMI,CHANNELS_TMI,
URL_OBS,PASSWORD_OBS}=require('./constants/config')
const server= new Server();
const client= new Tmi();
const socket= new Socket();
const settings=[
    {key:'port',value:PORT},
    {key:'view engine',value:'ejs'},
    {key:'views',value:path.join(__dirname,'/server/views')}
] 
const middlewares=[
    [server.express.static(path.join(__dirname,'../static'))],
    [server.express("json")]
]
const optionsClient={
    identity:{
        username:USERNAME_TMI,
        password:PASSWORD_TMI
    },
    channels:[CHANNELS_TMI]
}
async function init(){
    server.set(settings);
    server.use(middlewares);
    server.use(routes);
    socket.connect(server);
    socket.handle(eventHandlerSocket);    
    client.connect(optionsClient);
    client.connectSocket(socket);
    client.handle(eventHandlerTMI);    
}
init();

