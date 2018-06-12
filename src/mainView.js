import React from 'react';
import ReactDOM from 'react-dom';
import App from './react/scripts/App.js';
import Button from './react/scripts/Button';
import controller from "./js/controller";
import {REACT_VIEW,JS_VIEW} from "./constants/view";
import {JSDB,LOCALSTORAGE} from "./constants/database";
import JS from "./react/scripts/JS";

class MainView extends React.Component{
    constructor(){
        super();
        this.state={
            view:JS_VIEW,
            database:LOCALSTORAGE
        }
    }
    componentWillMount = () =>{
        controller.changeDatabase(this.state.database);
    }

    handleView= () => {
        this.setState({view:this.state.view==JS_VIEW?REACT_VIEW:JS_VIEW});
    }

    handleDatabase= () => {
        const database=this.state.database==JSDB?LOCALSTORAGE:JSDB;
        this.setState({database});
        controller.changeDatabase(database);
    }

    render(){
        return (
            <React.Fragment>
                <div className="mainView__buttons">
                     <Button value={this.state.view} onClick={this.handleView}/>
                     <Button value={this.state.database} onClick={this.handleDatabase}/>
                </div>
                <div className="container">
                    {this.state.view==JS_VIEW?<JS/>:<App database={this.state.database}/>}
                </div>
            </React.Fragment>
        );
    }
}

ReactDOM.render(<MainView/>,document.querySelector(".mainView"));