const tmi=require("tmi.js");
class Tmi{
    client;
    socket;
    constructor(){        
    }
    connect(options){
        this.client= new tmi.Client(options);
        this.client.connect();
    }
    connectSocket(socket){
        this.socket=socket;
    }
    handle(handlers){
        for (let index = 0; index < handlers.length; index++) {
            const handler = handlers[index];
            let newhandler = handler.handler.call(this, this.client,this.socket)
            this.client.on(handler.event,newhandler)
        }
    }
}
module.exports={Tmi};