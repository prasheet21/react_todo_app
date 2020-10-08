const express = require('express') ;
const cors = require('cors') ;
// const bodyParser = require('body-parser') ;
const {v4} = require('uuid') ;

const app = express() ;
app.use(cors({
    origin : '*'
}))

// app.use(bodyParser.json()) ;

let AllTasks = []

app.get('/getAllTask' , (req , res) => {
    res.json(AllTasks) ;
}) ;

app.get('/clearList' , (req , res) => {
    AllTasks = []
    res.json(AllTasks) ;
})

app.get("/deleteTask" , (req , res) => {
    let idToBeDeleted = req.query.id ;
    console.log(idToBeDeleted) ;
    res.json(AllTasks.filter(task => task.id != idToBeDeleted)) ;
})

app.get('/addTask' , (req , res) => {
    let newTask = req.query.newTask ;
    console.log(newTask) ;
    AllTasks.unshift({id:v4() , task : newTask}) ;
    res.json(AllTasks) ;
})

app.listen(8080 , () => console.log('Server Started Successsfully')) ;