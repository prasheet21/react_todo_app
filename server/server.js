const express = require('express') ;
const mongo = require('mongodb') ;
const cors = require('cors') ;
// const bodyParser = require('body-parser') ;

const app = express() ;
app.use(cors({
    origin : '*'
}))

const mongoClient = mongo.MongoClient ;
let database = undefined ;

mongoClient.connect(' mongodb://127.0.0.1:27017/' , {useUnifiedTopology:true} , (error , db) => {
    
try{
    database = db.db("todo_list") ;
    console.log("Mongo server connected successfully") ;
}catch(e) {
    console.log(e) ;
    return;
}
    
        
    
})

// app.use(bodyParser.json()) ;

let AllTasks = []

app.get('/getAllTask' , async(req , res) => {
    console.log("Get all task is called") ;
    let alldata = await database.collection("todo_task").find({}).toArray() ; 
    res.json(alldata)
}) ;

app.get('/clearList' , async(req , res) => {
    res.json(await database.collection("todo_task").remove({})) ;

})

app.get("/deleteTask" , async(req , res) => {
    let incomingId = req.query.id ;
    console.log("This is incoming id : " , incomingId) ;
    await database.collection("todo_task").removeOne({_id : mongo.ObjectId(incomingId)}) ;
    res.status(200).send() ;
})

app.get("/editTask" , (req , res) => {
    let newTask = req.query.newTask ;
    let id = req.query.id ;
    database.collection("todo_task").update({'_id' : mongo.ObjectId(id)} ,{ $set:{'task' : newTask}})
    res.status(200).send() ;
})

app.get('/addTask' , async(req , res) => {
    let newTask = req.query.newTask ;
    await database.collection("todo_task").insertOne({task:newTask}) ;
    res.status(200).send() ;    
})

app.listen(8080 , () => console.log('Server Started Successsfully')) ;