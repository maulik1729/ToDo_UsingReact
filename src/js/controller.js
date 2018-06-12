import  DatabaseFactory from './database.js'
var database;

var controller = {

    changeDatabase:(type)=>{
        database=DatabaseFactory.makeDatabase(type);
        console.log(database);
        controller.getId();
    },

    getAllTasks:()=>{
        return database.getAllTask();
    },

    addTask:(newTask)=>{
        return database.addTask({task:newTask,isDone:false,id:this.count++});
    },

    changeTask:(id,newTask)=>{
        return database.updateTask(id,newTask);
    },

    removeTask:(id)=>{
        return database.removeTask(id);
    },

    markTaskComplete:(id)=>{
        return database.markTaskComplete(id);
    },

    removeCompletedTask:()=>{
        var taskToDo=database.getAllTask().then((response)=>{
            return Promise.all(response.filter(task => task.isDone).map((task) => database.removeTask(task.id)));
        });
       return taskToDo;
    },

    getCurrentState:()=>{
        return database.getCurrentState();
    },

    setCurrentState:(newState)=>{
        return database.setCurrentState(newState);
    },

    getId:()=>{
        database.getAllTask().then((response)=> {
            this.count=response.reduce((curMax, {id}) => Math.max(curMax, id), -1)+1;
        });
    }
}

export default controller;


