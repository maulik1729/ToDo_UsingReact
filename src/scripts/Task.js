import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { Transition, animated } from 'react-spring'

const Task = (props) => {
    const linepresent=(props.task.isDone)?"tasklist__text tasklist__text--checked":"tasklist__text";
    return ( 
        <animated.li style={props.style} className="tasklist__task">
            <span 
                className="tasklist__item tasklist--done" 
                data-id={props.task.id} 
                onClick={props.onComplete}>
                    &#10004;
            </span>
            <span  
                className={linepresent} 
                data-id={props.task.id} 
                onKeyPress={props.onKeyPress} 
                onDoubleClick={props.onDoubleClick}>
                    {props.task.task}
            </span>  
            <span 
                className="tasklist__item tasklist--remove" 
                data-id={props.task.id} 
                onClick={props.onDelete}>
                    X
            </span>
        </animated.li>
    );
}

Task.propTypes={
    task:PropTypes.object.isRequired,
    onComplete:PropTypes.func.isRequired,
    onDelete:PropTypes.func.isRequired,
    onDoubleClick:PropTypes.func.isRequired,
    onKeyPress:PropTypes.func.isRequired,
}


export default Task;