import React from 'react';
import Header from './Header.js';
import TaskList from './TaskList.js';
import Input from './Input.js';
import Filter from './Filter.js';
import ClearCompleted from './ClearCompleted.js';
import controller from "../../js/controller";
import {ALL} from '../../constants/state'
import {countOfNotCompleted} from "./selectors";

class ToDo extends React.Component{
    constructor(props){
        super(props);
        this.count=0;
        this.state={
            tasks:[],
            currentState:ALL,
        }
    }
    componentWillMount= () => {
        controller.getAllTasks().then((response) => {
            this.setState({
                tasks: response,
            });
        });
    }
    componentWillReceiveProps= (nextProps) => {
        if(nextProps.database!=this.props.database)
        {
            controller.getAllTasks().then((response) => {
                this.setState({
                    tasks: response,
                });
            });
        }
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

    handleCurrentState= (newState) => {
        this.setState({currentState:newState});
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

    render(){
        const {tasks,currentState} = this.state;
        const countOfNotComplete=countOfNotCompleted(this.state.tasks);
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
                <Filter onClick={this.handleCurrentState} currentState={this.state.currentState}/>
                {(tasks.length-countOfNotComplete)>0?<ClearCompleted onClick={this.handleClearButton}/>:null}
            </div>
        );
    }
}

export default ToDo;