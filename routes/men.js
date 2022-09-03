const express=require("express")
const route=new express.Router
const MensRanking = require("../models/mens")

route.post("/mens", async (req,res)=>{
    try{
        const record=new MensRanking(req.body);//data coming from postman in json format
        console.log(req.body);
        const addRecord= await record.save();
        res.send(addRecord).status(201);
    }catch(e){
        res.status(400).send(e);
    }
})
route.get("/mens", async (req,res)=>{
    try{
        const getRecords=await MensRanking.find({}).sort({"ranking":1});
        res.status(201).send(getRecords)
    }catch(e){
        res.status(400).send(e);
    }
})
//handling request for an individual based on ranking
route.get('/mens/:ranking', async (req,res)=>{
    try{
        const ranking=req.params.ranking;
        const getRecord=await MensRanking.find({ranking});
        res.send(getRecord);
    }catch(e){
        res.status(400).send(e);
    }
})
route.patch("mens/:id", async (req,res)=>{
    try{
        const _id= req.params.id;
        const getInfo=await MensRanking.findByIdAndUpdate(_id,req.body,{new:true}) //req.body comes from postman
        res.send(getInfo)
    }catch(e){
        res.status(500).send(e);
    }
})
route.delete("/mens/:id", async (req,res)=>{
    try{
        const id=req.params.id;
        const deleteRecord=await MensRanking.findByIdAndDelete(id);
        res.send(deleteRecord)
    }catch(e){
        res.status(500).send(e);
    }
})
module.exports=route;