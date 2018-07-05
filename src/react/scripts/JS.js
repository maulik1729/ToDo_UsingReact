import React from 'react';
import vanillaJSView from "../../js/vanillaJSView";
class JS extends React.Component{
    componentDidMount(){
        vanillaJSView();
    }
    componentWillUpdate(){
        vanillaJSView();
    }
    render(){
       return null;
    }
}

export default JS;