import React from 'react';

class Button extends  React.Component{
    constructor(props){
        super(props);
        this.state={
            value:this.props.two
        };
    }
    handleClick= (e) => {
        this.props.onClick(e);
        this.setState((prevState)=>{
           return {value:(prevState.value==this.props.two)?this.props.one:this.props.two}
        });
    }
    render(){
        console.log("render");
        return (<span onClick={this.handleClick}>{this.state.value}</span>);
    }

}

export default Button;