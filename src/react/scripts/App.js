import React from 'react';
import ToDo from './ToDo.js';


class App extends React.Component{
    render(){
        return (
            <ToDo database={this.props.database}/>
        );
    }
} 

export default App;
