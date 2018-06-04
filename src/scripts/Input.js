import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

class Input extends React.Component{
    constructor(props){
        super(props);
        this.state={value:""};
    }

    handleChange=(e)=>{
        this.setState({value:e.target.value});
    }

    handleInput=(e)=>{
        if(e.key!='Enter')
            return;
        if(e.target.value=='')
            return;
        this.props.onEnter(e.target.value);
        this.setState({value:""});
    }

    render(){
        return (
            <input className="todo__taketask" type="text" onKeyDown={this.handleInput} onChange={this.handleChange} value={this.state.value} placeholder="Enter Task" autoComplete="off" required/>
        );
    }
}

Input.propTypes={
    onEnter:PropTypes.func.isRequired,
}

export default Input;