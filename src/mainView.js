import React from 'react';
import ReactDOM from 'react-dom';
import vanillaJSView from './js/vanillaJSView';
import App from './react/scripts/App.js';
import Button from './react/scripts/Button';
import controller from "./js/controller";


class MainView extends React.Component{
    constructor(){
        super();
        this.state={
            view:"vanillJS"
        }
    }
    componentDidMount(){
        controller.changeDatabase("LocalStorage");
        vanillaJSView.init();
    }
    handleView= (e) => {
        console.log("x");
        if(e.target.textContent!="React")
            ReactDOM.render(<App/>,document.querySelector(".container"));
        else
        {
            ReactDOM.unmountComponentAtNode(document.querySelector(".container"));
            vanillaJSView.init();
        }

    }

    handleDatabase= (e) => {
        if(e.target.textContent!="JSDB")
            controller.changeDatabase("JSDB");
        else
            controller.changeDatabase("LocalStorage");
        if(this.state.view=="React")
            ReactDOM.render(<App/>,document.querySelector(".container"));
        else
            vanillaJSView.init();
    }

    render(){
        return (
            <React.Fragment>
                <Button one="React" two="vanillaJS" onClick={this.handleView}/>
                <Button one="JSDB" two="LocalStorage" onClick={this.handleDatabase}/>
            </React.Fragment>
        );
    }
}

ReactDOM.render(<MainView/>,document.querySelector(".mainView"));