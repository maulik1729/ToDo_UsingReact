import React from 'react';
import ReactDOM from 'react-dom';

import Task from './Task.js';
import PropTypes from 'prop-types';

const TaskList = (props) => {
    return (
         <ul className="tasklist">
            { 
                props.tasks.filter((task)=>{
                    if(task.isDone&&props.currentState=='Active')
                        return false;
                    if(!task.isDone&&props.currentState=='Completed')  
                        return false;
                    return true;            
                }).map((task)=>{
                    return (<Task task={task} key={task.id} currentState={props.currentState} onComplete={props.onComplete} onDelete={props.onDelete} onDoubleClick={props.onDoubleClick} onKeyPress={props.onKeyPress}/>);
                })
            }
        </ul>
    );
}

TaskList.propTypes={
    tasks:PropTypes.array.isRequired,
    currentState:PropTypes.string.isRequired,
    onComplete:PropTypes.func.isRequired,
    onDelete:PropTypes.func.isRequired,
    onDoubleClick:PropTypes.func.isRequired,
    onKeyPress:PropTypes.func.isRequired,
}

export default TaskList;