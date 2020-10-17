import React, { useEffect, useState } from 'react';
import './App.css'
import TodoItem from './TodoItem';


const App = () => {

  let [task, setTask] = useState('');

  const getTasks = async () => {
    console.log("Get tasks to get all tasks called") ;
    let tasks = await (await fetch('http://localhost:8080/getAllTask')).json()
    setAlltasks(tasks);
  }
  let [alltasks, setAlltasks] = useState([]);

  useEffect((e) => {
    getTasks() ;
  }, [])

  const handleTaskEdit = (id, task) => {
    console.log("Changing values...>!!");
    console.log("id : ", id, "task to be changed : ", task);
    let editTask = alltasks.map((obj) => {
      if (obj.id === id) {
        obj.task = task;
      }
      return obj;
    })
    setAlltasks(editTask);
    console.log("All tasks : ", alltasks);
  }

  const deleteTask = async (id) => {
    await fetch("http://localhost:8080/deleteTask?id=" + id) ;
    getTasks() ;
  }

  return (

    <div className="main-container">
      <h1 style={{ marginBottom: "60px" }}>❤Todo Application❤</h1>

      <form className='addNew' >
        <input type="text" onChange={(e) => { setTask(e.target.value) }} value={task} placeholder='Enter some new task ...' />
        <input type='submit' onClick={async (e) => {
          e.preventDefault() ;
          setTask("") ;
          console.log("Here add is clicked") ;
          await fetch("http://localhost:8080/addTask?newTask=" + task);
          getTasks();
        }} value="Add" />
      </form>


      <input type='submit' className='clear_all' onClick={async () => {
        await fetch("http://localhost:8080/clearList");
        setAlltasks([]);
      }} value='Clear All Tasks' />
      {
        alltasks.map((task_on, index) => {
          return <TodoItem key={task_on._id} id={task_on._id} task={task_on.task} editFun={handleTaskEdit} deleteFun={() => { deleteTask(task_on._id) }} />
        })
      }
    </div>
  );
}

export default App;