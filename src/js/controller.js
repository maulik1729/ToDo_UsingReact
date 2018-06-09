import  DatabaseFactory from './database.js'


var controller = {

    changeDatabase:(type)=>{
        this.database=DatabaseFactory.makeDatabase(type);
        controller.getId();
    },

    getAllTasks:()=>{
        return this.database.getAllTask();
    },

    addTask:(newTask)=>{
        return this.database.addTask({task:newTask,isDone:false,id:this.count++});
    },

    changeTask:(id,newTask)=>{
        return this.database.updateTask(id,newTask);
    },

    removeTask:(id)=>{
        return this.database.removeTask(id);
    },

    markTaskComplete:(id)=>{
        return this.database.markTaskComplete(id);
    },

    removeCompletedTask:()=>{
        var taskToDo=this.database.getAllTask().then((response)=>{
            return response.map(task => {
                if(task.isDone)
                    return this.database.removeTask(task.id);
                return
            });
        });
       return taskToDo;
    },

    getCurrentState:()=>{
        return this.database.getCurrentState();
    },

    setCurrentState:(newState)=>{
        return this.database.setCurrentState(newState);
    },

    getId:()=>{
        this.database.getAllTask().then((response)=> {
            this.count=response.reduce((curMax, {id}) => Math.max(curMax, id), -1)+1;
        });

    }
}

export default controller;


