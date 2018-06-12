import React from 'react';
import ReactDOM from 'react-dom';
import ToDo from './ToDo.js';


class App extends React.Component{
    componentWillMount(){
        const container=document.body.querySelector(".container");
        container.innerHTML="";
    }
    render(){
        return (
            <ToDo database={this.props.database}/>
        );
    }
} 

export default App;
