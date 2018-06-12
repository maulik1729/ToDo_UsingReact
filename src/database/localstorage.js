import DataBase from "./database"

const privateMethods = {
    init(){
        this.key = "taskToDo";
        localStorage[this.key]=localStorage[this.key]?localStorage[this.key]:JSON.stringify([]);
    },

    getData(){
        return JSON.parse(localStorage[this.key]);
    },

    addData(data){
        localStorage[this.key] = JSON.stringify(data);
    },

    addTask(action){
        var curTasks = this.getData();
        console.log(curTasks,action);
        curTasks.push(action.task);
        console.log(curTasks);
        this.addData(curTasks);
        return curTasks;
    },

    updateTask(action){
        var addedTask;
        var curTasks=this.getData().map((task) => {
            if(task.id==action.id) {
                if(action.task)
                    task.task = action.task;
                if(action.isDone)
                    task.isDone = !task.isDone;
                addedTask = task;
                return addedTask;
            }
            else
                return task;
        });
        this.addData(curTasks)
        return addedTask;
    },

    removeTask(action){
        var curTasks = this.getData().filter((task) => task.id!=action.id);
        this.addData(curTasks);
        return {};
    },

    createPromise(action){
        return new Promise((resolve,reject)=> {
            if(!localStorage[this.key])
                reject("Key Not Available");

            switch (action.type) {
                case 'ADD':
                    resolve(this.addTask(action));
                    break;
                case 'GET_ALL':
                    resolve(this.getData());
                    break;
                case 'UPDATE':
                    resolve(this.updateTask(action,{task:action.task}));
                    break;
                case 'REMOVE':
                    resolve(this.removeTask(action));
                    break;
                case 'MARK_COMPLETE':
                    resolve(this.updateTask(action));
                    break;
                default:
                    new Error("Not a valid Action Type");
            }
        });
    }
}

export default class LocalStorage extends DataBase{
    constructor(){
        super();
        privateMethods.init();
    }
    addTask(Task){
       return privateMethods.createPromise({type:'ADD', task:Task});
    }
    getAllTask(){
        return privateMethods.createPromise({type:'GET_ALL'});
    }

    updateTask(id,newTask){
        return privateMethods.createPromise({type:'UPDATE',id:id,task:newTask})
    }
    removeTask(id){
        return privateMethods.createPromise({type: 'REMOVE',id:id});
    }
    markTaskComplete(id){
        return privateMethods.createPromise({type: 'MARK_COMPLETE',id:id,isDone:'true'});
    }
}