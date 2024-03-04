const express=require('express')
const router=express.Router()

router.post('/foodData',(req,res)=>{
    try{
        // console.log(global.Food_items);
        res.send([global.Food_items, global.Food_Category])

    }catch(error){
        console.log(error.message);
        res.send("server error")
    }
})
module.exports=router;