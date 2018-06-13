import DataBase from "./database"

const privateMethods = {
    init(){
        this.headers={
            'Content-type': 'application/json'
        }
        this.url = "http://localhost:4010/taskToDo";
    },

    makeRequest(request) {
        return new Promise((resolve, reject) => {
            var xhr = new XMLHttpRequest();
            let requesturl = this.url;
            if(request.id) requesturl += '/' + request.id;
            xhr.open(request.method,requesturl,true);

            xhr.onload = function () {
                if (this.status >= 200 && this.status < 300) {
                    resolve(JSON.parse(xhr.response));

                } else {
                    reject({
                        status: this.status,
                        statusText: xhr.statusText
                    });
                }
            };

            xhr.onerror = function () {
                reject({
                    status: this.status,
                    statusText: xhr.statusText
                });
            };

            if (this.headers) {
                Object.keys(this.headers).forEach((key) => {
                    xhr.setRequestHeader(key, this.headers[key]);
                });
            }

            if(request.data) {
                xhr.send(JSON.stringify(request.data));
            }else
                xhr.send();
        });
    }
}


export default class JSDataBase extends DataBase {
    constructor(){
        super();
        privateMethods.init();
    }

    addTask(data){
        return privateMethods.makeRequest({method:'POST',data});
    }
    getAllTask(){
        return privateMethods.makeRequest({method:'GET'});
    }
    removeTask(id){
        return privateMethods.makeRequest({method:'DELETE',id});
    }
    updateTask(id,newTask) {
        return privateMethods.makeRequest({method:'GET',id}).then(
            (response) => {
                const curTask = response;
                curTask.task = newTask;
                return privateMethods.makeRequest({method:'PUT',data:curTask,id});
            }
        );
    }
    markTaskComplete(id){
        return privateMethods.makeRequest({method:'GET',id}).then(
            (response) => {
                const curTask = response;
                curTask.isDone = !curTask.isDone;
                return privateMethods.makeRequest({method:'PUT',data:curTask,id});
            }
        );
    }
}