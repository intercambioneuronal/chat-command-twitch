const {Buscador}=require('./Buscador');

class BuscadorChat{  
    buscador;
    constructor(texto){        
        this.buscador=new Buscador(texto);
    }
    getCommands(){
        const resultados=this.buscador.getResults("!\\w+","ig");
        return resultados;
    }
    hasCommand(){
        const comandos=this.getCommands();
        const result=this.buscador.hasResult(comandos);
        return result;
    }
    getUsers(){
        const resultados=this.buscador.getResults("@\\w+","ig");
        return resultados;
    }
    hasUser(){
        const users=this.getUsers();
        const result=this.buscador.hasResult(users);
        return result;
    }
    getTokensCommand(){
        const resultados=this.buscador.getResults("\\s*!(\\S+)\\s*(\\S*)\\s*(\\S*)\\s*","ig");
        return resultados;
    }
    getTokensMessage(){
        const resultados=this.buscador.getResults("\\s*(\\S+)\\s*","ig");
        return resultados;
    }
    hasPairCommand(comandosPares){
        const tokens=this.getTokensCommand();
        const comando=tokens[0][1];
        const encontrado=comandosPares.find(comandoPar=>comandoPar.comandos.includes(comando));
        return encontrado?true:false;
    }
    getPairCommand(username,channel){
        let command={};
        const tokens=this.getTokensCommand();
        const comando=tokens[0][1];
        let primerParametro=(tokens[0][2])||"vacio";
        let segundoParametro=(tokens[0][3])||"vacio";
        if(segundoParametro=="vacio" && primerParametro=="vacio"){
            primerParametro=username;
            segundoParametro=channel;
        }
        if(segundoParametro=="vacio"){
            segundoParametro=primerParametro;
            primerParametro=username;
        }
        command={
            comando,
            primerParametro,
            segundoParametro
        }
        return command;
    }
    applyPairCommand(comandosPares,command){
        let result=""
        const actividad=comandosPares.find(comandoPar=>comandoPar.comandos.includes(command.comando));
        if(!actividad){
            return;
        }
        const {comando,primerParametro,segundoParametro}=command;
        const {rango,adicionales:adicionalesCompleto}=actividad;
        const {min,max}=rango;
        let porcentaje=Math.floor((Math.random()*(max-min))+min);
        let tagPorcentaje=`<span class='value-response'>${porcentaje}</span>`;
        const nivel=`El nivel de ${comando} entre ${primerParametro} y ${segundoParametro} alcanzó el ${tagPorcentaje}%. `
        result=nivel;
        const adicionales=adicionalesCompleto.find(ad=>ad.comando==comando);        
        if(!adicionales){
            return result; 
        }
        let respuesta=adicionales.respuestas.find(r=>porcentaje<=r.min);
        if(!respuesta){
            return result;
        }
        result+=respuesta.mensaje;
        return result;
    }
    applyPairCommand2(comandosPares,command){
        let result=[]
        const actividad=comandosPares.find(comandoPar=>comandoPar.comandos.includes(command.comando));
        if(!actividad){
            return;
        }
        const {comando,primerParametro,segundoParametro}=command;
        const {rango,adicionales:adicionalesCompleto}=actividad;
        const {min,max}=rango;
        let porcentaje=Math.floor((Math.random()*(max-min))+min);        
        const nivel=`El nivel de ${comando} entre ${primerParametro} y ${segundoParametro} alcanzó el `
        result.push({
            linea:[
                {class:'simple-text',content:nivel},
                {class:'value-response',content:porcentaje},
                {class:'simple-text',content:'%.'}
            ]
        });
        const adicionales=adicionalesCompleto.find(ad=>ad.comando==comando);        
        if(!adicionales){
            return result; 
        }
        let respuesta=adicionales.respuestas.find(r=>porcentaje<=r.min);        
        if(!respuesta){
            return result;
        }
        result.push({
            linea:[
                {class:'text',content:respuesta.mensaje}                
            ]
        });        
        return result;
    }
}
module.exports={BuscadorChat};