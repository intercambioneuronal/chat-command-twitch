
const {comandos}=require('./response')
const eventHandlerTMI=[
    {
        event:"message",
        handler:comandos
    }
]
module.exports=eventHandlerTMI;