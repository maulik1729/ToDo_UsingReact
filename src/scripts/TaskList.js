import React from 'react';
import ReactDOM from 'react-dom';

import Task from './Task.js';
import PropTypes from 'prop-types';
import { Transition, animated } from 'react-spring'


const TaskList= (props) => {
        const tasks=props.tasks.filter((task)=>{
            if(task.isDone&&props.currentState=='Active')
                return false;
            if(!task.isDone&&props.currentState=='Completed')  
                return false;
            return true;            
        });
        return (
            <ul className="tasklist">
                <Transition
                    keys={tasks.map(task => task.id)}
                    from={{opacity:0,padding:0}}
                    enter={{opacity:1,padding:12}}
                    leave={{opacity:0,height:0,border:0,padding:0}}>
                    {
                        tasks.map( task => styles =>{
                            return (<Task style={styles} task={task} key={task.id} currentState={props.currentState} onComplete={props.onComplete} onDelete={props.onDelete} onDoubleClick={props.onDoubleClick} onKeyPress={props.onKeyPress}/>);
                        })
                    }
                </Transition>
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
