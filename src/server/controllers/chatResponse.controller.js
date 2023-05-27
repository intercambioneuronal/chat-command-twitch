const getConsole=async (req,res)=>{
    
    const cssFile="console.css"    
    if(true){
        res.render('chatResponse',{cssFile});        
    }     
}
module.exports={
    getConsole
}