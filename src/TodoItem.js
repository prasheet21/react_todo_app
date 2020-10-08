import React, { Fragment, useState } from 'react' ;
import './TodoItem.css' ;

const TodoItem = ({task , id , editFun , deleteFun}) => {
    let intermediateTask ;
    let [localTask , setLocalTask] = useState(task) ;
    const handleToggleEdit = () => {
        let edit_panel = 
        <div className='update'>
            <input onChange={(e) => {intermediateTask = e.target.value ; }} />
            <input type='submit'  onClick={() => {
                    
                    if (intermediateTask == undefined || intermediateTask.trim() == '') 
                        localTask = task ;
                    else
                        localTask = intermediateTask ;

                    editFun(id , localTask) ;
                    setLocalTask(localTask)
                }}/>
        </div>
        setLocalTask(edit_panel) ;
    }
    return(
        <div className='todoTasks'>
            <div className = "task">
                {id + " . "}<p>{localTask}</p>
                <div className="logo">
                    <i onClick = {handleToggleEdit} type = 'text' className='fas fa-edit fa-lg'></i>
                    <i onClick={(e) => {deleteFun(id) ;}} className="fas fa-trash fa-lg"></i>    
                </div>
            </div>
        </div>
    ) ;
}

export default TodoItem ;