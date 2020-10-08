import React , { useEffect, useState } from 'react' ;
import './App.css'
import TodoItem  from './TodoItem' ;


const App = () => {

  let [task , setTask] = useState('"') ;

  const getTasks = async() => {
    let tasks = await (await fetch('http://localhost:8080/getAllTask')).json()
    setAlltasks(tasks) ;
  }
 let [alltasks , setAlltasks] = useState([]) ;

 useEffect((e) => {
    if (alltasks.length === 0){
      getTasks() ;
    }
 },[alltasks])

const handleTaskEdit = (id , task) => {
  console.log("Changing values...>!!") ;
  console.log("id : " , id , "task to be changed : " , task) ;
  let editTask = alltasks.map((obj) => {
    if (obj.id === id){
      obj.task = task ;
    }
    return obj ;
  })
  setAlltasks(editTask) ;
  console.log("All tasks : " , alltasks ) ;
}

const deleteTask = async(id) => {
  let res = (await(await fetch("http://localhost:8080/deleteTask?id="+id)).json()) ;
  console.log(res);
  //FUnction is used in there
  setAlltasks(prevVal => res);
  // alltasks = res ;
  console.log(alltasks);
}

const handleInput = (e) => {
  setTask(e.target.value) ;
}
  return (

    <div className = "main-container">
      <h1 style={{marginBottom:"60px"}}>❤Todo Application❤</h1>
      <div className='addNew'>
            <input type="text" onChange={handleInput} placeholder='Enter some new task ...' />
            <input type='submit' onClick={async(e) => {
                await fetch("http://localhost:8080/addTask?newTask="+task) ;
                getTasks() ;
              }} value = "Add" />
        </div>
      {
        alltasks.map((task_on , index) => {
          return <TodoItem task={task_on.task} id={task_on.id} editFun={handleTaskEdit} deleteFun={deleteTask} />
        })
      }
    </div>
  ) ;
}

export default App ;