import React from 'react';
import ReactDOM from 'react-dom';
import ToDo from './ToDo.js';
import Header from './Header.js';


class App extends React.Component{
    render(){
        return (
            <div className="container">
                  <ToDo/>
            </div>
        );
    }
} 

export default App;
