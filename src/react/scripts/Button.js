import React from 'react';

const Button = (props) => {
    return (<span className="mainView__item" onClick={props.onClick}>{props.value}</span>);
}

export default Button;