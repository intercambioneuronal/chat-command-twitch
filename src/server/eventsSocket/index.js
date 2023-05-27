
const {conectar}=require('./conectar')
const eventHandlerSocket=[
    {
        event:"connection",
        handler:conectar
    }
]
module.exports=eventHandlerSocket;