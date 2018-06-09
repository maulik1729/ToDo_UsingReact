import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

const ClearCompleted = (props) => {
    return (
        <span className="clearcompleted" onClick={props.onClick}>
            Clear Completed Task
        </span>
    );
}

ClearCompleted.propTypes={
    onClick:PropTypes.func.isRequired
}

export default ClearCompleted;