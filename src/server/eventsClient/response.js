const {createInteraction}= require('../renders/interactions');
const {BuscadorChat}= require('../../utils/chat/BuscadorChat');
const {comandosPares}=require('../../constants/comandosPares');
const emotes=require('../../../static/json/emotes-global.json');

function replaceEmotes(texto){
    let {data}=emotes;
    let newTexto=texto;
    for (let index = 0; index < data.length; index++) {
        const emote = data[index];
        let expr='(?<!https)'+emote.name;
        const replacer= new RegExp(expr,'g');   

        const image=`<img class="inline" src="${emote.url}">`
        newTexto= newTexto.replace(replacer,image)
    }
    return newTexto; 
}

function makePlainText(lista){
    let salida='';
    for (let index = 0; index < lista.length; index++) {
        const parrafo = lista[index];
        let salidaParrafo='';
        for (let indexTexto = 0; indexTexto < parrafo.linea.length; indexTexto++) {
            const elemento = parrafo.linea[indexTexto];
            salidaParrafo+=`${elemento.content}`;            
        }
        salida+=`${salidaParrafo}`;
    }
    return salida;
}
function makeLines(lista){
    let salida='';
    for (let index = 0; index < lista.length; index++) {
        const parrafo = lista[index];
        let salidaParrafo='';
        for (let indexTexto = 0; indexTexto < parrafo.linea.length; indexTexto++) {
            const elemento = parrafo.linea[indexTexto];
            salidaParrafo+=`<span class="${elemento.class}">${elemento.content}</span>`;            
        }
        salida+=`<div class="text-respuesta">${salidaParrafo}</div>`;
    }
    return salida;
}
function comandos(client,socket) {
    return function (channel,tags,message,self) {
        if(self){
            return;
        }
        let resultado
        let command
        const chat=new BuscadorChat(message);
        
        if(chat.hasCommand()){            
            if(chat.hasPairCommand(comandosPares)){
                command=chat.getPairCommand(tags.username,channel);

                resultado=chat.applyPairCommand2(comandosPares,command);
            }
        }
        if(resultado){                    
            let htmlResult=makeLines(resultado);
            let plainResult=makePlainText(resultado);
            htmlResult=replaceEmotes(htmlResult);

            let interaction={
                comando:command.comando,
                parametros:command.primerParametro+", "+command.segundoParametro,
                respuesta:htmlResult
            }
            client.say(channel,plainResult);
            
            let dataSocket={
                selector:'#consola',
                value:createInteraction(interaction)
            }
            socket.emit({
                event:'add-element',
                data:dataSocket
                });
        }
    }
}
module.exports={comandos};