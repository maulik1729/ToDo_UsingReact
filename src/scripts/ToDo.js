import React from 'react';
import ReactDOM from 'react-dom';

import Header from './Header.js';
import TaskList from './TaskList.js';
import Input from './Input.js';
import Filter from './Filter.js';
import ClearCompleted from './ClearCompleted.js';
import RemaingTask from './RemaingTask.js';

class ToDo extends React.Component{
    constructor(props){
        super(props);
        this.state={
            tasks:[],
            currentState:"All"
        };
        this.count=0;
    }

    handleInput=(value)=>{
        const curTasks=this.state.tasks;
        const newTask={id:(++this.count),task:value,isDone:false};
        const updatedTasks=[...curTasks,newTask];
        this.setState({
            tasks:updatedTasks
        });
    }

    handleComplete=(e)=>{
        const curTasks=this.state.tasks;
        const index=curTasks.findIndex((task)=>task.id==e.target.dataset.id);
        const task=curTasks[index];
        const toggleTask=Object.assign({},task,{isDone:!task.isDone});
        const updatedTasks=[...curTasks.slice(0,index),toggleTask,...curTasks.slice(index+1)];
        this.setState({
            tasks:updatedTasks
        });
    }   

    handleDelete=(e)=>{
        const curTasks=this.state.tasks;
        const index=curTasks.findIndex((task)=>task.id==e.target.dataset.id);
        if(index==-1)
            return;
        //console.log(index+" "+e.target.dataset.id);
        const updatedTasks=[...curTasks.slice(0,index),...curTasks.slice(index+1)];
        this.setState({
            tasks:updatedTasks
        });
    }

    handleCurrentState=(e)=>{
        this.setState({currentState:e.target.dataset.name});
        const filters=Array.from(e.target.parentElement.children);
        filters.forEach((filter)=>filter.classList.remove("filter__item--dark"));
        e.target.classList.add("filter__item--dark");
    }

    handleClearButton=(e)=>{
        const updatedTasks=this.state.tasks.filter(task=>!task.isDone);
        this.setState({tasks:updatedTasks});
    }

    handleEditing=(e)=>{
        e.target.classList.add("tasklist__text--dark");
        e.target.contentEditable=true;
    }

    handleSave=(e)=>{
        if(e.key!="Enter")
            return;
        const curTasks=this.state.tasks;
        const index=curTasks.findIndex((task)=>task.id==e.target.dataset.id);
        const task=curTasks[index];
        const newTask=Object.assign({},task,{task:e.target.textContent});
        const updatedTasks=[...curTasks.slice(0,index),newTask,...curTasks.slice(index+1)];
        this.setState({tasks:updatedTasks});
        e.target.contentEditable=false;
    }

    handleMarkAllComplete =(e)=>{
        const curTasks=this.state.tasks;
        const updatedTasks=curTasks.map(task => Object.assign({},task,{isDone:true}));
        this.setState({tasks:updatedTasks});
    } 

    render(){
        const curTasks=this.state.tasks;
        const countOfCompleted=curTasks.reduce((count,task)=> (task.isDone)?count+1:count , 0);
        const countOfNotCompleted=curTasks.length-countOfCompleted;
        return (
            <div className="todo">
                <Header heading="To Do List"/>
                <TaskList tasks={this.state.tasks} currentState={this.state.currentState} onDoubleClick={this.handleEditing} onKeyPress={this.handleSave} onComplete={this.handleComplete} onDelete={this.handleDelete}/>
                <Input value={this.state.input} onChange={this.handleChange} onEnter={this.handleInput}/>
                <Filter onClick={this.handleCurrentState}/>
                <RemaingTask onClick={this.handleMarkAllComplete} countOfNotCompleted={countOfNotCompleted}/>
                {countOfCompleted>0?<ClearCompleted onClick={this.handleClearButton}/>:null}
            </div>
        );
    }
}

export default ToDo;