function conectar(io) {
    return function (socket,data) {
        console.log('user connected');
        console.log({socket,data});
    }
}
module.exports={conectar};