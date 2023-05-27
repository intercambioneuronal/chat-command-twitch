const socketio=require("socket.io");
const http=require('http');
const {PORT}=require('../constants/config')
class Socket{
    io;
    constructor(){        
    }
    connect(server){ 
        let app=server.getApp();    
        const newServer=http.createServer(app);  
        newServer.listen(PORT,()=>{console.log(`Listening on port ${PORT}`)}) 
        this.io=socketio(newServer,{'transports': ['websocket', 'polling']});
    }
    emit(emitter){
        this.io.emit(emitter.event,emitter.data);        
    }
    handle(handlers){
        for (let index = 0; index < handlers.length; index++) {
            const handler = handlers[index];
            let newhandler = handler.handler.call(this, this.io)
            this.io.on(handler.event,newhandler)
        }
    }
}
module.exports={Socket};