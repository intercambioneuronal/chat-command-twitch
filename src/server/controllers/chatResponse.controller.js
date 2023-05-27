const getConsole=async (req,res)=>{
    //const url=req.query.url;
    const cssFile="console.css"
    //let results=await getContent(url)
    if(true){
        res.render('chatResponse',{cssFile});        
    }
    else{
        //res.redirect(url);
    }    
}
module.exports={
    getConsole
}