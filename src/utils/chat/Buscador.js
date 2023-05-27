class Expresion{
    expresionRegular;
    constructor(exp,flags){
        this.expresionRegular= new RegExp(exp,flags);
    }
    buscaEn(texto){
        const array=[...texto.matchAll(this.expresionRegular)];
        return array;
    }
}
class Buscador{
    texto;
    constructor(texto){
        this.texto=texto;
    }
    getResults(exp,flags){
        const expresion= new Expresion(exp,flags);
        const resultados= expresion.buscaEn(this.texto);
        return resultados;
    }
    hasResult(resultados){
        let result=false;
        if(resultados && resultados.length>0){
            result=true;
        }
        return result;
    }
}
module.exports={Buscador};