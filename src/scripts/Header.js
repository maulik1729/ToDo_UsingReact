import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

const Header = (props) => {
    return (
        <h1 className="todo__header">{props.heading}</h1>
    );
}

Header.propTypes={
    heading:PropTypes.string.isRequired
}

Header.defaultProps = {
   heading:"To Do List"
}

export default Header;