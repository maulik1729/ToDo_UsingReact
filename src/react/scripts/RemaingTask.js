import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

const RemainingTask = (props) => {
    return (
        <div className="footer">
            <span className="footer__remaining">RemainingTask:  {props.countOfNotCompleted}</span>
            <span className="footer__mark" onClick={props.onClick}>Mark All Task Complete</span>
        </div>
    );
}

RemainingTask.propTypes={
    countOfNotCompleted:PropTypes.number.isRequire,
    onClick:PropTypes.func.isRequired
}

export default RemainingTask;