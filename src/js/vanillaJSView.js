import controller from './controller.js'
var jtoDo,jinput,jfilter_items,jtasks,jspan;
var currentState;

function handleTaskAdd(e){
    if(e.key!="Enter")
        return;
    const newTask=this.value;
    if(newTask=="")
        return;
    controller.addTask(newTask).then(()=>{
        render()
    });
    this.value="";
}

function handleActiveTab(e){
    currentState=e.target.textContent;
    jfilter_items.forEach((jfilter_item)=> jfilter_item.classList.remove("filter__item--dark"));
    this.classList.add("filter__item--dark");
    render();
    console.log(currentState);
}

function handleToggle(e){
    if (e.target.matches(".tasklist--done")) {
       markTaskComplete(e);
    }
    else if (e.target.matches(".tasklist--remove")) {
        removeTask(e);
    }
}

function markTaskComplete(e){
    const id = parseInt(e.target.dataset.id);
    controller.markTaskComplete(id).then(()=>render());
}

function removeTask(e){
    const id = parseInt(e.target.dataset.id);
    controller.removeTask(id).then(()=>render());
}

function render(){

    controller.getAllTasks().then((response)=>{
        jtasks.innerHTML=response.filter(task =>!(currentState == "Active" && task.isDone)&&!(currentState == "Completed" && !task.isDone))
        .map((task) => {
            const linepresent=(task.isDone?"tasklist__text tasklist__text--checked":"tasklist__text");
            return`
                <li class="tasklist__task" padding="100px">
                    <span class="tasklist__item tasklist--done" data-id="${task.id}">&#10004</span>
                    <span class="${linepresent}" for="${task.id}"  data-id="${task.id}">${task.task}</span>  
                    <span class="tasklist__item tasklist--remove" data-id="${task.id}">X</span>
                </li>`;
        }).join('');
        renderClearCompletesButton();
    });

}

function renderClearCompletesButton(){
    controller.getAllTasks().then((respone)=> {
        const isAnyCompleted=respone.some(task => task.isDone);
        if (isAnyCompleted)
            jspan.classList.remove("clearcompleted--hide");
        else
            jspan.classList.add("clearcompleted--hide");
    });
}

function handleClearCompletedButton(){
    controller.removeCompletedTask().then(
        () => render()
    );
}

function enableEditMode(e){
    if(!e.target.matches("span"))
        return;
    this.classList.add("tasklist__text--dark");
    this.contentEditable=true;
}

function disableEditMode(e){
    if (!e.target.matches("span") || e.key != "Enter")
        return;
    e.target.contentEditable = false;
    const id = parseInt(e.target.dataset.id);
    const task = e.target.textContent;
    controller.changeTask(id, task).then(() => render());
}

function init(){
    const container=document.querySelector(".container");
    container.innerHTML=`
         <div class="todo">
            <h1 class="todo__header">To Do List</h1>
                <ul class="tasklist">
                </ul>
            <input class="todo__taketask" type="text"  placeholder="Enter Task" autocomplete="off" required>
            <div class="filter">
                 <span class="filter__item filter__item--dark">All</span>
                 <span class="filter__item">Active</span>
                 <span class="filter__item">Completed</span>
            </div>
            <span class="clearcompleted">
                Clear Completed Task
             </span>
         </div>`;
    jtoDo=document.querySelector(".todo");

    jinput=jtoDo.querySelector(".todo__taketask");
    jinput.addEventListener("keydown",handleTaskAdd);

    jfilter_items=jtoDo.querySelectorAll(".filter__item");
    jfilter_items.forEach((jfilter_item)=>jfilter_item.addEventListener("click",handleActiveTab));

    jtasks=jtoDo.querySelector(".tasklist");
    jtasks.addEventListener("click",handleToggle);
    jtasks.addEventListener("dblclick",enableEditMode);
    jtasks.addEventListener("keydown",disableEditMode);

    jspan=jtoDo.querySelector(".clearcompleted");
    jspan.addEventListener("click",handleClearCompletedButton);
    currentState ="All";
    render();
}

export default init;