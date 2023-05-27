const {Router}=require('express');
const chatResponseController= require('../../controllers/chatResponse.controller');
const router=Router();
router.get('/',chatResponseController.getConsole)
module.exports=router;