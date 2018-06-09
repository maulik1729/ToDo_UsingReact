import React from 'react';

class Button extends  React.Component{
    constructor(props){
        super(props);
        this.state={
            value:this.props.one
        };
    }
    handleClick= (e) => {
        this.setState({value:(this.state.value==this.props.one)?this.props.two:this.props.one});
        this.props.onClick(e);
    }
    render(){
        return (<span onClick={this.handleClick}>{this.state.value}</span>);
    }
}

export default Button;