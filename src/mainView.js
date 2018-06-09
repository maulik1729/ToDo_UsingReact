import React from 'react';
import ReactDOM from 'react-dom';
import vanillaJSView from './js/vanillaJSView';
import App from './react/scripts/App.js';
import Button from './react/scripts/Button';
import controller from "./js/controller";


class MainView extends React.Component{
    componentDidMount(){
        controller.changeDatabase("LocalStorage");
        vanillaJSView.init();
    }
    handleView= (e) => {
        if(e.target.textContent=="React")
            ReactDOM.render(<App/>,document.querySelector(".container"));
        else
        {
            ReactDOM.unmountComponentAtNode(document.querySelector(".container"));
             vanillaJSView.init();
        }

    }

    handleDatabase= (e) => {
        controller.changeDatabase(String(e.target.textContent));
        vanillaJSView.init();
    }

    render(){
        return (
            <React.Fragment>
                <Button one="React" two="vanillaJS" onClick={this.handleView}/>
                <Button one="LocalStorage" two="JSDB" onClick={this.handleDatabase}/>
            </React.Fragment>
        );
    }
}

ReactDOM.render(<MainView/>,document.querySelector(".mainView"));