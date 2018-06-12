import React from 'react';
import ReactDOM from 'react-dom';

import Header from './Header.js';
import TaskList from './TaskList.js';
import Input from './Input.js';
import Filter from './Filter.js';
import ClearCompleted from './ClearCompleted.js';
import RemaingTask from './RemaingTask.js';
import controller from "../../js/controller";

class ToDo extends React.Component{
    constructor(props){
        super(props);
        this.count=0;
        this.state={
            tasks:[],
            currentState:'All',
        }
    }
    componentWillMount= () => {
        controller.getAllTasks().then((response) => {
            this.setState({
                tasks: response,
            });
        });
    }

    handleInput= (value) => {
        controller.addTask(value).then((response) => {
            const curTasks = this.state.tasks;
            const newTask = response;
            const updatedTasks = [...curTasks, newTask];
            this.setState({
                tasks: updatedTasks
            });
        });
    }

    handleComplete= (e) => {
        const id=e.target.dataset.id;
        controller.markTaskComplete(id).then((response)=>{
            const curTasks=this.state.tasks;
            const index=curTasks.findIndex((task)=>task.id==id);
            const toggleTask=response;
            const updatedTasks=[...curTasks.slice(0,index),toggleTask,...curTasks.slice(index+1)];
            this.setState({
                tasks:updatedTasks
            });
        });
    }   

    handleDelete= (e) => {
        const id=e.target.dataset.id;
        controller.removeTask(id).then((response)=>{
            const curTasks=this.state.tasks;
            const index=curTasks.findIndex((task)=>task.id==id);
            if(index==-1)
                return;
            const updatedTasks=[...curTasks.slice(0,index),...curTasks.slice(index+1)];
            this.setState({
                tasks:updatedTasks
            });
        });
    }

    handleCurrentState= (e) => {
        this.setState({currentState:e.target.dataset.name});
        const filters=Array.from(e.target.parentElement.children);
        filters.forEach((filter)=>filter.classList.remove("filter__item--dark"));
        e.target.classList.add("filter__item--dark");
    }

    handleClearButton= (e) => {
        controller.removeCompletedTask().then((response) =>{
            const updatedTasks=this.state.tasks.filter(task=>!task.isDone);
            this.setState({tasks:updatedTasks});
        })
    }

    handleEditing= (e) => {
        e.target.classList.add("tasklist__text--dark");
        e.target.contentEditable=true;
    }

    handleSave= (e) => {
        if(e.key!="Enter")
            return;
        const id=e.target.dataset.id;
        const text=e.target.textContent;
        controller.changeTask(id,text).then( (response) => {
            const curTasks = this.state.tasks;
            const index = curTasks.findIndex((task) => task.id == id);
            const newTask = response;
            const updatedTasks = [...curTasks.slice(0, index), newTask, ...curTasks.slice(index + 1)];
            this.setState({tasks: updatedTasks});
        });
        e.target.contentEditable = false;
    }

   /* handleMarkAllComplete= (e) => {
        const curTasks=this.state.tasks;
        const updatedTasks=curTasks.map(task => Object.assign({},task,{isDone:true}));
        this.setState({tasks:updatedTasks});
    } */

    countOfNotCompleted= () => {
        const curTasks=this.state.tasks;
        const countOfCompleted=curTasks.reduce((count,task)=> (task.isDone)?count+1:count , 0);
        const countOfNotCompleted=curTasks.length-countOfCompleted;
        return countOfNotCompleted;
    }

    render(){
        const {tasks,currentState} = this.state;
        const countOfNotCompleted=this.countOfNotCompleted();
        return (
            <div className="todo">
                <Header heading="To Do List"/>
                <TaskList 
                    tasks={tasks} 
                    currentState={currentState} 
                    onDoubleClick={this.handleEditing} 
                    onKeyPress={this.handleSave} 
                    onComplete={this.handleComplete} 
                    onDelete={this.handleDelete}
                />
                <Input  onEnter={this.handleInput}/>
                <Filter onClick={this.handleCurrentState}/>
                {(tasks.length-countOfNotCompleted)>0?<ClearCompleted onClick={this.handleClearButton}/>:null}
            </div>
        );
    }
}

export default ToDo;