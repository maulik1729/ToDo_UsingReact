import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';


const  Filter = (props) => {
    return (
        <div className="filter">
            <span className="filter__item filter__item--dark" data-name="All" onClick={props.onClick}>All</span>
            <span className="filter__item" data-name="Active" onClick={props.onClick}>Active</span>
            <span className="filter__item" data-name="Completed" onClick={props.onClick}>Completed</span>
         </div>
    );
}

Filter.propTypes={
    onClick:PropTypes.func.isRequired
}

export default Filter;