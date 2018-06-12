class DataBase {
    addTask(Task) {
    }

    getAllTask() {
    }

    updateTask(id, newTask) {
    }

    removeTask(id) {
    }

    markTaskComplete(id) {
    }

}

class LocalStorage extends DataBase {
    constructor() {
        super();
        this.key = "taskToDo";
        localStorage[this.key] = localStorage[this.key] ? localStorage[this.key] : JSON.stringify([]);
    }

    addTask(Task) {
        return new Promise((resolve, reject) => {
            if (localStorage[this.key]) {
                var curTasks = JSON.parse(localStorage[this.key]);
                curTasks.push(Task);
                console.log(curTasks);
                localStorage[this.key] = JSON.stringify(curTasks);
                resolve(Task);
            }
            else
                reject("Key Not Available");
        });
    }

    getAllTask() {
        return new Promise((resolve, reject) => {
            if (localStorage[this.key]) {
                var curTasks = JSON.parse(localStorage[this.key]);
                resolve(curTasks);
            } else
                reject("Key Not Available");
        });

    }

    updateTask(id, newTask) {
        return new Promise((resolve, reject) => {
            if (!localStorage[this.key]) //common out
                reject("Key Not Available");
            var curTasks = JSON.parse(localStorage[this.key]);
            var index = curTasks.findIndex((task) => task.id == id);
            if (index == -1) {
                return reject("Not a valid id");
            }
            curTasks[index].task = newTask;
            localStorage[this.key] = JSON.stringify(curTasks);
            resolve(curTasks[index]);
        });

    }

    removeTask(id) {
        return new Promise((resolve, reject) => {
            if (!localStorage[this.key])
                reject("Key Not Available");
            var curTasks = JSON.parse(localStorage[this.key]);
            var index = curTasks.findIndex((task) => task.id == id);
            if (index == -1) {
                return reject("Not a valid id");
            }
            curTasks.splice(index, 1);
            localStorage[this.key] = JSON.stringify(curTasks);
            resolve({});
        });

    }

    markTaskComplete(id) {
        return new Promise((resolve, reject) => {
            if (!localStorage[this.key])
                reject("Key Not Available");
            var curTasks = JSON.parse(localStorage[this.key]);
            var index = curTasks.findIndex((task) => task.id == id);
            if (index == -1) {
                return reject("Not a valid id");
            }
            curTasks[index].isDone = !curTasks[index].isDone;
            localStorage[this.key] = JSON.stringify(curTasks);
            resolve(curTasks[index]);
        });

    }
}


class JSDB extends DataBase {
    constructor() {
        super();
        this.url = "http://localhost:4000/";
        this.key = "taskToDo";
        this.headers = {
            'Content-type': 'application/json'
        }
    }

    makeRequest(request) {
        return new Promise((resolve, reject) => {
            var xhr = new XMLHttpRequest();
            xhr.open(request.method, request.url, true);
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
            if (request.data) {
                xhr.send(JSON.stringify(request.data));
            } else
                xhr.send();
        });
    }

    get(key = this.key) {
        return this.makeRequest({
            method: "GET",
            url: this.url + key
        });
    }

    post(data, key = this.key) {
        return this.makeRequest({
            method: "POST",
            url: this.url + key,
            data: data,
        })
    }

    put(data, key = this.key) {
        return this.makeRequest({
            method: "PUT",
            url: this.url + key,
            data: data,
        })
    }

    delete(id, key = this.key) {
        return this.makeRequest({
            method: "DELETE",
            url: this.url + key
        })
    }

    addTask(Task) {
        return this.post(Task);
    }

    getAllTask() {
        return this.get();
    }

    removeTask(id) {
        return this.delete(id, this.key + "/" + id);
    }

    updateTask(id, newTask) {
        return this.get(this.key + "/" + id).then(
            (response) => {
                const curTask = response;
                curTask.task = newTask;
                return this.put(curTask, this.key + "/" + curTask.id);
            }
        );
    }

    markTaskComplete(id) {
        return this.get(this.key + "/" + id).then(
            (response) => {
                const curTask = response;
                curTask.isDone = !curTask.isDone;
                return this.put(curTask, this.key + "/" + curTask.id);
            }
        );
    }
}


export default class DataBaseFactory {
    static makeDatabase(type) {
        switch (type) {
            case "JSDB":
            {
                console.log("jsdb");
              return new JSDB();}
            case "LocalStorage":
                return new LocalStorage();

        }
    }
}
