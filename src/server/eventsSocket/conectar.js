function conectar(io) {
    return function (socket,data) {
        console.log('user connected');        
    }
}
module.exports={conectar};