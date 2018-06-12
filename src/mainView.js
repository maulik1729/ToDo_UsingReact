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
            view:"vanillaJS",
            database:"LocalStorage"
        }
    }
    componentDidMount(){
        controller.changeDatabase("LocalStorage");
        vanillaJSView.init();
    }
    handleView= () => {
        if(this.state.view!="React") {
            ReactDOM.render(<App/>,document.querySelector(".container"));
            this.setState({view: "React"});
        }else {
            ReactDOM.unmountComponentAtNode(document.querySelector(".container"));
            vanillaJSView.init();
            this.setState({view: "vanillaJS"});
        }

    }

    handleDatabase= () => {
        if(this.state.database!="JSDB") {
            controller.changeDatabase("JSDB");
            this.setState({database:"JSDB"});
        }
        else {
            controller.changeDatabase("LocalStorage");
            this.setState({database:"LocalStorage"});
        }
        if(this.state.view=="React") {
            ReactDOM.unmountComponentAtNode(document.querySelector(".container"));
            ReactDOM.render(<App/>, document.querySelector(".container"));
        }
        else
            vanillaJSView.init();
    }

    render(){
        return (
            <React.Fragment>
                <Button value={this.state.view} onClick={this.handleView}/>
                <Button value={this.state.database} onClick={this.handleDatabase}/>
            </React.Fragment>
        );
    }
}

ReactDOM.render(<MainView/>,document.querySelector(".mainView"));