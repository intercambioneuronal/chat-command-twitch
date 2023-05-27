const express=require("express");

class Server{
    app;
    express;
    constructor(){
        this.express=express;
        this.app=express();
    }
    getApp(){
        return this.app;
    }
    set(settings){
        for (let index = 0; index < settings.length; index++) {
            const setting = settings[index];
            this.app.set(setting.key,setting.value);          
        }
    }
    use(middlewares){
        for (let index = 0; index < middlewares.length; index++) {
            const middleware = middlewares[index];
            this.app.use(...middleware);
        }
    }
    listen(){
        let port=this.app.get('port');
        this.app.listen(port);
        console.log(`Server is on port ${port}`)
    }
}
module.exports={Server};